import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import Padding from "../common/Padding";

interface HudButtonProps extends Roact.JsxInstanceProperties<TextButton> {
	Event?: Roact.JsxInstanceEvents<TextButton>;
	Change?: Roact.JsxInstanceChangeEvents<TextButton>;
}

const HudButton: Hooks.FC<HudButtonProps> = (props, hooks) => {
	const {} = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<HudButtonProps>;

	return (
		<textbutton {...spreadableProps} Text="">
			<uilistlayout />
			<Padding Padding={new UDim(0, 2)} />
			<textlabel Text="👨🏽‍✈️" Size={new UDim2(1, 0, 0.8, 0)} TextScaled BackgroundTransparency={1} />
			<textlabel Text="UNITS" Size={new UDim2(1, 0, 0.2, 0)} BackgroundTransparency={1} />
		</textbutton>
	);
};

export default new Hooks(Roact)(HudButton);
