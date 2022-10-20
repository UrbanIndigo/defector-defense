import { World } from "@rbxts/matter";
import { loadAnimation } from "shared/AnimationLoader";
import { AnimationHandler, ComponentModel } from "shared/components";

const animationHandlerPlaysAnimation = (world: World) => {
	for (const [id, animationHandlerRecord] of world.queryChanged(AnimationHandler)) {
		if (animationHandlerRecord.new) {
			const model = world.get(id, ComponentModel);
			if (!model) {
				continue;
			}

			const humanoid = model.model.FindFirstChildOfClass("Humanoid");
			if (!humanoid) {
				continue;
			}

			const animationTrack = loadAnimation(humanoid, animationHandlerRecord.new.animationId);
			animationTrack?.Play();
		}
	}
};

export = animationHandlerPlaysAnimation;
