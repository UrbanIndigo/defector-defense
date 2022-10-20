import { World } from "@rbxts/matter";
import { ComponentModel } from "shared/components";

const removeModels = (world: World) => {
	for (const [id, modelRecord] of world.queryChanged(ComponentModel)) {
		if (!modelRecord.new) {
			if (modelRecord.old && modelRecord.old.model) {
				modelRecord.old.model.Destroy();
			}
		}
	}
};

export = removeModels;
