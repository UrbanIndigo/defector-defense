import { AnyComponent, AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { ClientState } from "shared/clientState";
import remotes from "shared/remotes";
import * as components from "shared/components";
import { UnionComponentsMap } from "shared/serdes";

const receiveReplication = (world: World, state: ClientState) => {
	remotes.Client.Get("ComponentReplication").Connect((entities) => {
		const entityIdMap = state.entityIdMap;
		const clientEntityToServerEntity = state.clientEntityToServerEntity;

		for (const [serverEntityId, componentMap] of entities) {
			let clientEntityId = entityIdMap.get(serverEntityId);

			if (clientEntityId !== undefined && next(componentMap)[0] === undefined) {
				world.despawn(clientEntityId);
				entityIdMap.delete(serverEntityId);
				continue;
			}

			const componentsToInsert = new Array<AnyComponent>();
			const componentsToRemove = new Array<ComponentCtor>();

			const insertNames = new Array<string>();
			const removeNames = new Array<string>();

			for (const [name, container] of componentMap) {
				if (container.data) {
					componentsToInsert.push(components[name](container.data as UnionComponentsMap));
					insertNames.push(name);
				} else {
					componentsToRemove.push(components[name]);
					removeNames.push(name);
				}
			}

			if (clientEntityId === undefined) {
				clientEntityId = world.spawn(...componentsToInsert);

				clientEntityToServerEntity.set(clientEntityId, tonumber(serverEntityId)!);
				entityIdMap.set(serverEntityId, clientEntityId);
			} else {
				if (componentsToInsert.size() > 0) {
					world.insert(clientEntityId, ...componentsToInsert);
				}

				if (componentsToRemove.size() > 0) {
					world.remove(clientEntityId, ...componentsToRemove);
				}
			}
		}
	});
};

export default receiveReplication;
