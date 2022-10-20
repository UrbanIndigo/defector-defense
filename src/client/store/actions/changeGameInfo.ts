import { Game } from "shared/components";

export interface GameInfoChanged {
	type: string;
	gameComponent: Game;
}

const changeGameInfo = (gameComponent: Game): GameInfoChanged => {
	return {
		type: "changeGameInfo",
		gameComponent,
	};
};

export default changeGameInfo;
