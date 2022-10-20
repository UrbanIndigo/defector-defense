import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import BackgroundImage from "./BackgroundImage";

interface PageProps extends Roact.JsxInstanceProperties<Frame> {
	title?: string;
	[Roact.Children]?: Roact.Children;
	close: () => void;

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Page: Hooks.FC<PageProps> = (props, hooks) => {
	const {} = hooks;
	const { title, close } = props;

	const spreadableProps = { ...props } as Partial<PageProps>;
	delete spreadableProps.title;
	delete spreadableProps.close;
	delete spreadableProps[Roact.Children];

	return (
		<frame {...spreadableProps} BackgroundTransparency={1}>
			<BackgroundImage Size={new UDim2(1, 0, 1, 0)} brightness={2} />
			<textlabel
				Text={title}
				Size={new UDim2(1, 0, 0, 0)}
				Position={new UDim2(0.5, 0, 0, 0)}
				TextSize={36}
				AnchorPoint={new Vector2(0.5, 0)}
				ZIndex={2}
				BackgroundTransparency={1}
				TextColor3={new Color3(1, 1, 1)}
				Font={Enum.Font.GothamBold}
			>
				<uistroke />
			</textlabel>
			<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
				{props[Roact.Children]}
			</frame>

			<textbutton
				Text="X"
				TextScaled
				Size={new UDim2(0, 40, 0, 40)}
				Position={new UDim2(1, 0, 0, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Event={{
					Activated: () => {
						close();
					},
				}}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</textbutton>
		</frame>
	);
};

export default new Hooks(Roact)(Page);
