import Rodux from "@rbxts/rodux";
import { Game } from "shared/components";
import { GameInfoChanged } from "../actions/changeGameInfo";

interface State {
	gameComponent: Game | undefined;
}

const gameInfoReducer = Rodux.createReducer<State, GameInfoChanged>(
	{
		gameComponent: undefined,
	},
	{
		changeGameInfo: (state, action) => {
			state = {
				gameComponent: action.gameComponent,
			};
			return state;
		},
	},
);

export default gameInfoReducer;
