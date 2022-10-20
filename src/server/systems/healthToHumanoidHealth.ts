import { World } from "@rbxts/matter";
import { ComponentModel, Health } from "shared/components";

const healthToHumanoidHealth = (world: World) => {
	for (const [id, healthRecord] of world.queryChanged(Health)) {
		if (!healthRecord.new) {
			continue;
		}

		const model = world.get(id, ComponentModel);

		if (!model) {
			continue;
		}

		const humanoid = model.model.FindFirstChildOfClass("Humanoid");
		if (!humanoid) {
			continue;
		}

		humanoid.Health = healthRecord.new.health;
		humanoid.MaxHealth = healthRecord.new.maxHealth;
	}
};

export = healthToHumanoidHealth;
