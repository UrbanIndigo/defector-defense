// import { Players } from "@rbxts/services";
// import remotes from "shared/remotes";

import { Players } from "@rbxts/services";
import remotes from "shared/remotes";

class Money {
	private defaultMoney = 400;
	private playerMoney: Map<Player, number> = new Map();

	constructor() {
		const playerAdded = (player: Player) => {
			this.setMoney(player, this.defaultMoney);
		};

		Players.PlayerAdded.Connect((player) => {
			playerAdded(player);
		});

		Players.GetPlayers().forEach((player) => task.spawn(() => playerAdded(player)));
	}

	private setMoney(player: Player, amount: number) {
		this.playerMoney.set(player, amount);
		remotes.Server.Get("MoneyChanged").SendToPlayer(player, amount);
	}

	changeMoney(player: Player, amount: number): void {
		const currentMoney = this.playerMoney.get(player);

		if (currentMoney !== undefined) {
			this.setMoney(player, currentMoney + amount);
		}
	}

	expend(player: Player, amount: number): boolean {
		const currentMoney = this.playerMoney.get(player);

		if (currentMoney && currentMoney >= amount) {
			this.changeMoney(player, -amount);
			return true;
		}

		return false;
	}
}

export default Money;
