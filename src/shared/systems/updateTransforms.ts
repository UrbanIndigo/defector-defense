import { World } from "@rbxts/matter";
import { ComponentModel, Transform } from "shared/components";

const updateTransforms = (world: World) => {
	// Handle Transform added/changed to existing entity with Model

	for (const [id, transformRecord] of world.queryChanged(Transform)) {
		if (!world.contains(id)) {
			continue;
		}

		const model = world.get(id, ComponentModel);

		if (!model) {
			continue;
		}

		// Take care to ignore the changed event if it was us that triggered it
		if (transformRecord.new && !transformRecord.new.doNotReconcile) {
			model?.model.PivotTo(transformRecord.new.cframe);
		}
	}

	// Handle Model added/changed on existing entity with Transform
	for (const [id, modelRecord] of world.queryChanged(ComponentModel)) {
		if (!world.contains(id)) {
			continue;
		}

		const transform = world.get(id, Transform);

		if (!transform) {
			continue;
		}

		if (modelRecord.new) {
			modelRecord.new.model.PivotTo(transform.cframe);
		}
	}

	// Update Transform on unanchored Models
	for (const [id, model, transform] of world.query(ComponentModel, Transform)) {
		if (!model.model.PrimaryPart || model.model.PrimaryPart.Anchored) {
			continue;
		}

		const existingCframe = transform.cframe;
		const currentCframe = model.model.PrimaryPart.CFrame;

		// Only insert if actual position is different from the Transform component
		if (currentCframe !== existingCframe) {
			world.insert(
				id,
				Transform({
					cframe: currentCframe,
					doNotReconcile: true,
				}),
			);
		}
	}
};

export = updateTransforms;
