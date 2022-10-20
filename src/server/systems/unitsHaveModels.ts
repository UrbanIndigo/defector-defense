import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { ComponentModel, Unit } from "shared/components";

/**
 * Give units models
 */
const unitsHaveModels = (world: World) => {
	for (const [id, unit] of world.query(Unit).without(ComponentModel)) {
		const model = unit.unit.unitLevels[0].model.Clone();
		model.Parent = Workspace;

		model.GetDescendants().forEach((instance) => {
			if (instance.IsA("BasePart")) {
				// instance.Anchored = true;
				instance.CanCollide = false;
				if (instance.Name === "HumanoidRootPart") {
					instance.Anchored = true;
				}
			}
		});

		world.insert(
			id,
			ComponentModel({
				model: model,
			}),
		);
	}
};

export = unitsHaveModels;
