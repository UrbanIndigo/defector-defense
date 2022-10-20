import { useDeltaTime, World } from "@rbxts/matter";
import { ClientState } from "shared/clientState";
import { ComponentModel, Transform, Unit, Walker } from "shared/components";

const unitLooksAtTarget = (world: World, state: ClientState) => {
	for (const [id, unit, transform] of world.query(Unit, Transform)) {
		if (unit.target && unit.hasTarget) {
			const walkerId = state.entityIdMap.get(tostring(unit.target));

			if (!walkerId) {
				continue;
			}

			const walkerModel = world.get(walkerId, ComponentModel);

			if (!walkerModel || !walkerModel.model.PrimaryPart) {
				continue;
			}

			const goalCframe = new CFrame(
				transform.cframe.Position,
				new Vector3(
					walkerModel.model.PrimaryPart.Position.X,
					transform.cframe.Position.Y,
					walkerModel.model.PrimaryPart.Position.Z,
				),
			);

			world.insert(
				id,
				transform.patch({
					cframe: transform.cframe.Lerp(goalCframe, useDeltaTime() * 5),
				}),
			);
		}
	}
};

export = unitLooksAtTarget;
