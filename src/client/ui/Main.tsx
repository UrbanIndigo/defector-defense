import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import MoneyProvider from "./contexts/MoneyContext";
import PlacementProvider from "./contexts/PlacementContext";
import GameOver from "./game_over/GameOver";
import Hud from "./hud/Hud";
import PlacementGui from "./placement/PlacementGui";

interface MainProps extends Roact.JsxInstanceProperties<ScreenGui> {
	Event?: Roact.JsxInstanceEvents<ScreenGui>;
	Change?: Roact.JsxInstanceChangeEvents<ScreenGui>;
}

const Main: Hooks.FC<MainProps> = (props, hooks) => {
	const {} = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<MainProps>;

	return (
		<screengui ResetOnSpawn={false} IgnoreGuiInset {...spreadableProps}>
			<PlacementProvider>
				<MoneyProvider>
					<PlacementGui />
					<Hud Size={new UDim2(1, 0, 1, 0)} />
					<GameOver
						Size={new UDim2(0.45, 0, 0.3, 0)}
						Position={new UDim2(0.5, 0, 0.5, 0)}
						AnchorPoint={new Vector2(0.5, 0.5)}
					/>
				</MoneyProvider>
			</PlacementProvider>
		</screengui>
	);
};

export default new Hooks(Roact)(Main);
