import Make from "@rbxts/make";
import { AnyEntity, useThrottle, World } from "@rbxts/matter";
import { Debris, ReplicatedFirst, ReplicatedStorage, Workspace } from "@rbxts/services";
import { loadAnimation } from "shared/AnimationLoader";
import {
	AnimationHandler,
	ComponentModel,
	Gun,
	Health,
	Invisible,
	MossSpecial,
	SofSpecial,
	Transform,
	Unit,
	Walker,
} from "shared/components";
import getLowestPositionFromModel from "shared/modules/getLowestPositionFromModel";

const mossHasSpecial = (world: World) => {
	for (const [id, mossSpecialRecord] of world.queryChanged(MossSpecial)) {
		if (mossSpecialRecord.new && !mossSpecialRecord.old) {
			const [unit, gun] = world.get(id, Unit, Gun);
			if (!unit || !gun) {
				continue;
			}

			const ghost = unit.unit.unitLevels[0].model.Clone();
			ghost.Parent = Workspace;
			ghost.PrimaryPart!.Anchored = true;
			const ghostId = world.spawn(
				ComponentModel({
					model: ghost,
				}),
				AnimationHandler(),
			);

			world.insert(
				id,
				Invisible(),
				mossSpecialRecord.new.patch({
					attacksLeft: 3,
					ghost: ghostId,
				}),
			);
		} else if (!mossSpecialRecord.new) {
			world.remove(id, Invisible);
		}
	}

	for (const [id, mossSpecial, transform] of world.query(MossSpecial, Transform)) {
		if (mossSpecial.attacksLeft === undefined || !useThrottle(1, id)) {
			continue;
		}

		world.insert(
			id,
			mossSpecial.patch({
				attacksLeft: mossSpecial.attacksLeft - 1,
			}),
		);

		warn(mossSpecial.attacksLeft);
		if (mossSpecial.attacksLeft === 0) {
			world.despawn(mossSpecial.ghost);
			world.remove(id, MossSpecial);
			continue;
		}

		// Pick a walker
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

		const [walkerTransform, walkerHealth] = world.get(closestWalker, Transform, Health);
		if (!walkerTransform || !walkerHealth) {
			continue;
		}
		// Tp to walker
		// const ghostModel = world.get(mossSpecial.ghost, ComponentModel);

		const [ghostTransform, animationHandler] = world.get(mossSpecial.ghost, Transform, AnimationHandler);
		let gc = ghostTransform;
		if (!gc) {
			gc = Transform({
				cframe: walkerTransform.cframe,
			});
			world.insert(mossSpecial.ghost, gc);
		}

		if (!animationHandler) {
			continue;
		}

		const p = Make("Part", {
			Position: gc.cframe.Position,
			Anchored: true,
			Transparency: 1,
			CanCollide: false,
		});

		// Create particle effect
		const particle = ReplicatedStorage.Assets.particles.Hit.Clone();
		particle.Parent = p;
		particle.Emit(20);

		Debris.AddItem(p, 1);

		world.insert(
			mossSpecial.ghost,
			gc.patch({
				cframe: walkerTransform.cframe,
			}),
			animationHandler.patch({
				animationId:
					mossSpecial.attacksLeft % 2 === 0 ? "rbxassetid://10768537528" : "rbxassetid://10768540696",
			}),
		);

		// Damage walker
		world.insert(
			closestWalker,
			walkerHealth.patch({
				health: walkerHealth.health - 50,
			}),
		);
	}
};

export = mossHasSpecial;
