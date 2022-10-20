import Make from "@rbxts/make";
import { useDeltaTime, useEvent, World } from "@rbxts/matter";
import { UserInputService, Workspace } from "@rbxts/services";
import placementChanged from "client/store/actions/placementChanged";
import store from "client/store/store";
import { canBePlaced, isTooClose } from "shared/canBePlaced";
import { ClientState } from "shared/clientState";
import { PlacingUnit, RadiusIndicator, Transform, Unit } from "shared/components";
import getLowestPositionFromModel from "shared/modules/getLowestPositionFromModel";
import getMouseTarget from "shared/modules/getMouseTarget";
import playSound from "shared/modules/playTickSound";
import remotes from "shared/remotes";

let model: Model | undefined;
let [currentRotation, goalRotation] = [0, 0];
let cframe: CFrame | undefined;

const radiusTemplate = Make("Part", {
	Size: new Vector3(0.5, 20, 20),
	Orientation: new Vector3(0, 0, 90),
	Shape: Enum.PartType.Cylinder,
	CanCollide: false,
	CastShadow: false,
	Color: new Color3(0, 0.3, 0.6),
	Anchored: true,
	Material: Enum.Material.ForceField,
});

let radius: Part | undefined;

const place = (world: World, state: ClientState, unit: Unit | undefined) => {
	world.remove(state.clientId!, PlacingUnit);
	store.dispatch(placementChanged(undefined));
};

const placingUnitIsShown = (world: World, state: ClientState) => {
	for (const [_, placingUnit] of world.queryChanged(PlacingUnit)) {
		if (placingUnit.old && model && radius) {
			model.Destroy();
			radius.Destroy();
		}
		if (placingUnit.new) {
			radius = radiusTemplate.Clone();
			radius.Size = new Vector3(
				1,
				placingUnit.new.unit.gun.baseRange * 2,
				placingUnit.new.unit.gun.baseRange * 2,
			);
			radius.Parent = Workspace;
			model = placingUnit.new?.unit.unitLevels[0].model.Clone();
			model!.Parent = Workspace;
		}
	}

	if (model && radius) {
		const raycastParams = new RaycastParams();
		raycastParams.FilterType = Enum.RaycastFilterType.Whitelist;
		raycastParams.FilterDescendantsInstances = [Workspace.Map["Start Island BMP"]["pad island"]];
		const raycastResult = getMouseTarget(raycastParams);
		if (!raycastResult) {
			return;
		}

		currentRotation = currentRotation + (goalRotation - currentRotation) * useDeltaTime() * 20;

		const currentCframe = new CFrame(raycastResult.Position.add(new Vector3(0, 3, 0))).mul(
			CFrame.Angles(0, math.rad(currentRotation), 0),
		);

		cframe = new CFrame(raycastResult.Position.add(new Vector3(0, 3, 0))).mul(
			CFrame.Angles(0, math.rad(goalRotation), 0),
		);

		const lowestPoint = getLowestPositionFromModel(model);

		if (canBePlaced(lowestPoint, world.query(Unit, Transform))) {
			radius.Color = new Color3(0, 0.3, 0.6);
		} else {
			radius.Color = new Color3(1, 0, 0);
		}

		radius.Position = cframe.Position.sub(new Vector3(0, 3, 0));
		model.PivotTo(currentCframe);
	}

	if (!cframe || !model) {
		return;
	}

	for (const [id, unit, transform, radiusIndicator] of world.query(Unit, Transform, RadiusIndicator)) {
		const lowestPoint = getLowestPositionFromModel(model);

		const canBePlaced = !isTooClose(cframe.Position, unit, transform.cframe);
		if (canBePlaced) {
			world.insert(id, radiusIndicator.patch({ color: new Color3(1, 1, 1) }));
		} else {
			world.insert(id, radiusIndicator.patch({ color: new Color3(1, 0, 0) }));
		}
	}

	const placingUnit = world.get(state.clientId!, PlacingUnit);
	if (placingUnit) {
		for (const [_, inputObject, gameProcessedEvent] of useEvent(UserInputService, "InputBegan")) {
			if (gameProcessedEvent) {
				continue;
			}

			if (inputObject.UserInputState === Enum.UserInputState.Begin) {
				if (inputObject.UserInputType === Enum.UserInputType.Keyboard) {
					if (inputObject.KeyCode === Enum.KeyCode.R) {
						// Rotate placement
						playSound("Tick");
						goalRotation -= 90;
					} else if (inputObject.KeyCode === Enum.KeyCode.Q) {
						// Cancel placement
						playSound("Tick");
						place(world, state, undefined);
					}
				} else if (inputObject.UserInputType === Enum.UserInputType.MouseButton1) {
					const isPlaceable = canBePlaced(cframe.Position, world.query(Unit, Transform));

					if (!isPlaceable) {
						continue;
					}

					place(world, state, undefined);

					playSound("Spawn");

					task.spawn(() => {
						remotes.Client.Get("PlaceUnit").SendToServer(placingUnit.unit, cframe!);
					});
				}
			}
		}
	}
};

export = placingUnitIsShown;
