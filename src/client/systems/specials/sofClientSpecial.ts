import { World } from "@rbxts/matter";
import { SofSpecial } from "shared/components";

const sofClientSpecial = (world: World) => {
	for (const [id, sofSpecial] of world.query(SofSpecial)) {
		warn("SOF SPECIAL CLIENT!");
		world.remove(id, SofSpecial);
	}
};

export = sofClientSpecial;
