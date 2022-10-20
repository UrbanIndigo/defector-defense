import { AnyComponent, AnyEntity, World } from "@rbxts/matter";
import { SpecialAbility, Transform, Unit } from "shared/components";
import { FocusPriority } from "shared/enums/focusPriority";
import calculateSellValue from "shared/modules/calculateSellValue";
import remotes from "shared/remotes";
import { units } from "shared/units";
import Money from "./money";

const playerOwnsUnit = (player: Player, unit: Unit): boolean => {
	return unit.creator === player;
};

const handlePlacements = (world: World, money: Money) => {
	remotes.Server.Get("PlaceUnit").Connect((player, sentUnit, cframe) => {
		const unit = units.find((value) => value.name === sentUnit.name);

		if (!unit) {
			return;
		}

		if (money.expend(player, unit.price)) {
			const specialAbilityComponent = unit.specialAbility
				? SpecialAbility({
						activationKillsRequired: unit.specialAbility.activationKillsRequired,
						currentKills: 0,
						component: unit.specialAbility.specialAbilityComponentName,
				  })
				: undefined;

			const unitComponent = Unit({
				unit: unit,
				level: 0,
				focusPriority: FocusPriority.First,
				range: 10,
				component: "Unit",
				creator: player,
			});
			const transformComponent = Transform({
				cframe: cframe,
			});

			if (specialAbilityComponent) {
				world.spawn(unitComponent, transformComponent, specialAbilityComponent);
			} else {
				world.spawn(unitComponent, transformComponent);
			}
		}
	});

	remotes.Server.Get("SellUnit").Connect((player, entityId) => {
		const entity = entityId as AnyEntity;
		if (!world.contains(entity)) {
			return;
		}

		const unit = world.get(entity, Unit);
		if (unit && playerOwnsUnit(player, unit)) {
			const sellMoney = calculateSellValue(unit.unit.price);

			money.changeMoney(player, sellMoney);
			world.despawn(entityId as AnyEntity);
		}
	});

	remotes.Server.Get("ChangeFocusPriority").SetCallback((player, entityId, focusPriority) => {
		const entity = entityId as AnyEntity;
		if (!world.contains(entity)) {
			return;
		}

		const unit = world.get(entity, Unit);
		if (unit && playerOwnsUnit(player, unit)) {
			world.insert(
				entity,
				unit.patch({
					focusPriority: focusPriority,
				}),
			);
		}
	});
};

export default handlePlacements;
