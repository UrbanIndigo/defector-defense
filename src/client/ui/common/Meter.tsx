import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";

interface MeterProps extends Roact.JsxInstanceProperties<Frame> {
	image: string;
	current: number;
	max: number;
	color: Color3;

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Meter: Hooks.FC<MeterProps> = (props, hooks) => {
	const { useState } = hooks;
	const { image, current, max, color } = props;

	const spreadableProps = { ...props } as Partial<MeterProps>;
	delete spreadableProps.image;
	delete spreadableProps.current;
	delete spreadableProps.max;
	delete spreadableProps.color;

	const [textSize, setTextSize] = useState<number>(0);

	return (
		<frame {...spreadableProps} BackgroundTransparency={1}>
			<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />

			<imagelabel
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 1, 0)}
				SizeConstraint={Enum.SizeConstraint.RelativeYY}
				Image={image}
				ScaleType={Enum.ScaleType.Fit}
				Change={{
					AbsoluteSize: (rbx) => {
						setTextSize(rbx.AbsoluteSize.X);
					},
				}}
			/>

			<frame Key="Total" Size={new UDim2(1, -textSize, 1, 0)} BackgroundTransparency={1}>
				<frame
					Size={new UDim2(1, 0, 0.7, 0)}
					AnchorPoint={new Vector2(0, 0.5)}
					BorderSizePixel={0}
					BackgroundTransparency={0.5}
					BackgroundColor3={color}
					Position={new UDim2(0, 0, 0.5, 0)}
				>
					<frame
						Key="Progress"
						Size={new UDim2(current / max, 0, 1, 0)}
						BackgroundColor3={color}
						BorderSizePixel={0}
					/>
				</frame>
			</frame>
		</frame>
	);
};

export default new Hooks(Roact)(Meter);
