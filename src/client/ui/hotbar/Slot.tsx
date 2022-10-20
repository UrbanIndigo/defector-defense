import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { ContextActionService, HttpService } from "@rbxts/services";
import placementChanged from "client/store/actions/placementChanged";
import store from "client/store/store";
import { PlacingUnit } from "shared/components";
import { UnitDescriptor } from "shared/units";
import Padding from "../common/Padding";
import Viewport from "../common/Viewport";
import { useMoneyContext } from "../contexts/MoneyContext";
import { usePlacementContext } from "../contexts/PlacementContext";
import { useWorldContext } from "../contexts/WorldContext";

interface SlotProps extends Roact.JsxInstanceProperties<Frame> {
	unitDescriptor: UnitDescriptor;
	index: number;
	keycode: Enum.KeyCode;

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Slot: Hooks.FC<SlotProps> = (props, hooks) => {
	const { useEffect } = hooks;
	const { unitDescriptor, index, keycode } = props;

	const spreadableProps = { ...props } as Partial<SlotProps>;
	delete spreadableProps.unitDescriptor;
	delete spreadableProps.index;
	delete spreadableProps.keycode;

	const model = unitDescriptor.unitLevels[0].model.Clone();

	const { world, clientState } = useWorldContext(hooks);

	const { money } = useMoneyContext(hooks);

	const canPurchase = money >= unitDescriptor.price;

	const handleActivated = () => {
		if (canPurchase) {
			world.insert(clientState.clientId!, PlacingUnit({ unit: unitDescriptor, component: "PlacingUnit" }));
			store.dispatch(placementChanged(unitDescriptor));
		}
	};

	useEffect(() => {
		const guid = HttpService.GenerateGUID(false);
		ContextActionService.BindAction(
			guid,
			(_, userInputState) => {
				if (Enum.UserInputState.Begin === userInputState) {
					handleActivated();
				}
			},
			false,
			keycode,
		);

		return () => {
			ContextActionService.UnbindAction(guid);
		};
	}, [handleActivated]);

	const { placingUnit } = usePlacementContext(hooks);

	const shouldOffset = placingUnit !== unitDescriptor;

	return (
		<frame {...spreadableProps} BackgroundTransparency={1} SizeConstraint={Enum.SizeConstraint.RelativeYY}>
			<textbutton
				Position={new UDim2(0, 0, !shouldOffset ? -0.3 : 0, 0)}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.3}
				Text=""
				Event={{
					Activated: () => {
						handleActivated();
					},
				}}
			>
				<Padding Padding={new UDim(0.03, 0)} />
				<uicorner CornerRadius={new UDim(0.07, 0)} />
				<uistroke
					Thickness={2}
					Color={new Color3(0.1, 0.1, 0.1)}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				/>

				<textlabel
					Size={new UDim2(1, 0, 0.2, 0)}
					Text={tostring(index)}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled
				>
					<uistroke Thickness={1} />
				</textlabel>
				<Viewport
					model={model}
					Size={new UDim2(1.5, 0, 1.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					offset={new Vector3(0.5, 1, -5)}
					BackgroundTransparency={1}
				/>
				<textlabel
					Size={new UDim2(1, 0, 0.2, 0)}
					Text={`₩ ${unitDescriptor.price}`}
					AnchorPoint={new Vector2(0, 0.5)}
					Position={new UDim2(0, 0, 0.8, 0)}
					BackgroundTransparency={1}
					TextScaled
					TextColor3={canPurchase ? new Color3(0, 1, 0) : new Color3(1, 0, 0)}
				>
					<uistroke Thickness={1} />
				</textlabel>
			</textbutton>
		</frame>
	);
};

export default new Hooks(Roact)(Slot);
