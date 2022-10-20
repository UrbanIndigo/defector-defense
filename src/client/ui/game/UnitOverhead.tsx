import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import Meter from "client/ui/common/Meter";
import { Gun, SpecialAbility, Unit } from "shared/components";
import bindComponent, { BoundComponent } from "shared/bindComponent";

// onGunChanged?:
// onSpecialChanged?: ReturnType<typeof bindComponent<SpecialAbility>>,

interface UnitOverheadProps extends Roact.JsxInstanceProperties<Frame> {
	currentAmmo?: number;
	maxAmmo?: number;
	currentKills?: number;
	activationKillsRequired?: number;
	onGunChanged?: BoundComponent<Gun>["event"];
	onSpecialChanged?: BoundComponent<SpecialAbility>["event"];

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const UnitOverhead: Hooks.FC<UnitOverheadProps> = (props, hooks) => {
	const { useState, useEffect } = hooks;
	const { currentAmmo, maxAmmo, currentKills, activationKillsRequired, onGunChanged, onSpecialChanged } = props;

	const spreadableProps = { ...props } as Partial<UnitOverheadProps>;
	delete spreadableProps.currentAmmo;
	delete spreadableProps.maxAmmo;
	delete spreadableProps.currentKills;
	delete spreadableProps.activationKillsRequired;
	delete spreadableProps.onGunChanged;
	delete spreadableProps.onSpecialChanged;

	const [special, setSpecial] = useState<number>(currentKills || 0);
	const [ammo, setAmmo] = useState<number>(currentAmmo || 0);

	useEffect(() => {
		const gunConnection = onGunChanged?.Connect((gun) => {
			if (gun) {
				setAmmo(gun.currentAmmo);
			}
		});

		const specialConnection = onSpecialChanged?.Connect((specialAbility) => {
			if (specialAbility) {
				setSpecial(specialAbility.currentKills);
			}
		});

		return () => {
			gunConnection?.Disconnect();
			specialConnection?.Disconnect();
		};
	});

	return (
		<frame {...spreadableProps} BackgroundTransparency={1}>
			<uilistlayout Padding={new UDim(0.2, 0)} />
			<Meter
				Size={new UDim2(1, 0, 0.4, 0)}
				current={ammo || 0}
				max={maxAmmo || 1}
				image="rbxassetid://10768121663"
				color={Color3.fromRGB(97, 8, 8)}
			/>
			{onSpecialChanged !== undefined ? (
				<Meter
					Size={new UDim2(1, 0, 0.4, 0)}
					current={special || 0}
					max={activationKillsRequired || 1}
					image="rbxassetid://10768124458"
					color={Color3.fromRGB(0, 51, 99)}
				/>
			) : (
				<></>
			)}
		</frame>
	);
};

export default new Hooks(Roact)(UnitOverhead);
