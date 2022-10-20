import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import Slot from "./Slot";
import { units } from "shared/units";
import { usePlacementContext } from "../contexts/PlacementContext";
import { useMoneyContext } from "../contexts/MoneyContext";
import moneySymbol from "shared/moneySymbol";
import Padding from "../common/Padding";

interface HotbarProps extends Roact.JsxInstanceProperties<Frame> {
	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Hotbar: Hooks.FC<HotbarProps> = (props, hooks) => {
	const {} = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<HotbarProps>;

	const keycodes: Enum.KeyCode[] = [
		Enum.KeyCode.One,
		Enum.KeyCode.Two,
		Enum.KeyCode.Three,
		Enum.KeyCode.Four,
		Enum.KeyCode.Five,
		Enum.KeyCode.Six,
		Enum.KeyCode.Seven,
		Enum.KeyCode.Eight,
		Enum.KeyCode.Nine,
	];

	const { money } = useMoneyContext(hooks);

	return (
		<frame
			{...spreadableProps}
			AutomaticSize={Enum.AutomaticSize.X}
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundTransparency={1}
			Key="Hotbar"
		>
			<textlabel
				Size={new UDim2(0, 0, 0.5, 0)}
				AutomaticSize={Enum.AutomaticSize.X}
				Position={new UDim2(0.5, 0, 0, 0)}
				AnchorPoint={new Vector2(0.5, 0)}
				Text={`${moneySymbol} ${money}`}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled
				BackgroundTransparency={1}
			>
				<uistroke />
				<Padding PaddingY={new UDim(0.3, 0)} />
			</textlabel>
			<frame Size={new UDim2(0, 0, 0.5, 0)} Position={new UDim2(0.5, 0, 0.5, 0)} BackgroundTransparency={1}>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0, 8)}
				/>
				{units.map((unitDescriptor, i) => (
					<Slot
						unitDescriptor={unitDescriptor}
						Size={new UDim2(1, 0, 1, 0)}
						index={i + 1}
						keycode={keycodes[i]}
					/>
				))}
			</frame>
		</frame>
	);
};

export default new Hooks(Roact)(Hotbar);
