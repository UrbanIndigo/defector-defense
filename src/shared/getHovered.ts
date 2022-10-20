import { AnyEntity, World } from "@rbxts/matter";
import { ComponentModel, Unit, Walker } from "./components";
import getMouseTarget from "./modules/getMouseTarget";

const getHovered = (isPlacing: boolean, world: World) => {
	if (isPlacing) {
		return [undefined, false] as LuaTuple<[undefined, boolean]>;
	}

	const raycastParams = new RaycastParams();
	raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;

	const raycastResult = getMouseTarget(raycastParams);

	if (!raycastResult) {
		return [undefined, false] as LuaTuple<[undefined, boolean]>;
	}

	for (const [id, walker, walkerModel] of world.query(Walker, ComponentModel)) {
		if (raycastResult.Instance.IsDescendantOf(walkerModel.model)) {
			return [id as AnyEntity, true] as LuaTuple<[AnyEntity, boolean]>;
		}
	}

	for (const [id, unit, unitModel] of world.query(Unit, ComponentModel)) {
		if (raycastResult.Instance.IsDescendantOf(unitModel.model)) {
			return [id as AnyEntity, false] as LuaTuple<[AnyEntity, boolean]>;
		}
	}

	return [undefined, false] as LuaTuple<[undefined, boolean]>;
};

export default getHovered;
