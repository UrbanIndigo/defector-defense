import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import Slot from "./Slot";
import Padding from "../common/Padding";
import { units } from "shared/units";

interface TowersProps extends Roact.JsxInstanceProperties<Frame> {
	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Towers: Hooks.FC<TowersProps> = (props, hooks) => {
	const {} = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<TowersProps>;

	return (
		<frame {...spreadableProps}>
			<Padding Padding={new UDim(0, 8)} />
			<uigridlayout CellSize={new UDim2(0, 80, 0, 80)} />
			{units.map((unitDescriptor) => (
				<Slot unitDescriptor={unitDescriptor} />
			))}
		</frame>
	);
};

export default new Hooks(Roact)(Towers);
