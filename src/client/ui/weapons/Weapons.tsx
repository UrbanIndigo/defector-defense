import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import Slot from "./Slot";
import Towers from "./Towers";
import Padding from "../common/Padding";
import Preview from "./Preview";
import Page from "../common/Page";
import { useSelectUnitContext } from "./context/SelectUnitContext";

interface WeaponsProps extends Roact.JsxInstanceProperties<Frame> {
	close: () => void;

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Weapons: Hooks.FC<WeaponsProps> = (props, hooks) => {
	const {} = hooks;
	const { close } = props;

	const spreadableProps = { ...props } as Partial<WeaponsProps>;

	const { selectedUnitSlot, isPlacingUnit, setIsPlacingUnit } = useSelectUnitContext(hooks);

	if (isPlacingUnit) {
		return Roact.createFragment();
	} else {
		return (
			<Page
				title="PLACE A UNIT"
				Size={new UDim2(0.8, 0, 0.8, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				close={close}
				{...spreadableProps}
			>
				<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
					<Padding Padding={new UDim(0, 8)} />
					<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />

					<Towers Size={new UDim2(0.6, 0, 1, 0)} BackgroundTransparency={1} />

					<frame Size={new UDim2(0.4, 0, 1, 0)} BackgroundTransparency={1}>
						{selectedUnitSlot && <Preview Size={new UDim2(1, 0, 1, 0)} />}
					</frame>
				</frame>
			</Page>
		);
	}
};

export default new Hooks(Roact)(Weapons);
