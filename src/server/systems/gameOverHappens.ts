import { World } from "@rbxts/matter";
import { Game } from "shared/components";

const gameOverHappens = (world: World) => {
	const [[gameId, gameRecord]] = world.queryChanged(Game);

	if (!gameId || !gameRecord.new) {
		return;
	}

	if (gameRecord.new.health <= 0) {
		world.insert(
			gameId,
			gameRecord.new.patch({
				gameOver: true,
			}),
		);
	}
};

export = gameOverHappens;
