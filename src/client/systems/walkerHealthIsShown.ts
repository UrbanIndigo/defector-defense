import { World } from "@rbxts/matter";
import mountToPart from "client/ui/game/health/mountToPart";
import bindComponent from "shared/bindComponent";
import { ClientState } from "shared/clientState";
import { ComponentModel, Health, Hovered, PlacingUnit, Walker } from "shared/components";
import getHovered from "shared/getHovered";

const walkerHealthIsShown = (world: World, state: ClientState) => {
	for (const [id, walker, model, health] of world.query(Walker, ComponentModel, Health).without(Hovered)) {
		const head = model.model.FindFirstChild("Head") as Part;

		if (!head) {
			continue;
		}

		const hovered = Hovered({
			hovered: false,
		});

		const hoveredSignal = bindComponent(id, Hovered, hovered);
		const healthSignal = bindComponent(id, Health, health);

		mountToPart(walker.walkerType.name, head, hoveredSignal, healthSignal);

		world.insert(id, hovered);
	}

	const [_, placingUnit] = world.query(PlacingUnit).next();

	const [hoveredId, isWalker] = getHovered(placingUnit !== undefined, world);

	for (const [id, walker, hovered] of world.query(Walker, Hovered)) {
		if (id === hoveredId && !hovered.hovered) {
			world.insert(
				id,
				hovered.patch({
					hovered: true,
				}),
			);
		} else if (id !== hoveredId && hovered.hovered) {
			world.insert(
				id,
				hovered.patch({
					hovered: false,
				}),
			);
		}
	}
};

export = walkerHealthIsShown;
