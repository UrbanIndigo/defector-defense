import Make from "@rbxts/make";
import { World } from "@rbxts/matter";
import { ReplicatedStorage } from "@rbxts/services";
import { loadAnimation } from "shared/AnimationLoader";
import { ComponentModel, Unit, Gun, SpecialAbility, Health } from "shared/components";

const unitsDamageTarget = (world: World) => {
	for (const [id, unit, gun, unitModel] of world.query(Unit, Gun, ComponentModel)) {
		if (gun.disabled) {
			continue;
		}

		if (gun.reloading && gun.reloadingTime) {
			if (time() > gun.reloadingTime + gun.gunInfo.reloadTime) {
				world.insert(
					id,
					gun.patch({
						reloadingTime: undefined,
						reloading: false,
						currentAmmo: gun.gunInfo.ammo,
					}),
				);
			}
		} else {
			if (gun.currentAmmo === 0) {
				const humanoid = unitModel.model.FindFirstChildOfClass("Humanoid");
				if (humanoid && humanoid.IsDescendantOf(game)) {
					const animationTrack = loadAnimation(humanoid, gun.gunInfo.reloadAnimation);
					if (animationTrack) {
						animationTrack.Priority = Enum.AnimationPriority.Action;
						animationTrack.Play();
					}
				}
				world.insert(id, gun.patch({ reloading: true, reloadingTime: time() }));
			} else if (
				unit.hasTarget &&
				unit.target &&
				(!gun.lastFire || time() > gun.lastFire + gun.gunInfo.fireInterval)
			) {
				const health = world.get(unit.target, Health);

				if (health && health.health > 0) {
					const newHealth = math.max(0, health.health - gun.gunInfo.damage);

					if (newHealth <= 0) {
						const special = world.get(id, SpecialAbility);
						if (special) {
							world.insert(id, special.patch({ currentKills: special.currentKills + 1 }));
						}
					}

					world.insert(
						unit.target,
						health?.patch({
							health: newHealth,
						}),
					);
				}

				world.insert(
					id,
					gun.patch({
						lastFire: time(),
						currentAmmo: gun.currentAmmo - 1,
					}),
				);

				const gunModel = gun.model;
				const grip = gunModel.GetChildren().find((child) => child.Name.sub(0, 4) === "grip");

				const emit = grip?.FindFirstChild("Barrel")?.FindFirstChild("emit") as ParticleEmitter;

				Make("Sound", {
					SoundId: gun.gunInfo.fireSound,
					PlayOnRemove: true,
					Volume: 0.1,
					Parent: grip,
				}).Destroy();

				if (emit) {
					emit.Emit(3);
				}
			}
		}
	}
};

export = unitsDamageTarget;
