import { AnyEntity, component, World } from "@rbxts/matter";
import { Game, Health, Transform, Unit, Walker } from "shared/components";
import { FocusPriority } from "shared/enums/focusPriority";

type FocusFunction = (world: World, unit: Unit, unitTransform: Transform) => AnyEntity | undefined;

const focusFirst: FocusFunction = (world, unit, unitTransform) => {
	let furthestWalker: AnyEntity | undefined;
	let furthestDistanceWalked: number | undefined;

	for (const [walkerId, walker, walkerTransform, health] of world.query(Walker, Transform, Health)) {
		if (health.dead) {
			continue;
		}

		const distanceToUnit = unitTransform.cframe.Position.sub(walkerTransform.cframe.Position).Magnitude;

		if (distanceToUnit > unit.unit.gun.baseRange) {
			continue;
		}

		if (!furthestDistanceWalked || walker.distanceWalked > furthestDistanceWalked) {
			furthestWalker = walkerId;
			furthestDistanceWalked = walker.distanceWalked;
		}
	}

	return furthestWalker;
};

const focusLast: FocusFunction = (world, unit, unitTransform) => {
	let shortestWalker: AnyEntity | undefined;
	let shortestDistanceWalked: number | undefined;

	for (const [walkerId, walker, walkerTransform, health] of world.query(Walker, Transform, Health)) {
		if (health.dead) {
			continue;
		}

		const distanceToUnit = unitTransform.cframe.Position.sub(walkerTransform.cframe.Position).Magnitude;

		if (distanceToUnit > unit.unit.gun.baseRange) {
			continue;
		}

		if (!shortestDistanceWalked || walker.distanceWalked < shortestDistanceWalked) {
			shortestWalker = walkerId;
			shortestDistanceWalked = walker.distanceWalked;
		}
	}

	return shortestWalker;
};

const focusClosest: FocusFunction = (world, unit, unitTransform) => {
	let closestWalker: AnyEntity | undefined;
	let closestDistance: number | undefined;

	for (const [walkerId, walker, walkerTransform, health] of world.query(Walker, Transform, Health)) {
		if (health.dead) {
			continue;
		}

		const distanceToUnit = unitTransform.cframe.Position.sub(walkerTransform.cframe.Position).Magnitude;

		if (distanceToUnit > unit.unit.gun.baseRange) {
			continue;
		}

		if (!closestDistance || distanceToUnit < closestDistance) {
			closestWalker = walkerId;
			closestDistance = distanceToUnit;
		}
	}

	return closestWalker;
};

const focusMostHP: FocusFunction = (world, unit, unitTransform) => {
	let mostHealthWalker: AnyEntity | undefined;
	let mostHealthAmount: number | undefined;

	for (const [walkerId, walker, walkerTransform, health] of world.query(Walker, Transform, Health)) {
		if (health.dead) {
			continue;
		}

		const distanceToUnit = unitTransform.cframe.Position.sub(walkerTransform.cframe.Position).Magnitude;

		if (distanceToUnit > unit.unit.gun.baseRange) {
			continue;
		}

		if (!mostHealthAmount || health.health > mostHealthAmount) {
			mostHealthWalker = walkerId;
			mostHealthAmount = health.health;
		}
	}

	return mostHealthWalker;
};

const focusLeastHP: FocusFunction = (world, unit, unitTransform) => {
	let leastHealthWalker: AnyEntity | undefined;
	let leastHealthAmount: number | undefined;

	for (const [walkerId, walker, walkerTransform, health] of world.query(Walker, Transform, Health)) {
		if (health.dead) {
			continue;
		}

		const distanceToUnit = unitTransform.cframe.Position.sub(walkerTransform.cframe.Position).Magnitude;

		if (distanceToUnit > unit.unit.gun.baseRange) {
			continue;
		}

		if (!leastHealthAmount || health.health < leastHealthAmount) {
			leastHealthWalker = walkerId;
			leastHealthAmount = health.health;
		}
	}

	return leastHealthWalker;
};

const unitsTargetPrioritised = (world: World) => {
	const [[gameId, gameComponent]] = world.query(Game);

	for (const [id, unit, transform] of world.query(Unit, Transform)) {
		let target: AnyEntity | undefined;
		if (gameComponent && gameComponent.gameOver) {
			target = undefined;
		} else {
			switch (unit.focusPriority) {
				case FocusPriority.First: {
					target = focusFirst(world, unit, transform);
					break;
				}
				case FocusPriority.Last: {
					target = focusLast(world, unit, transform);
					break;
				}
				case FocusPriority.Closest: {
					target = focusClosest(world, unit, transform);
					break;
				}
				case FocusPriority.MostHP: {
					target = focusMostHP(world, unit, transform);
					break;
				}
				case FocusPriority.LeastHP: {
					target = focusLeastHP(world, unit, transform);
					break;
				}
			}
		}

		if (target) {
			world.insert(id, unit.patch({ target: target, hasTarget: true }));
		} else if (unit.hasTarget) {
			world.insert(
				id,
				unit.patch({
					hasTarget: false,
					target: undefined,
				}),
			);
		}
	}
};

export = {
	system: unitsTargetPrioritised,
	priority: math.huge - 2,
};
