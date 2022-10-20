import { useEvent, World } from "@rbxts/matter";
import { AnyComponent, ComponentCtor } from "@rbxts/matter/lib/component";
import { Players } from "@rbxts/services";
import {
	ComponentModel,
	Game,
	Gun,
	Health,
	SofSpecial,
	SpecialAbility,
	Transform,
	Unit,
	Walker,
} from "shared/components";
import remotes from "shared/remotes";
import { ComponentNames } from "shared/serdes";

const REPLICATED_COMPONENTS = new Set<ComponentCtor>([
	Unit,
	ComponentModel,
	Walker,
	Gun,
	Game,
	SpecialAbility,
	Transform,
	Health,
	SofSpecial,
]);

const replication = (world: World) => {
	for (const [, plr] of useEvent(Players, "PlayerAdded")) {
		const payload = new Map<string, Map<ComponentNames, { data: AnyComponent }>>();

		for (const [id, entityData] of world) {
			const entityPayload = new Map<ComponentNames, { data: AnyComponent }>();
			payload.set(tostring(id), entityPayload);

			for (const [component, componentInstance] of entityData) {
				if (REPLICATED_COMPONENTS.has(component)) {
					entityPayload.set(tostring(component) as ComponentNames, { data: componentInstance });
				}
			}
		}

		remotes.Server.Get("ComponentReplication").SendToPlayer(plr, payload);
	}

	const changes = new Map<string, Map<ComponentNames, { data: AnyComponent }>>();

	for (const component of REPLICATED_COMPONENTS) {
		for (const [entityId, record] of world.queryChanged(component)) {
			const key = tostring(entityId);
			const name = tostring(component) as ComponentNames;

			if (!changes.has(key)) {
				changes.set(key, new Map());
			}

			if (world.contains(entityId)) {
				changes.get(key)?.set(name, { data: record.new! });
			}
		}
	}

	if (next(changes)[0] !== undefined) {
		remotes.Server.Get("ComponentReplication").SendToAllPlayers(changes);
	}
};

export = {
	system: replication,
	priority: math.huge,
};
