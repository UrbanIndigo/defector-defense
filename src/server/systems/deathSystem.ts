import { World } from "@rbxts/matter";
import { ComponentModel, Health } from "shared/components";

const despawnTime = 5;

const deathSystem = (world: World) => {
	/**
	 * Set to dead when health is 0
	 */
	for (const [id, healthRecord] of world.queryChanged(Health)) {
		if (healthRecord.new && healthRecord.new.health <= 0 && !healthRecord.new.dead) {
			world.insert(
				id,
				healthRecord.new.patch({
					dead: true,
					deathTime: time(),
				}),
			);
		}
	}

	/**
	 * Despawn entity after death
	 */
	for (const [id, health, model] of world.query(Health, ComponentModel)) {
		if (health.deathTime && time() > health.deathTime + despawnTime) {
			world.despawn(id);
		}
	}
};

export = deathSystem;
