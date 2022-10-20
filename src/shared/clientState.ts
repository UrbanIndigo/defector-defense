import { AnyEntity } from "@rbxts/matter";
import { UnitDescriptor } from "./units";

export interface ClientState {
	entityIdMap: Map<string, AnyEntity>;

	clientEntityToServerEntity: Map<AnyEntity | Readonly<AnyEntity>, number>;

	clientId?: AnyEntity;

	placingUnit?: UnitDescriptor;
}
