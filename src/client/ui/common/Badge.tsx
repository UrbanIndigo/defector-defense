import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import Padding from "./Padding";

interface BadgeProps extends Roact.JsxInstanceProperties<TextLabel> {
	Event?: Roact.JsxInstanceEvents<TextLabel>;
	Change?: Roact.JsxInstanceChangeEvents<TextLabel>;
}

const Badge: Hooks.FC<BadgeProps> = (props, hooks) => {
	const {} = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<BadgeProps>;

	return (
		<textlabel
			{...spreadableProps}
			AutomaticSize={Enum.AutomaticSize.XY}
			Font={Enum.Font.GothamBold}
			TextColor3={new Color3(1, 1, 1)}
			TextSize={13}
			BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
		>
			<uicorner CornerRadius={new UDim(0, 4)} />
			<Padding PaddingX={new UDim(0, 8)} PaddingY={new UDim(0, 2)} />
		</textlabel>
	);
};

export default new Hooks(Roact)(Badge);
