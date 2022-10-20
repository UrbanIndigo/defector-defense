import Make from "@rbxts/make";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { loadAnimation } from "./AnimationLoader";
import { Walker } from "./components";
import guns, { GunInfo, GunType } from "./guns";
import getLowestPositionFromModel from "./modules/getLowestPositionFromModel";

import * as Components from "./components";

export type UnitInstance = {
	unitType: string;
	cframe: CFrame;
};

export type UnitLevel = {
	model: Model;
};

export type UnitDescriptor = {
	name: string;
	description: string;
	gun: GunInfo;
	unitLevels: UnitLevel[];
	price: number;
	sizeDiameter: number;

	specialAbility?: {
		specialAbilityComponentName: keyof typeof Components;
		activationKillsRequired: number;
		cooldown?: number;
	};

	canSeeHidden?: boolean;
};

export const units: UnitDescriptor[] = [
	{
		name: "KPA",
		description: "Very capable, highly powerful soldiers at top ranks - but may take a while to get there.",
		unitLevels: [
			{
				model: ReplicatedStorage.Assets.units["KPA Recruit"],
			},
		],
		gun: guns["HK-P7"],
		price: 100,
		sizeDiameter: 20,
	},
	{
		name: "SOF",
		description: "Slow fire rate but long range and powerful.",
		price: 400,
		unitLevels: [
			{
				model: ReplicatedStorage.Assets.units.SOF,
			},
		],
		gun: guns["Barrett .50"],
		sizeDiameter: 20,
		canSeeHidden: true,

		specialAbility: {
			specialAbilityComponentName: "SofSpecial",
			activationKillsRequired: 2,
			cooldown: 20,
			// callback: (unitModel, { getClosestWalker, getWalkersWithinRadius }) => {
			// 	task.wait(0.2); // wait so they don't throw at closest walker

			// 	const bomb = ReplicatedStorage.FindFirstChild("Assets")
			// 		?.FindFirstChild("Models")
			// 		?.FindFirstChild("Bomb")
			// 		?.Clone() as Model;
			// 	bomb.Parent = Workspace;
			// 	bomb.PivotTo(unitModel.GetPivot());
			// 	const closestWalker = getClosestWalker();

			// 	if (!closestWalker) {
			// 		// maybe return false here?
			// 		return;
			// 	}

			// 	const animationTrack = loadAnimation(
			// 		unitModel.FindFirstChildOfClass("Humanoid")!,
			// 		"rbxassetid://10758138212",
			// 	);

			// 	if (animationTrack) {
			// 		animationTrack.Priority = Enum.AnimationPriority.Action4;
			// 		animationTrack.Play();
			// 	}

			// 	const t = 1;
			// 	const g = new Vector3(0, -Workspace.Gravity, 0);
			// 	const x0 = bomb.PrimaryPart?.Position!;

			// 	const goal = getLowestPositionFromModel(closestWalker);
			// 	const v0 = goal
			// 		.sub(x0)
			// 		.sub(g.mul(0.5 * t * t))
			// 		.div(t);

			// 	bomb.PrimaryPart!.Velocity = v0;

			// 	task.delay(t, () => {
			// 		// damage all walkers in radius
			// 		const walkersInRadius = getWalkersWithinRadius(goal, 10);

			// 		walkersInRadius.forEach((walkerModel) => {
			// 			walkerModel.FindFirstChildOfClass("Humanoid")?.TakeDamage(50);
			// 		});
			// 		bomb.PrimaryPart?.FindFirstChildOfClass("Sound")?.Play();
			// 		bomb.PrimaryPart!.FindFirstChildOfClass("ParticleEmitter")?.Emit(20);
			// 		bomb.PrimaryPart!.Anchored = true;
			// 		bomb.PrimaryPart!.Transparency = 1;
			// 		task.wait(2);
			// 		bomb.Destroy();
			// 	});
			// },
		},
	},
	{
		name: "SGC",
		description: "Not a lot of damage, but shields and heals other nearby units",
		unitLevels: [
			{
				model: ReplicatedStorage.Assets.units.SGC,
			},
		],
		gun: guns["AK-47 1st Class"],
		price: 500,
		sizeDiameter: 20,
	},
	{
		name: "MoSS",
		description: "MoSS",
		gun: guns.PPSH41,
		unitLevels: [
			{
				model: ReplicatedStorage.Assets.units.MoSS,
			},
		],
		price: 750,
		sizeDiameter: 20,
		specialAbility: {
			activationKillsRequired: 2,
			specialAbilityComponentName: "MossSpecial",
		},
		// 	callback: (unitModel, { getClosestWalker, getWalkersWithinRadius }) => {
		// 		// Pick a target
		// 		const ghost = unitModel.Clone();
		// 		ghost.Parent = Workspace;
		// 		unitModel.Parent = undefined;
		// 		ghost.GetDescendants().forEach((desc) => {
		// 			if (desc.IsA("BasePart") && desc.Transparency < 0.3) {
		// 				// desc.Transparency = 0.3;
		// 			}
		// 		});

		// 		const sound = Make("Sound", {
		// 			SoundId: "rbxassetid://935843979",
		// 		});

		// 		const hitParticlesOld = ReplicatedStorage.FindFirstChild("Assets")
		// 			?.FindFirstChild("Particles")
		// 			?.FindFirstChild("HitParticles")!
		// 			.GetChildren() as ParticleEmitter[];

		// 		const hitParticles = hitParticlesOld?.map((hitParticle) => {
		// 			const particle = hitParticle.Clone();
		// 			particle.Parent = ghost.PrimaryPart;
		// 			return particle;
		// 		});

		// 		ghost.FindFirstChildOfClass("Model")?.Destroy();
		// 		const humanoid = ghost.FindFirstChildOfClass("Humanoid")!;

		// 		const leftSwing = loadAnimation(humanoid, "rbxassetid://10768537528")!;
		// 		leftSwing.Priority = Enum.AnimationPriority.Action4;
		// 		const rightSwing = loadAnimation(humanoid, "rbxassetid://10768540696")!;
		// 		rightSwing.Priority = Enum.AnimationPriority.Action4;

		// 		const originalPivot = ghost.GetPivot();
		// 		for (let i = 0; i < 3; i++) {
		// 			const closestWalker = getClosestWalker();

		// 			if (closestWalker) {
		// 				const closestHumanoid = closestWalker.FindFirstChildOfClass("Humanoid")!;

		// 				const closestWalkerCFrame = closestWalker.GetPivot();
		// 				ghost.PivotTo(
		// 					new CFrame(
		// 						closestWalkerCFrame.Position.add(
		// 							new Vector3(random.NextNumber(-2, 2), 0, random.NextNumber(-2, 2))
		// 								.mul(closestWalkerCFrame.LookVector.mul(-1))
		// 								.add(new Vector3(0, random.NextNumber(-1, 3), 0)),
		// 						),
		// 						closestWalkerCFrame.Position,
		// 					),
		// 				);
		// 				if (i % 2 === 0) {
		// 					leftSwing.Play();
		// 				} else {
		// 					rightSwing.Play();
		// 				}

		// 				closestHumanoid.TakeDamage(70);

		// 				const newSound = sound.Clone();
		// 				newSound.Parent = ghost.PrimaryPart;
		// 				newSound.Play();
		// 				hitParticles?.forEach((hitParticle) => hitParticle.Emit(2));
		// 			}

		// 			task.wait(0.7);
		// 		}
		// 		ghost.Destroy();
		// 		unitModel.Parent = Workspace;
		// 		// unitModel.PivotTo(originalPivot);
		// 	},
		// },
	},
];
