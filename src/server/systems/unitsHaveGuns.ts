import { World } from "@rbxts/matter";
import { ReplicatedStorage } from "@rbxts/services";
import { loadAnimation } from "shared/AnimationLoader";
import { ComponentModel, Gun, Unit } from "shared/components";

const unitsHaveGuns = (world: World) => {
	for (const [id, unit, unitModel] of world.query(Unit, ComponentModel).without(Gun)) {
		const humanoid = unitModel.model.FindFirstChildOfClass("Humanoid");
		if (!humanoid) {
			continue;
		}

		const gunInfo = unit.unit.gun;
		const gunModel = gunInfo.model.Clone();

		gunModel.Parent = unitModel.model;

		const motor6d = new Instance("Motor6D", unitModel.model.FindFirstChild("Torso"));
		motor6d.Part0 = unitModel.model.FindFirstChild("Torso") as BasePart;
		motor6d.Part1 = gunModel.GetChildren().find((child) => child.Name.sub(0, 4) === "grip") as BasePart;

		const idleAnimationTrack = loadAnimation(humanoid, gunInfo.idleAnimation);
		if (!idleAnimationTrack) {
			continue;
		}

		idleAnimationTrack.Priority = Enum.AnimationPriority.Action;
		idleAnimationTrack.Looped = true;
		idleAnimationTrack.Play();

		world.insert(
			id,
			Gun({
				gunInfo: gunInfo,
				model: gunModel,
				currentAmmo: gunInfo.ammo,
				reloading: false,
				component: "Gun",
			}),
		);
	}
};

export = unitsHaveGuns;
