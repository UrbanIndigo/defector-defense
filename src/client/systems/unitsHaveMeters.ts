import { World } from "@rbxts/matter";
import mountUnitOverheadToPart from "client/ui/game/mountUnitOverheadToPart";
import bindComponent from "shared/bindComponent";
import bindComponent2 from "shared/bindComponent";
import { ComponentModel, Gun, HasMeter, SpecialAbility, Unit } from "shared/components";

const unitsHaveMeters = (world: World) => {
	for (const [id, unitRecord] of world.queryChanged(Unit)) {
		if (unitRecord.new) {
			const [unitModel, specialAbility, gun, hasMeter] = world.get(
				id,
				ComponentModel,
				SpecialAbility,
				Gun,
				HasMeter,
			);

			if (hasMeter) {
				continue;
			}

			if (unitRecord.new.unit.specialAbility && !specialAbility) {
				continue;
			}

			if (!gun) {
				continue;
			}

			if (!unitModel) {
				continue;
			}

			const head = unitModel.model.FindFirstChild("Head") as BasePart;
			if (!head) {
				continue;
			}

			world.insert(id, HasMeter());

			let gunSignal;
			if (gun) {
				gunSignal = bindComponent(id, Gun, gun);
			}

			let specialSignal;
			if (specialAbility) {
				specialSignal = bindComponent(id, SpecialAbility, specialAbility);
			}

			mountUnitOverheadToPart(head, gunSignal, specialSignal);
		}
	}
};

export = unitsHaveMeters;
