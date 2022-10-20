import { ReplicatedStorage, ServerScriptService } from "@rbxts/services";
import start from "shared/start";
import handleGame from "./handleGame";
import handlePlacements from "./handlePlacements";
import Money from "./money";

export type ServerState = {
	money: Money;
};

const money = new Money();

const world = start(
	[
		...ReplicatedStorage.Shared.systems.GetDescendants().filter((value) => value.IsA("ModuleScript")),
		...ServerScriptService.TS.systems.GetDescendants().filter((value) => value.IsA("ModuleScript")),
	],
	{
		money: money,
	},
);

handlePlacements(world, money);

handleGame(world);
