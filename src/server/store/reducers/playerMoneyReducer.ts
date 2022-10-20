import Rodux from "@rbxts/rodux";
import { SetMoney } from "../actions/setMoney";

interface State {
	playerMoney: Map<Player, number>;
}

const playerMoneyReducer = Rodux.createReducer<State, SetMoney>(
	{
		playerMoney: new Map(),
	},
	{
		setMoney: (state, action) => {
			state.playerMoney.set(action.player, action.amount);
			return state;
		},
	},
);

export default playerMoneyReducer;
