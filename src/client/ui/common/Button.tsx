import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import { useSpring } from "@rbxts/roact-flipper";
import { Spring } from "@rbxts/flipper";
import button from "@rbxts/plasma/src/widgets/button";
import Padding from "./Padding";
import { ColorTypes, colorTypeToColors } from "shared/modules/colors";

interface ButtonProps extends Roact.JsxInstanceProperties<TextButton> {
	buttonType: ColorTypes;
	disabled?: boolean;

	Event?: Roact.JsxInstanceEvents<TextButton>;
	Change?: Roact.JsxInstanceChangeEvents<TextButton>;
}

const Button: Hooks.FC<ButtonProps> = (props, hooks) => {
	const {} = hooks;
	const { buttonType, disabled, Text, Event } = props;

	const spreadableProps = { ...props } as Partial<ButtonProps>;
	delete spreadableProps.buttonType;
	delete spreadableProps.disabled;
	if (spreadableProps.Event) {
		delete spreadableProps.Event.Activated;
	}

	const colors = disabled
		? {
				backgroundColor3: Color3.fromRGB(204, 204, 204),
				textColor3: Color3.fromRGB(128, 128, 128),
		  }
		: colorTypeToColors[buttonType];

	return (
		<textbutton
			{...spreadableProps}
			Active={!disabled}
			Text=""
			BackgroundColor3={colors.backgroundColor3}
			AutoButtonColor={false}
		>
			<frame
				Key="Shadow"
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={0.5}
				BorderSizePixel={0}
				ZIndex={1}
				BackgroundColor3={new Color3()}
			>
				<uicorner CornerRadius={new UDim(0, 4)} />
			</frame>
			<uicorner CornerRadius={new UDim(0, 4)} />
			<textlabel
				Size={new UDim2(1, 0, 0.9, 0)}
				Text={(Text as string).upper()}
				BackgroundColor3={colors.backgroundColor3}
				TextColor3={colors.textColor3}
				ZIndex={2}
				TextScaled
				Font={Enum.Font.GothamBold}
			>
				<Padding PaddingX={new UDim(0.1, 0)} PaddingY={new UDim(0.2, 0)} />
				<uicorner CornerRadius={new UDim(0, 4)} />
			</textlabel>
		</textbutton>
	);
};

export default new Hooks(Roact)(Button);
