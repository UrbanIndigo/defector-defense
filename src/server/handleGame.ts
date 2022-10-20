import { World } from "@rbxts/matter";
import { Game } from "shared/components";
import remotes from "shared/remotes";

const handleGame = (world: World) => {
	const gameId = world.spawn(
		Game({
			health: 100,
			maxHealth: 100,
			gameOver: false,
			round: 0,
			walkerEntities: new Set(),
		}),
	);

	remotes.Server.Get("BringNextWave").Connect(() => {
		const gameComponent = world.get(gameId, Game);
		if (gameComponent.canSkipRound) {
			world.insert(gameId, gameComponent.patch({ walkerEntities: new Set(), skipRoundTime: undefined }));
		}
	});
};

export default handleGame;
