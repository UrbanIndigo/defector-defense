import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import changeSelectedUnit from "client/store/actions/changeSelectedUnit";
import store from "client/store/store";
import { PlacingUnit, RangeIndicator, Selected, Transform, Unit } from "shared/components";
import getHovered from "shared/getHovered";

const setSelectedUnit = (world: World, entity: AnyEntity, selected: boolean) => {
	if (selected) {
		const selected = world.get(entity, Selected);
		if (!selected) {
			world.insert(entity, Selected());
		}
		store.dispatch(changeSelectedUnit(entity));
	} else {
		if (world.contains(entity)) {
			world.remove(entity, Selected);
		}
		store.dispatch(changeSelectedUnit(undefined));
	}
};

const unitsCanBeSelected = (world: World) => {
	const [id] = world.query(PlacingUnit).next();

	const isPlacingUnit = id !== undefined;

	const [entity, isWalker] = getHovered(isPlacingUnit, world);

	const [currentSelectedUnit] = world.query(Selected).next();

	if ((currentSelectedUnit && isPlacingUnit) || !world.contains(currentSelectedUnit)) {
		setSelectedUnit(world, currentSelectedUnit, false);
	}

	// Update current selected
	for (const [id, unit] of world.queryChanged(Unit)) {
		if (id === currentSelectedUnit) {
			setSelectedUnit(world, id, true);
		}
	}

	for (const [_, inputObject, gameProcessedEvent] of useEvent(UserInputService, "InputBegan")) {
		if (gameProcessedEvent) {
			continue;
		}

		if (inputObject.UserInputState === Enum.UserInputState.Begin) {
			if (inputObject.UserInputType === Enum.UserInputType.MouseButton1) {
				const oldSelected = store.getState().selectedUnit.selectedUnit;

				if (entity && entity !== oldSelected && !isWalker) {
					if (oldSelected) {
						setSelectedUnit(world, oldSelected, false);
					}
					setSelectedUnit(world, entity, true);
				} else if (oldSelected) {
					setSelectedUnit(world, oldSelected, false);
				}
			}
		}
	}

	for (const [id, selectedRecord] of world.queryChanged(Selected)) {
		if (selectedRecord.new) {
			// Selected

			const [unit, transform] = world.get(id, Unit, Transform);
			if (!unit || !transform) {
				continue;
			}

			world.insert(
				id,
				RangeIndicator({
					color: new Color3(1, 0, 0),
					radius: unit.unit.gun.baseRange,
					cframe: transform.cframe.sub(new Vector3(0, 3, 0)),
				}),
			);
		} else {
			// Unselected
			if (world.contains(id)) {
				world.remove(id, RangeIndicator);
			}
		}
	}
};

export = unitsCanBeSelected;
