import Roact from "@rbxts/roact";
import bindComponent, { BoundComponent } from "shared/bindComponent";
import { Gun, SpecialAbility } from "shared/components";
import UnitOverhead from "./UnitOverhead";

const mountUnitOverheadToPart = (
	part: BasePart,
	onGunChanged?: BoundComponent<Gun>,
	onSpecialChanged?: BoundComponent<SpecialAbility>,
) => {
	const tree = (
		<billboardgui Key="UnitInfo" Size={new UDim2(3, 0, 0.7, 0)} StudsOffset={new Vector3(0, 2, 0)}>
			<UnitOverhead
				Size={new UDim2(1, 0, 1, 0)}
				currentAmmo={onGunChanged?.current.currentAmmo}
				maxAmmo={onGunChanged?.current.gunInfo.ammo}
				currentKills={onSpecialChanged?.current.currentKills}
				activationKillsRequired={onSpecialChanged?.current.activationKillsRequired}
				onGunChanged={onGunChanged?.event}
				onSpecialChanged={onSpecialChanged?.event}
			/>
		</billboardgui>
	);

	const handle = Roact.mount(tree, part, "UnitOverhead");
};

export default mountUnitOverheadToPart;
