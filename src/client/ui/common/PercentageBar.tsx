import { Spring } from "@rbxts/flipper";
import Roact from "@rbxts/roact";
import { useSpring } from "@rbxts/roact-flipper";
import Hooks from "@rbxts/roact-hooks";
import { CurrentNode } from "shared/components";
import Padding from "./Padding";

interface Props extends Roact.JsxInstanceProperties<Frame> {
	text?: string;
	current: number;
	max: number;
	color: Color3;
	ticks?: number;
}

const PercentageBar: Hooks.FC<Props> = (props, hooks) => {
	const { useEffect } = hooks;
	const { current, max, color, ticks, text } = props;
	// const [sizeBinding, sizeMotor] = useSpring<number>(hooks, 0);
	// useEffect(() => {
	// 	if (max === 0) {
	// 		return;
	// 	}
	// 	sizeMotor.setGoal(new Spring(current / max));
	// }, [current, max]);
	const spreadableProps = { ...props } as Partial<Props>;
	delete spreadableProps.current;
	delete spreadableProps.max;
	delete spreadableProps.color;
	delete spreadableProps.ticks;
	delete spreadableProps.text;

	return (
		<canvasgroup BackgroundColor3={Color3.fromRGB(24, 43, 40)} BorderSizePixel={0} {...spreadableProps}>
			<uistroke Thickness={3} />
			<frame BackgroundTransparency={1} Size={new UDim2(current / max, 0, 1, 0)} ZIndex={1} BorderSizePixel={0}>
				<frame BackgroundColor3={color} Size={new UDim2(1, 0, 1, 0)} BorderSizePixel={0} />
			</frame>
			<frame
				BorderSizePixel={0}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.9}
				Size={new UDim2(1, 0, 0.5, 0)}
				Position={new UDim2(0, 0, 0.5, 0)}
			/>
			<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
				<Padding PaddingY={new UDim(0.1, 0)} PaddingX={new UDim(0, 8)} />
				<textlabel
					BackgroundTransparency={1}
					Text={`${math.floor(current)} / ${math.floor(max)}`}
					// Font={Enum.Font.FredokaOne}
					ZIndex={2}
					Size={new UDim2(1, 0, 1, 0)}
					TextXAlignment={Enum.TextXAlignment.Right}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled
				>
					<uistroke />
				</textlabel>
				{text ? (
					<textlabel
						BackgroundTransparency={1}
						Text={text}
						ZIndex={2}
						Size={new UDim2(1, 0, 1, 0)}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled
					>
						<uistroke />
					</textlabel>
				) : undefined}
			</frame>

			{ticks !== undefined &&
				ticks !== 0 &&
				new Array(ticks, 0).map((_, i) => (
					<frame
						BorderSizePixel={0}
						BackgroundTransparency={0.8}
						BackgroundColor3={new Color3()}
						Size={new UDim2(0, 2, 1, 0)}
						AnchorPoint={new Vector2(0.5, 0)}
						Position={new UDim2((i + 1) / (ticks + 1), 0, 0, 0)}
					/>
				))}
		</canvasgroup>
	);
};

export default new Hooks(Roact)(PercentageBar);
