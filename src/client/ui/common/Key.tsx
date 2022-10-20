import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";

interface KeyProps extends Roact.JsxInstanceProperties<Frame> {
	keyCode: Enum.KeyCode;

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Key: Hooks.FC<KeyProps> = (props, hooks) => {
	const {} = hooks;
	const { keyCode } = props;

	const spreadableProps = { ...props } as Partial<KeyProps>;
	delete spreadableProps.keyCode;

	return (
		<frame {...spreadableProps} BackgroundTransparency={1}>
			<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image="rbxassetid://4893250303">
				<textlabel
					Key="KeyCode"
					Text={keyCode.Name}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(0.6, 0, 0.6, 0)}
					BackgroundTransparency={1}
					Font={Enum.Font.FredokaOne}
					TextScaled
				/>
			</imagelabel>
		</frame>
	);
};

export default new Hooks(Roact)(Key);
