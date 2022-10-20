import { World } from "@rbxts/matter";
import { Walker } from "shared/components";
import { WalkerType } from "shared/walkers";

const spawnWalker = (world: World, walkerType: WalkerType) => {
	return world.spawn();
};

export = spawnWalker;
