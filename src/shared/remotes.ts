import { AnyComponent } from "@rbxts/matter";
import Net from "@rbxts/net";
import { FocusPriority } from "./enums/focusPriority";
import { ComponentNames } from "./serdes";
import { UnitDescriptor } from "./units";

export = Net.Definitions.Create({
	ComponentReplication:
		Net.Definitions.ServerToClientEvent<[entities: Map<string, Map<ComponentNames, { data: AnyComponent }>>]>(),

	MoneyChanged: Net.Definitions.ServerToClientEvent<[money: number]>(),
	PlaceUnit: Net.Definitions.ClientToServerEvent<[unit: UnitDescriptor, cframe: CFrame]>(),

	BringNextWave: Net.Definitions.ClientToServerEvent<[]>(),

	ChangeFocusPriority:
		Net.Definitions.ServerAsyncFunction<(entityId: number, focusPriority: FocusPriority) => void>(),

	SellUnit: Net.Definitions.ClientToServerEvent<[entityId: number]>(),
});
