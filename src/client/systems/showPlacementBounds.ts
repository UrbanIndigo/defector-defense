import Make from "@rbxts/make";
import { World } from "@rbxts/matter";
import { RunService, Workspace } from "@rbxts/services";
import { ClientState } from "shared/clientState";
import { Client, ComponentModel, PlacingUnit, RadiusIndicator, Unit } from "shared/components";
import getLowestPositionFromModel from "shared/modules/getLowestPositionFromModel";

const radius = Make("Part", {
	Orientation: new Vector3(0, 0, 90),
	Shape: Enum.PartType.Cylinder,
	Anchored: true,
	Material: Enum.Material.ForceField,
});

const showPlacementBounds = (world: World, state: ClientState) => {
	for (const [_, placingUnit] of world.queryChanged(PlacingUnit)) {
		if (placingUnit.new) {
			for (const [id, unit, model] of world.query(Unit, ComponentModel).without(RadiusIndicator)) {
				if (!model || !model.model.PrimaryPart) {
					continue;
				}

				const r = radius.Clone();
				r.Size = new Vector3(0.5, unit.unit.sizeDiameter, unit.unit.sizeDiameter);
				r.Parent = Workspace;
				r.Position = getLowestPositionFromModel(model.model);
				world.insert(
					id,
					RadiusIndicator({
						part: r,
						color: new Color3(1, 1, 1),
						component: "RadiusIndicator",
					}),
				);
			}
		} else {
			for (const [id, unit, radiusIndicator] of world.query(Unit, RadiusIndicator)) {
				world.remove(id, RadiusIndicator);
			}
		}
	}

	for (const [id, radiusIndicatorRecord] of world.queryChanged(RadiusIndicator)) {
		if (radiusIndicatorRecord.new) {
			radiusIndicatorRecord.new.part.Color = radiusIndicatorRecord.new.color;
		} else if (radiusIndicatorRecord.old) {
			radiusIndicatorRecord.old?.part.Destroy();
		}
	}
};

export = showPlacementBounds;
