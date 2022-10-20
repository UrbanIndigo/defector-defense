import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { ComponentModel, Invisible } from "shared/components";

const invisibleUnitsAreHidden = (world: World) => {
	for (const [id, invisibleRecord] of world.queryChanged(Invisible)) {
		const model = world.get(id, ComponentModel);

		if (!model) {
			continue;
		}

		if (invisibleRecord.new) {
			warn("invis");
			model.model.Parent = undefined;
		} else {
			warn("uninvis");
			model.model.Parent = Workspace;
		}
	}
};

export = invisibleUnitsAreHidden;
