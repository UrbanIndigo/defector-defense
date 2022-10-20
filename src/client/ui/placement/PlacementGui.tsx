import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { UserInputService } from "@rbxts/services";
import ActionComponent from "../common/ActionComponent";
import { usePlacementContext } from "../contexts/PlacementContext";

interface PlacementGuiProps extends Roact.JsxInstanceProperties<Frame> {
	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const PlacementGui: Hooks.FC<PlacementGuiProps> = (props, hooks) => {
	const { useEffect, useState } = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<PlacementGuiProps>;

	const { placingUnit } = usePlacementContext(hooks);

	const [position, setPosition] = useState<UDim2 | undefined>(undefined);

	useEffect(() => {
		const mouseMoveConnection = UserInputService.InputChanged.Connect((inputObject, gameProcessedEvent) => {
			if (gameProcessedEvent) {
				return;
			}

			if (inputObject.UserInputType === Enum.UserInputType.MouseMovement) {
				const mousePosition = UserInputService.GetMouseLocation();
				setPosition(new UDim2(0, mousePosition.X + 16, 0, mousePosition.Y - 32));
			}
		});

		return () => mouseMoveConnection.Disconnect();
	}, [position]);

	if (placingUnit && position) {
		return (
			<frame
				Position={position}
				Size={new UDim2(0, 70, 0, 0)}
				AutomaticSize={Enum.AutomaticSize.Y}
				{...spreadableProps}
				BackgroundTransparency={1}
			>
				<uilistlayout Padding={new UDim(0, 4)} />
				<ActionComponent Size={new UDim2(1, 0, 0, 20)} key={Enum.KeyCode.R} text="Rotate" />
				<ActionComponent Size={new UDim2(1, 0, 0, 20)} key={Enum.KeyCode.Q} text="Cancel" />
			</frame>
		);
	} else {
		return <></>;
	}
};

export default new Hooks(Roact)(PlacementGui);
