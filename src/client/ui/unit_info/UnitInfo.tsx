import { AnyEntity } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { Players, RunService, Workspace } from "@rbxts/services";
import store from "client/store/store";
import { ComponentModel, Gun, Unit } from "shared/components";
import { getFocusPriorityInfo, getNextFocusPriority } from "shared/enums/focusPriority";
import calculateSellValue from "shared/modules/calculateSellValue";
import moneySymbol from "shared/moneySymbol";
import remotes from "shared/remotes";
import Button from "../common/Button";
import Padding from "../common/Padding";
import { useWorldContext } from "../contexts/WorldContext";

interface UnitInfoProps extends Roact.JsxInstanceProperties<Frame> {
	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const UnitInfo: Hooks.FC<UnitInfoProps> = (props, hooks) => {
	const { useEffect, useState } = hooks;
	const {} = props;

	const [selectedEntityId, setSelectedEntityId] = useState<AnyEntity | undefined>(undefined);
	const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>(undefined);
	const [attachPart, setAttachPart] = useState<BasePart | undefined>(undefined);

	const [position, setPosition] = useState<UDim2 | undefined>(undefined);
	const [size, setSize] = useState<Vector2 | undefined>(undefined);

	const [containerSize, setContainerSize] = useState<Vector2 | undefined>(undefined);
	const [imageSize, setImageSize] = useState<number>(0);

	const [loadingFocusPriority, setLoadingFocusPriority] = useState<boolean>(false);

	const { world, clientState } = useWorldContext(hooks);
	useEffect(() => {
		const connection = store.changed.connect((newState, oldState) => {
			if (newState.selectedUnit !== oldState.selectedUnit) {
				if (newState.selectedUnit.selectedUnit) {
					const [unit, gun, model] = world.get(newState.selectedUnit.selectedUnit, Unit, Gun, ComponentModel);

					setSelectedUnit(unit);
					setSelectedEntityId(newState.selectedUnit.selectedUnit);
					setAttachPart(model?.model.FindFirstChild("Head") as BasePart);
				} else {
					setSelectedUnit(undefined);
					setSelectedEntityId(undefined);
					setAttachPart(undefined);
				}
			}
		});

		const heartbeat = RunService.Heartbeat.Connect((dt) => {
			if (!attachPart) {
				return;
			}

			const [screenPosition, onScreen] = Workspace.CurrentCamera!.WorldToScreenPoint(attachPart.Position);

			if (onScreen && containerSize && size) {
				setPosition(
					new UDim2(
						0,
						math.clamp(screenPosition.X, size.X / 2, containerSize.X - size.X / 2),
						0,
						math.clamp(screenPosition.Y, size.Y, containerSize.Y),
					),
				);
			} else {
				setPosition(new UDim2(0.5, 0, 1, 0));
			}
		});

		return () => {
			heartbeat.Disconnect();
			connection.disconnect();
		};
	}, [store, attachPart, containerSize, size]);

	const spreadableProps = { ...props } as Partial<UnitInfoProps>;

	if (selectedUnit) {
		return (
			<frame
				Key="Container"
				{...spreadableProps}
				Change={{
					AbsoluteSize: (rbx) => setContainerSize(rbx.AbsoluteSize),
				}}
				BackgroundTransparency={1}
			>
				<frame
					Size={new UDim2(0.15, 0, 0.2, 0)}
					Change={{
						AbsoluteSize: (rbx) => setSize(rbx.AbsoluteSize),
					}}
					Position={position}
					AnchorPoint={new Vector2(0.5, 1)}
					BackgroundColor3={new Color3()}
					BackgroundTransparency={0.3}
				>
					<Padding Padding={new UDim(0, 4)} />
					<uicorner CornerRadius={new UDim(0, 4)} />
					<uistroke
						Thickness={2}
						Color={new Color3(0.1, 0.1, 0.1)}
						ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
					/>
					<frame Size={new UDim2(1, 0, 0, 0)} AutomaticSize={Enum.AutomaticSize.Y} BackgroundTransparency={1}>
						<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />

						<imagelabel
							Image="rbxassetid://10778188410"
							ScaleType={Enum.ScaleType.Crop}
							Size={new UDim2(0.5, 0, 1, 0)}
							SizeConstraint={Enum.SizeConstraint.RelativeYY}
							BorderSizePixel={0}
							Change={{
								AbsoluteSize: (rbx) => {
									setImageSize(rbx.AbsoluteSize.X);
								},
							}}
						>
							<uicorner CornerRadius={new UDim(0, 4)} />
						</imagelabel>

						<frame Key="Rest" Size={new UDim2(1, -imageSize, 1, 0)} BackgroundTransparency={1}>
							<Padding PaddingX={new UDim(0, 4)} />
							<uilistlayout />
							<textlabel
								Size={new UDim2(1, 0, 0.4, 0)}
								Text={selectedUnit.unit.name}
								Font={Enum.Font.Gotham}
								TextScaled
								TextXAlignment={Enum.TextXAlignment.Left}
								TextColor3={new Color3(1, 1, 1)}
								BackgroundTransparency={1}
							>
								<Padding PaddingY={new UDim(0.3, 0)} />
							</textlabel>
							<Button
								disabled={selectedUnit!.creator !== Players.LocalPlayer || loadingFocusPriority}
								buttonType="info"
								Event={{
									Activated: () => {
										if (!selectedEntityId) {
											return;
										}

										const serverEntityId =
											clientState.clientEntityToServerEntity.get(selectedEntityId);

										if (serverEntityId) {
											setLoadingFocusPriority(true);
											remotes.Client.Get("ChangeFocusPriority")
												.CallServerAsync(
													serverEntityId,
													getNextFocusPriority(selectedUnit.focusPriority),
												)
												.then(() => setLoadingFocusPriority(false));
										}
									},
								}}
								Size={new UDim2(1, 0, 0.3, 0)}
								Text={`🎯 ${getFocusPriorityInfo(selectedUnit.focusPriority).text.upper()}`}
							></Button>

							<Button
								disabled={selectedUnit!.creator !== Players.LocalPlayer}
								buttonType="danger"
								Event={{
									Activated: () => {
										if (!selectedEntityId) {
											return;
										}

										const serverEntityId =
											clientState.clientEntityToServerEntity.get(selectedEntityId);

										if (serverEntityId) {
											remotes.Client.Get("SellUnit").SendToServer(serverEntityId);
										}
									},
								}}
								Size={new UDim2(1, 0, 0.3, 0)}
								Text={`SELL ${moneySymbol}${calculateSellValue(selectedUnit.unit.price)}`}
							/>
						</frame>
					</frame>
				</frame>
			</frame>
		);
	} else {
		return <></>;
	}
};

export default new Hooks(Roact)(UnitInfo);
