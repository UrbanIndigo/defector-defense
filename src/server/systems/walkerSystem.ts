import { useDeltaTime, useEvent, World } from "@rbxts/matter";
import { PhysicsService, Workspace } from "@rbxts/services";
import { ComponentModel, Game, Health, Transform, Walker } from "shared/components";
import getLowestPositionFromModel from "shared/modules/getLowestPositionFromModel";
import ragdoll from "shared/modules/ragdoll";

PhysicsService.CreateCollisionGroup("Walkers");
PhysicsService.CollisionGroupSetCollidable("Walkers", "Walkers", false);

const getNextNode = (node: Part): Part | undefined => {
	return node.FindFirstChildOfClass("RodConstraint")?.Attachment1?.Parent as Part | undefined;
};
const startNode = Workspace.FindFirstChild("Map")?.FindFirstChild("Path")?.FindFirstChild("Start") as Part;

const walkerSystem = (world: World) => {
	for (const [id, walker] of world.query(Walker).without(Transform)) {
		world.insert(
			id,
			Transform({
				cframe: startNode.CFrame,
			}),
		);
	}

	// Give walkers models
	for (const [id, walker] of world.query(Walker).without(ComponentModel)) {
		if (walker.spawnDelay > 0) {
			world.insert(
				id,
				walker.patch({
					spawnDelay: walker.spawnDelay - useDeltaTime(),
				}),
			);
			continue;
		}

		const walkerModel = walker.walkerType.model.Clone();
		assert(walkerModel !== undefined, "Walker model not defined");

		walkerModel.Parent = Workspace;

		walkerModel.GetDescendants().forEach((desc) => {
			if (desc.IsA("BasePart")) {
				PhysicsService.SetPartCollisionGroup(desc, "Walkers");
			}
		});

		const humanoid = walkerModel.FindFirstChildOfClass("Humanoid");
		assert(humanoid !== undefined, "Humanoid not defined");

		humanoid.WalkSpeed = walker.walkerType.speed;

		ragdoll(walkerModel);

		world.insert(
			id,
			ComponentModel({ model: walkerModel }),
			walker.patch({ currentNode: startNode, nextNode: getNextNode(startNode) }),
		);
	}

	for (const [id, walker] of world.query(Walker).without(Health)) {
		world.insert(
			id,
			Health({
				health: walker.walkerType.health,
				maxHealth: walker.walkerType.health,
				component: "Health",
			}),
		);
	}

	// Walkers walk to next node
	for (const [id, walker, model, health] of world.query(Walker, ComponentModel, Health)) {
		if (!walker.nextNode || health.dead) {
			continue;
		}

		const humanoid = model.model.FindFirstChildOfClass("Humanoid");
		if (!humanoid) {
			continue;
		}

		if (humanoid.MoveDirection.Magnitude === 0) {
			humanoid.MoveTo(walker.nextNode.Position);
		}

		for (const [_] of useEvent(humanoid, "MoveToFinished")) {
			humanoid.MoveTo(walker.nextNode.Position);
		}

		world.insert(
			id,
			walker.patch({
				distanceWalked:
					walker.distanceWalked +
					model.model.PrimaryPart!.Velocity.mul(new Vector3(1, 0, 1)).div(useDeltaTime()).Magnitude,
			}),
		);
	}

	// Walker reassisigns next node if in radius or despawns if no nextNode
	for (const [id, walker, model] of world.query(Walker, ComponentModel)) {
		const floorPosition = getLowestPositionFromModel(model.model);
		const distanceToNextNode = walker.nextNode?.Position.sub(floorPosition).Magnitude;
		if (distanceToNextNode && distanceToNextNode < 3) {
			const nextNode = getNextNode(walker.nextNode);

			if (nextNode) {
				world.insert(
					id,
					walker.patch({
						nextNode,
					}),
				);
			} else {
				// Walker made it through, reduce health
				const [[gameId, gameComponent]] = world.query(Game);
				world.insert(
					gameId,
					gameComponent.patch({
						health: math.max(0, gameComponent.health - 1),
					}),
				);

				model.model.Destroy();
				world.despawn(id);
			}
		}
	}
};

export = walkerSystem;
