import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";

interface BackgroundImageProps extends Roact.JsxInstanceProperties<ImageLabel> {
	brightness?: 1 | 2 | 3 | 4 | 5 | 6 | 7;

	Event?: Roact.JsxInstanceEvents<ImageLabel>;
	Change?: Roact.JsxInstanceChangeEvents<ImageLabel>;
}

const BackgroundImage: Hooks.FC<BackgroundImageProps> = (props, hooks) => {
	const {} = hooks;
	const { brightness } = props;

	const spreadableProps = { ...props } as Partial<BackgroundImageProps>;
	delete spreadableProps.brightness;

	const lowBright = (brightness || 5) / 10;
	const highBright = lowBright + 0.3;

	return (
		<imagelabel Image="rbxassetid://2129345445" BorderSizePixel={0} {...spreadableProps}>
			<uigradient
				Rotation={-45}
				Color={
					new ColorSequence(
						new Color3(lowBright, lowBright, lowBright),
						new Color3(highBright, highBright, highBright),
					)
				}
			/>
			<uicorner CornerRadius={new UDim(0, 2)} />
		</imagelabel>
	);
};

export default new Hooks(Roact)(BackgroundImage);
