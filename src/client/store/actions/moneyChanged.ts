export interface MoneyChanged {
	type: string;
	money: number;
}

const moneyChanged = (money: number): MoneyChanged => {
	return {
		type: "moneyChanged",
		money: money,
	};
};

export default moneyChanged;
