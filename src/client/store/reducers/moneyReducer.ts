import Rodux from "@rbxts/rodux";
import { MoneyChanged } from "../actions/moneyChanged";

interface State {
	money: number;
}

const moneyReducer = Rodux.createReducer<State, MoneyChanged>(
	{
		money: 0,
	},
	{
		moneyChanged: (state, action) => {
			state = {
				money: action.money,
			};
			return state;
		},
	},
);

export default moneyReducer;
