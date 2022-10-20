import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";

interface PaddingProps extends Roact.JsxInstanceProperties<UIPadding> {
	Padding?: UDim | Roact.Binding<UDim>;
	PaddingX?: UDim | Roact.Binding<UDim>;
	PaddingY?: UDim | Roact.Binding<UDim>;

	Event?: Roact.JsxInstanceEvents<UIPadding>;
	Change?: Roact.JsxInstanceChangeEvents<UIPadding>;
}

const Padding: Hooks.FC<PaddingProps> = (props, hooks) => {
	const {} = hooks;
	const { Padding, PaddingX, PaddingY } = props;

	const spreadableProps = { ...props } as Partial<PaddingProps>;
	delete spreadableProps.Padding;
	delete spreadableProps.PaddingX;
	delete spreadableProps.PaddingY;

	return (
		<uipadding
			{...spreadableProps}
			PaddingBottom={PaddingY ?? Padding}
			PaddingTop={PaddingY ?? Padding}
			PaddingLeft={PaddingX || Padding}
			PaddingRight={PaddingX || Padding}
		/>
	);
};

export default new Hooks(Roact)(Padding);
