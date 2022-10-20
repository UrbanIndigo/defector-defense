import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import { UnitDescriptor } from "shared/units";
import { useSelectUnitContext } from "./context/SelectUnitContext";
import Padding from "../common/Padding";
import { useMoneyContext } from "../contexts/MoneyContext";
import Viewport from "../common/Viewport";
import BackgroundImage from "../common/BackgroundImage";

interface SlotProps extends Roact.JsxInstanceProperties<TextButton> {
	unitDescriptor: UnitDescriptor;

	Event?: Roact.JsxInstanceEvents<TextButton>;
	Change?: Roact.JsxInstanceChangeEvents<TextButton>;
}

const Slot: Hooks.FC<SlotProps> = (props, hooks) => {
	const {} = hooks;
	const { unitDescriptor } = props;

	const spreadableProps = { ...props } as Partial<SlotProps>;
	delete spreadableProps.unitDescriptor;

	const { setSelectedUnitSlot, selectedUnitSlot } = useSelectUnitContext(hooks);

	const selected = selectedUnitSlot === unitDescriptor;

	const { money } = useMoneyContext(hooks);

	return (
		<textbutton
			{...spreadableProps}
			Text={unitDescriptor.name}
			BorderSizePixel={selected ? 2 : 1}
			Event={{
				Activated: () => {
					setSelectedUnitSlot(unitDescriptor);
				},
			}}
		>
			{/* <BackgroundImage Size={new UDim2(1, 0, 1, 0)} brightness={7} />
			<imagelabel
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 1, 0)}
				Image={"rbxassetid://192776775"}
				ImageTransparency={0.5}
			/>
			<Viewport
				model={unitDescriptor.unitLevels[0].model}
				Size={new UDim2(1, 0, 1, 0)}
				offset={new Vector3(0.5, 1, -5)}
				BackgroundTransparency={1}
			/>
			<textlabel
				Position={new UDim2(1, 0, 1, 0)}
				AnchorPoint={new Vector2(1, 1)}
				Text={"₩ " + unitDescriptor.price}
				TextColor3={money >= unitDescriptor.price ? new Color3(0, 0, 0) : new Color3(1, 0, 0)}
				AutomaticSize={Enum.AutomaticSize.XY}
				TextSize={12}
				BackgroundColor3={new Color3(1, 1, 1)}
				Font={Enum.Font.Gotham}
			>
				<uicorner CornerRadius={new UDim(0, 4)} />
				<Padding PaddingX={new UDim(0, 2)} PaddingY={new UDim(0, 1)} />
			</textlabel> */}
		</textbutton>
	);
};

export default new Hooks(Roact)(Slot);
