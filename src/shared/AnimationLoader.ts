import Make from "@rbxts/make";

export const loadAnimation = (humanoid: Humanoid, animationId: string): AnimationTrack | undefined => {
	const animator = humanoid.FindFirstChildOfClass("Animator");
	if (!animator) {
		return;
	}

	const animation = Make("Animation", {
		AnimationId: animationId,
	});

	const animationTrack = animator.LoadAnimation(animation);

	return animationTrack;
};
