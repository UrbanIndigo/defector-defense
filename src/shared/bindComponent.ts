import { AnyEntity } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { Component } from "@rbxts/roact";

export type BoundComponent<T> = { current: T; event: RBXScriptSignal<(changedComponent: T | undefined) => void> };

export const componentToEntityIds: Map<ComponentCtor, Map<AnyEntity, BindableEvent>> = new Map();

const bindComponent = <T>(id: AnyEntity, component: ComponentCtor, current: T): BoundComponent<T> => {
	const bindableEvent = new Instance("BindableEvent");

	// add to map
	let entityIds = componentToEntityIds.get(component) || new Map();
	entityIds.set(id, bindableEvent);

	componentToEntityIds.set(component, entityIds);

	return {
		current: current,
		event: bindableEvent.Event,
	};
};

export default bindComponent;
