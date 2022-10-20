import { World } from "@rbxts/matter";
import { SpecialAbility } from "shared/components";

import * as Components from "shared/components";

const unitsHaveSpecials = (world: World) => {
	for (const [id, specialAbility] of world.queryChanged(SpecialAbility)) {
		if (specialAbility.new) {
			if (specialAbility.new.currentKills === specialAbility.new.activationKillsRequired) {
				const special = specialAbility.new.component as keyof typeof Components;
				const component = Components[special];

				world.insert(id, component());

				// Reset special
				world.insert(
					id,
					specialAbility.new.patch({
						currentKills: 0,
					}),
				);
			}
		}
	}
};

export = unitsHaveSpecials;
