import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import Button from "../common/Button";
import Padding from "../common/Padding";
import { colorTypeToColors } from "shared/modules/colors";
import store from "client/store/store";

interface GameOverProps extends Roact.JsxInstanceProperties<Frame> {
	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const GameOver: Hooks.FC<GameOverProps> = (props, hooks) => {
	const { useState, useEffect } = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<GameOverProps>;

	const [imageWidth, setImageWidth] = useState<number>(0);

	const [round, setRound] = useState<number>(0);

	const [isGameOver, setIsGameOver] = useState<boolean>(false);

	useEffect(() => {
		const storeConnection = store.changed.connect((newState, oldState) => {
			if (newState.gameInfoReducer.gameComponent?.round !== oldState.gameInfoReducer.gameComponent?.round) {
				setRound(newState.gameInfoReducer.gameComponent?.round || 0);
			}

			if (newState.gameInfoReducer.gameComponent?.gameOver !== oldState.gameInfoReducer.gameComponent?.gameOver) {
				setIsGameOver(newState.gameInfoReducer.gameComponent?.gameOver || false);
			}
		});

		return () => storeConnection.disconnect();
	});

	if (isGameOver) {
		return (
			<frame {...spreadableProps} BackgroundColor3={new Color3()} BackgroundTransparency={0.3}>
				<uilistlayout />
				<Padding Padding={new UDim(0, 8)} />
				<uicorner CornerRadius={new UDim(0.07, 0)} />
				<uistroke
					Thickness={2}
					Color={new Color3(0.1, 0.1, 0.1)}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				/>
				<frame Size={new UDim2(1, 0, 0.8, 0)} BackgroundTransparency={1}>
					<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />
					<frame
						BackgroundTransparency={1}
						Size={new UDim2(1, 0, 1, 0)}
						SizeConstraint={Enum.SizeConstraint.RelativeYY}
						Change={{
							AbsoluteSize: (rbx) => {
								setImageWidth(rbx.AbsoluteSize.X);
							},
						}}
					>
						<Padding PaddingX={new UDim(0.1, 0)} />
						<imagelabel
							ScaleType={Enum.ScaleType.Fit}
							BackgroundTransparency={1}
							Image="rbxassetid://10674179595"
							Size={new UDim2(1, 0, 1, 0)}
						/>
					</frame>

					<frame Size={new UDim2(1, -imageWidth, 1, 0)} BackgroundTransparency={1}>
						<uilistlayout />
						<textlabel
							BackgroundTransparency={1}
							Text="GAME OVER"
							Font={Enum.Font.GothamBold}
							Size={new UDim2(1, 0, 0.3, 0)}
							TextXAlignment={Enum.TextXAlignment.Left}
							TextScaled
							TextColor3={colorTypeToColors.danger.backgroundColor3}
						>
							<Padding PaddingY={new UDim(0.1, 0)} />
						</textlabel>
						<textlabel
							BackgroundTransparency={1}
							Text={`You survived ${round} round${round === 1 ? "" : "s"}.`}
							Font={Enum.Font.Gotham}
							Size={new UDim2(1, 0, 0.2, 0)}
							TextXAlignment={Enum.TextXAlignment.Left}
							TextScaled
							TextColor3={new Color3(1, 1, 1)}
						>
							<Padding PaddingY={new UDim(0.1, 0)} />
						</textlabel>
					</frame>
				</frame>
				<frame Size={new UDim2(1, 0, 0.2, 0)} BackgroundTransparency={1}>
					<Button
						buttonType="danger"
						Text="Return to Lobby"
						Position={new UDim2(1, 0, 0, 0)}
						AnchorPoint={new Vector2(1, 0)}
						Size={new UDim2(0.5, 0, 1, 0)}
					/>
				</frame>
			</frame>
		);
	} else {
		return <></>;
	}
};

export default new Hooks(Roact)(GameOver);
