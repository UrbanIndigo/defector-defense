import { AnyEntity, World } from "@rbxts/matter";
import spawnWalker from "server/spawnWalker";
import calculateRoundDifficulty from "shared/calculateRoundDifficulty";
import { Game, Walker } from "shared/components";
import map1 from "shared/games/map1";
import walkers, { WalkerType } from "shared/walkers";

const random = new Random(123);
let highestDifficulty = 0;
for (const [i, walker] of pairs(walkers)) {
	if (walker.difficulty > highestDifficulty) {
		highestDifficulty = walker.difficulty;
	}
}

let totalWeight = 0;
for (const [i, walker] of pairs(walkers)) {
	totalWeight += walker.weight;
}

const pickWeightedWalker = (difficulty: number) => {
	const randomWeight = random.NextNumber(0, totalWeight);
	let accumulativeWeight = 0;

	return walkers.find((walker) => {
		accumulativeWeight += walker.weight;
		if (randomWeight <= accumulativeWeight) {
			return true;
		}
	})!;
};

const roundSystem = (world: World) => {
	const [[gameId, gameComponent]] = world.query(Game);

	if (!gameId || !gameComponent) {
		return;
	}

	if (gameComponent.gameOver) {
		return;
	}

	for (const [walkerId, walkerRecord] of world.queryChanged(Walker)) {
		if (!walkerRecord.new) {
			const [[gameId, gameComponent]] = world.query(Game);
			gameComponent.walkerEntities.delete(walkerId);

			world.insert(
				gameId,
				gameComponent.patch({
					walkerEntities: gameComponent.walkerEntities,
				}),
			);
		}
	}

	if (!gameComponent.canSkipRound) {
		if (!gameComponent.skipRoundTime || time() > gameComponent.skipRoundTime) {
			world.insert(
				gameId,
				gameComponent.patch({
					canSkipRound: true,
				}),
			);
		}
	} else if (gameComponent.skipRoundTime && time() < gameComponent.skipRoundTime) {
		world.insert(
			gameId,
			gameComponent.patch({
				canSkipRound: false,
			}),
		);
	}

	if (!gameComponent.walkerEntities || gameComponent.walkerEntities.size() === 0) {
		const collection: WalkerType[] = [];

		let dificulty = math.ceil(calculateRoundDifficulty(gameComponent.round));

		while (dificulty > 0) {
			const weighted = pickWeightedWalker(dificulty)!;
			collection.push(weighted);
			dificulty -= weighted.difficulty;
		}

		const entities: Set<AnyEntity> = new Set();
		collection.forEach((walker, i) => {
			const entityId = world.spawn(
				Walker({
					walkerType: walker,
					distanceWalked: 0,
					spawnDelay: i * 0.2,
				}),
			);

			entities.add(entityId);
		});

		world.insert(
			gameId,
			gameComponent.patch({
				round: gameComponent.round + 1,
				walkerEntities: entities,
				skipRoundTime: time() + entities.size() * 0.2 + 5,
			}),
		);
	}
};

export = roundSystem;
