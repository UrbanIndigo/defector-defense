import { World } from "@rbxts/matter";
import { ReplicatedStorage } from "@rbxts/services";
import { ComponentModel, Health } from "shared/components";

const characterBleedsWhenHit = (world: World) => {
	for (const [id, health] of world.queryChanged(Health)) {
		// Show only if health has gone down
		if (health.old && health.new && health.new.health < health.old.health) {
			const model = world.get(id, ComponentModel);
			if (!model || !model.model.PrimaryPart) {
				continue;
			}

			let blood = model.model.PrimaryPart.FindFirstChild("Blood") as ParticleEmitter;
			if (!blood) {
				blood = ReplicatedStorage.Assets.particles.Blood.Clone();
				blood.Parent = model.model.PrimaryPart;
			}

			blood.Emit(20);
		}
	}
};

export = characterBleedsWhenHit;
