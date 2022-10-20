import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import DefectorsCrossed from "../defectors_crossed/DefectorsCrossed";
import Hotbar from "../hotbar/Hotbar";
import UnitInfo from "../unit_info/UnitInfo";

interface HudProps extends Roact.JsxInstanceProperties<Frame> {
	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Hud: Hooks.FC<HudProps> = (props, hooks) => {
	const {} = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<HudProps>;

	return (
		<frame {...spreadableProps} BackgroundTransparency={1}>
			{/* <Padding Padding={new UDim(0.03, 0)} /> */}
			<UnitInfo Size={new UDim2(1, 0, 0.8, 0)} />
			<Hotbar
				Position={new UDim2(0.5, 0, 1, 0)}
				AnchorPoint={new Vector2(0.5, 1)}
				Size={new UDim2(1, 0, 0.2, 0)}
			/>
			<DefectorsCrossed />
		</frame>
	);
};

export default new Hooks(Roact)(Hud);
