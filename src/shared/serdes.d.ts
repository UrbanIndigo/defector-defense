import { GenericOfComponent } from "@rbxts/matter";
import * as components from "./components";

declare type ComponentNames = keyof typeof components;
declare type MappedComponentToName<T extends ComponentNames> = GenericOfComponent<ReturnType<typeof components[T]>>;

declare type ComponentsMap<T extends ComponentNames> = T extends []
	? T
	: T extends [infer F, ...infer B]
	? F extends keyof T
		? B extends ComponentNames
			? [MappedComponentToName<T>, ...ComponentsMap<B>]
			: never
		: never
	: never;

declare type UnionComponentsMap = ComponentsMap<ComponentNames>;
