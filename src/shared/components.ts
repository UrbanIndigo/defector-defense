import { AnyEntity, component } from "@rbxts/matter";
import { FocusPriority } from "./enums/focusPriority";
import { GunInfo } from "./guns";
import { UnitDescriptor } from "./units";
import { WalkerType } from "./walkers";

export const Transform = component<{ cframe: CFrame; doNotReconcile?: boolean }>("Transform");
export type Transform = ReturnType<typeof Transform>;

export const Hovered = component<{ hovered: boolean }>("Hovered");
export type Hovered = ReturnType<typeof Hovered>;

export const Health = component<{
	health: number;
	maxHealth: number;
	dead?: boolean;
	deathTime?: number;
	component: "Health";
}>("Health");
export type Health = ReturnType<typeof Health>;

export const Client = component<{
	placingUnit?: UnitDescriptor;
	component: "Client";
}>("Client");
export type Client = ReturnType<typeof Client>;

export const PlacingUnit = component<{
	unit: UnitDescriptor;
	component: "PlacingUnit";
}>("PlacingUnit");
export type PlacingUnit = ReturnType<typeof PlacingUnit>;

export const Unit = component<{
	unit: UnitDescriptor;
	level: number;
	range: number;
	creator: Player;

	focusPriority: FocusPriority;

	hasMeter?: boolean;
	hasTarget?: boolean;
	target?: AnyEntity;
	lastFire?: number;
	component: "Unit";
}>("Unit");
export type Unit = ReturnType<typeof Unit>;

export const Gun = component<{
	gunInfo: GunInfo;
	model: Model;
	currentAmmo: number;

	disabled?: boolean;
	reloading: boolean;
	reloadingTime?: number;
	lastFire?: number;

	component: "Gun";
}>("Gun");
export type Gun = ReturnType<typeof Gun>;

export const Selected = component("Selected");
export type Selected = ReturnType<typeof Selected>;

export const ComponentModel = component<{ model: Model }>("ComponentModel");
export type ComponentModel = ReturnType<typeof ComponentModel>;

export const RadiusIndicator = component<{ part: Part; color: Color3; component: "RadiusIndicator" }>(
	"RadiusIndicator",
);
export type RadiusIndicator = ReturnType<typeof RadiusIndicator>;

export const RangeIndicator = component<{ part?: Part; color: Color3; radius: number; cframe: CFrame }>(
	"RangeIndicator",
);
export type RangeIndicator = ReturnType<typeof RangeIndicator>;

export const Events = component<{
	[eventName: string]: BindableEvent<Callback>;
}>("Events");
export type Events = ReturnType<typeof Events>;

export const Walker = component<{
	currentNode?: Part;
	nextNode?: Part;
	walkerType: WalkerType;

	spawnDelay: number;

	distanceWalked: number;

	onHovered?: BindableEvent;
}>("Walker");
export type Walker = ReturnType<typeof Walker>;

export const CurrentNode = component<{
	node: Part;
}>("CurrentNode");
export type CurrentNode = ReturnType<typeof CurrentNode>;

export const NextNode = component<{
	node: Part;
}>("CurrentNextNodeNode");
export type NextNode = ReturnType<typeof NextNode>;

export const Game = component<{
	round: number;
	health: number;
	maxHealth: number;

	gameOver: boolean;

	skipRoundTime?: number;
	canSkipRound?: boolean;

	walkerEntities: Set<AnyEntity>;
}>("Game");
export type Game = ReturnType<typeof Game>;

export const SpecialAbility = component<{
	currentKills: number;
	activationKillsRequired: number;
	cooldown?: number;

	component: string;
}>("SpecialAbility");
export type SpecialAbility = ReturnType<typeof SpecialAbility>;

export const HasMeter = component<{}>("HasMeter");
export type HasMeter = ReturnType<typeof HasMeter>;

export const SofSpecial = component("SofSpecial");
export type SofSpecial = ReturnType<typeof SofSpecial>;

export const MossSpecial = component<{
	attacksLeft: number;
	ghost: AnyEntity;
}>("MossSpecial");
export type MossSpecial = ReturnType<typeof MossSpecial>;

export const Invisible = component("Invisible");
export type Invisible = ReturnType<typeof Invisible>;

export const AnimationHandler = component<{ animationId: string }>("AnimationHandler");
export type AnimationHandler = ReturnType<typeof AnimationHandler>;
