import { ReplicatedStorage, StarterPlayer } from "@rbxts/services";
import { ClientState } from "shared/clientState";
import { Client } from "shared/components";
import start from "shared/start";
import receiveReplication from "./receiveReplication";
import receiveStore from "./receiveStore";
import showGui from "./showGui";

const state: ClientState = {
	entityIdMap: new Map(),
	clientEntityToServerEntity: new Map(),
};

const world = start(
	[
		...ReplicatedStorage.Shared.systems.GetDescendants().filter((value) => value.IsA("ModuleScript")),
		...ReplicatedStorage.Client.systems.GetDescendants().filter((value) => value.IsA("ModuleScript")),
	],
	state,
);

state.clientId = world.spawn(Client());

receiveStore();
receiveReplication(world, state);
showGui(world, state);
