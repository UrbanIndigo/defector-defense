import Make from "@rbxts/make";
import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { RangeIndicator, Transform } from "shared/components";

const radius = Make("Part", {
	Orientation: new Vector3(0, 0, 90),
	Shape: Enum.PartType.Cylinder,
	CanCollide: false,
	Anchored: true,
	Material: Enum.Material.ForceField,
});

const rangeIndicatorShowsRange = (world: World) => {
	for (const [id, rangeIndicatorRecord] of world.queryChanged(RangeIndicator)) {
		if (rangeIndicatorRecord.new && !rangeIndicatorRecord.old) {
			const range = radius.Clone();
			range.Size = new Vector3(1, rangeIndicatorRecord.new.radius * 2, rangeIndicatorRecord.new.radius * 2);
			range.Position = rangeIndicatorRecord.new.cframe.Position;
			range.Parent = Workspace;

			world.insert(
				id,
				rangeIndicatorRecord.new.patch({
					part: range,
				}),
			);
		} else if (rangeIndicatorRecord.old) {
			const part = rangeIndicatorRecord.old.part;
			if (part) {
				part.Destroy();
			}
		}
	}
};

export = rangeIndicatorShowsRange;
