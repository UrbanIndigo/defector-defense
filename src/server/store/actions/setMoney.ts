export interface SetMoney {
	type: "setMoney";
	player: Player;
	amount: number;
}

const setMoney = (player: Player, amount: number): SetMoney => {
	return {
		type: "setMoney",
		player,
		amount,
	};
};

export default setMoney;
