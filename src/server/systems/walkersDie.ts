import { useEvent, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { ServerState } from "server/main.server";
import { ComponentModel, Game, Health, Walker } from "shared/components";

const droppedMoney = 20;

const walkersDie = (world: World, state: ServerState) => {
	for (const [id, healthRecord] of world.queryChanged(Health)) {
		if (healthRecord.new && healthRecord.old && healthRecord.new.dead !== healthRecord.old.dead) {
			const walker = world.get(id, Walker);

			if (!walker) {
				continue;
			}

			const players = Players.GetPlayers();

			players.forEach((player) => {
				state.money.changeMoney(player, droppedMoney / players.size());
			});
		}
	}
};

export = walkersDie;
