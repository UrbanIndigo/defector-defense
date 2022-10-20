import { World } from "@rbxts/matter";
import { componentToEntityIds } from "shared/bindComponent";

const updateBoundComponents = (world: World) => {
	componentToEntityIds.forEach((entityIds, component) => {
		for (const [id, c] of world.queryChanged(component)) {
			const bindableEvent = entityIds.get(id);
			if (bindableEvent) {
				bindableEvent.Fire(c.new);
			}
		}
	});
};

export = updateBoundComponents;
