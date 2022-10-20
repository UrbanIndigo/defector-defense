import Make from "@rbxts/make";
import { AnyEntity, World } from "@rbxts/matter";
import { ReplicatedFirst, ReplicatedStorage, Workspace } from "@rbxts/services";
import { loadAnimation } from "shared/AnimationLoader";
import { ComponentModel, Health, SofSpecial, Transform, Walker } from "shared/components";
import getLowestPositionFromModel from "shared/modules/getLowestPositionFromModel";

const sofHasSpecial = (world: World) => {
	for (const [id, sofSpecial, transform, unitModel] of world.query(SofSpecial, Transform, ComponentModel)) {
		let closestWalker: AnyEntity | undefined;
		let closestWalkerDistance: number | undefined;

		for (const [walkerId, walker, walkerTransform, health] of world.query(Walker, Transform, Health)) {
			if (health.dead) {
				continue;
			}
			const distance = walkerTransform.cframe.Position.sub(transform.cframe.Position).Magnitude;
			if (!closestWalkerDistance || distance < closestWalkerDistance) {
				closestWalkerDistance = distance;
				closestWalker = walkerId;
			}
		}

		if (!closestWalker) {
			continue;
		}

		const animationTrack = loadAnimation(
			unitModel.model.FindFirstChildOfClass("Humanoid")!,
			"rbxassetid://10758138212",
		);

		if (animationTrack) {
			animationTrack.Priority = Enum.AnimationPriority.Action4;
			animationTrack.Play();
		}

		const closestWalkerModel = world.get(closestWalker, ComponentModel);

		if (!closestWalkerModel) {
			continue;
		}

		const bomb = ReplicatedStorage.Assets.models.bomb.Clone();
		bomb.Parent = Workspace;
		bomb.PivotTo(transform.cframe);

		const t = 1;
		const g = new Vector3(0, -Workspace.Gravity, 0);
		const x0 = bomb.PrimaryPart?.Position!;

		const goal = getLowestPositionFromModel(closestWalkerModel?.model);
		const v0 = goal
			.sub(x0)
			.sub(g.mul(0.5 * t * t))
			.div(t);

		bomb.PrimaryPart!.Velocity = v0;

		task.delay(t, () => {
			// damage all walkers in radius
			// const walkersInRadius = getWalkersWithinRadius(goal, 10);

			for (const [walkerId, walkerTransform, health] of world.query(Transform, Health)) {
				if (health.dead) {
					continue;
				}

				const distance = goal.sub(walkerTransform.cframe.Position).Magnitude;
				if (distance < 20) {
					world.insert(
						walkerId,
						health.patch({
							health: health.health - 50,
						}),
					);
				}
			}

			Make("Explosion", {
				Position: goal,
				BlastPressure: 0,
				BlastRadius: 10,
				Parent: bomb,
			});

			bomb.PrimaryPart!.Anchored = true;
			bomb.PrimaryPart!.Transparency = 1;
			task.wait(2);
			bomb.Destroy();
		});

		world.remove(id, SofSpecial);
	}
};

export = sofHasSpecial;
