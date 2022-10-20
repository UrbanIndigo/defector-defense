import { World } from "@rbxts/matter";
import changeGameInfo from "client/store/actions/changeGameInfo";
import store from "client/store/store";
import { Game } from "shared/components";

const gameInfoIsSentToStore = (world: World) => {
	for (const [id, gameRecord] of world.queryChanged(Game)) {
		if (gameRecord.new) {
			store.dispatch(changeGameInfo(gameRecord.new));
		}
	}
};

export = gameInfoIsSentToStore;
