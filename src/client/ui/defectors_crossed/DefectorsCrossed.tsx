import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import PercentageBar from "../common/PercentageBar";
import store from "client/store/store";
import Padding from "../common/Padding";
import Button from "../common/Button";
import remotes from "shared/remotes";

interface DefectorsCrossedProps extends Roact.JsxInstanceProperties<Frame> {
	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const DefectorsCrossed: Hooks.FC<DefectorsCrossedProps> = (props, hooks) => {
	const { useState, useEffect } = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<DefectorsCrossedProps>;

	const [health, setHealth] = useState<number>(store.getState().gameInfoReducer.gameComponent?.health || 0);

	const [maxHealth, setMaxHealth] = useState<number>(store.getState().gameInfoReducer.gameComponent?.maxHealth || 1);

	const [round, setRound] = useState<number>(store.getState().gameInfoReducer.gameComponent?.round || 1);

	const [canSkipRound, setCanSkipRound] = useState<boolean>(
		store.getState().gameInfoReducer.gameComponent?.canSkipRound || false,
	);

	useEffect(() => {
		const connection = store.changed.connect((newState, oldState) => {
			if (newState.gameInfoReducer !== oldState.gameInfoReducer) {
				setHealth(newState.gameInfoReducer.gameComponent?.health || 0);
				setMaxHealth(newState.gameInfoReducer.gameComponent?.maxHealth || 1);
				setRound(newState.gameInfoReducer.gameComponent?.round || 1);
				setCanSkipRound(newState.gameInfoReducer.gameComponent?.canSkipRound || false);
			}
		});

		return () => {
			connection.disconnect();
		};
	}, []);

	return (
		<frame
			{...spreadableProps}
			Position={new UDim2(0.5, 0, 0, 0)}
			AnchorPoint={new Vector2(0.5, 0)}
			Size={new UDim2(0.5, 0, 0.15, 0)}
			BackgroundTransparency={1}
		>
			<frame Size={new UDim2(1, 0, 1 / 3, 0)} BackgroundTransparency={1}>
				<PercentageBar
					Size={new UDim2(1, 0, 1, 0)}
					current={health}
					max={maxHealth}
					color={Color3.fromRGB(255, 92, 92)}
					text={`Round ${round}`}
					ticks={9}
				/>
			</frame>
			<frame Position={new UDim2(0, 0, 0.5, 0)} Size={new UDim2(1, 0, 2 / 3, 0)} BackgroundTransparency={1}>
				<Padding Padding={new UDim(0.1, 0)} />
				{canSkipRound && (
					<Button
						buttonType="success"
						Event={{
							Activated: () => {
								remotes.Client.Get("BringNextWave").SendToServer();
							},
						}}
						Text="BRING ON NEXT WAVE"
						Size={new UDim2(0.3, 0, 1, 0)}
						Position={new UDim2(0.5, 0, 0, 0)}
						AnchorPoint={new Vector2(0.5, 0)}
					/>
				)}
			</frame>
		</frame>
	);
};

export default new Hooks(Roact)(DefectorsCrossed);
