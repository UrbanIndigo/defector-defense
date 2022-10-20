import { AnyEntity, World } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { ClientState } from "shared/clientState";
import WorldProvider from "./ui/contexts/WorldContext";
import Main from "./ui/Main";

const showGui = (world: World, state: ClientState) => {
	const player = Players.LocalPlayer;
	const playerGui = player.WaitForChild("PlayerGui") as PlayerGui;
	const tree = (
		<WorldProvider clientState={state} world={world}>
			<Main />
		</WorldProvider>
	);
	const handle = Roact.mount(tree, playerGui, "UI");
};

export default showGui;
