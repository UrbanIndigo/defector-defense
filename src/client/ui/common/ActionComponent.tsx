import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import Key from "./Key";

interface ActionProps extends Roact.JsxInstanceProperties<Frame> {
	key: Enum.KeyCode;
	text: string;

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const ActionComponent: Hooks.FC<ActionProps> = (props, hooks) => {
	const {} = hooks;
	const { key, text } = props;

	const spreadableProps = { ...props } as Partial<ActionProps>;
	delete spreadableProps.key;
	delete spreadableProps.text;

	return (
		<frame
			Size={new UDim2(0, 0, 1, 0)}
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundTransparency={1}
			{...spreadableProps}
		>
			<uilistlayout
				SortOrder={Enum.SortOrder.LayoutOrder}
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, 8)}
			/>

			<Key
				keyCode={key}
				Size={new UDim2(1, 0, 1, 0)}
				SizeConstraint={Enum.SizeConstraint.RelativeYY}
				LayoutOrder={0}
				BackgroundTransparency={1}
			/>

			<frame AutomaticSize={Enum.AutomaticSize.X} Size={new UDim2(0, 0, 1, 0)} BackgroundTransparency={1}>
				<textlabel
					Size={new UDim2(0, 0, 0.7, 0)}
					AnchorPoint={new Vector2(0, 0.5)}
					Position={new UDim2(0, 0, 0.5, 0)}
					Key="Action Name"
					Text={text}
					LayoutOrder={1}
					BackgroundTransparency={1}
					AutomaticSize={Enum.AutomaticSize.X}
					TextScaled
					Font={Enum.Font.FredokaOne}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextColor3={new Color3(1, 1, 1)}
				>
					<uistroke Thickness={1} Transparency={0.5} />
				</textlabel>
			</frame>
		</frame>
	);
};

export default new Hooks(Roact)(ActionComponent);
