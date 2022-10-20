import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";
import { useSelectUnitContext } from "./context/SelectUnitContext";
import Viewport from "../common/Viewport";
import BackgroundImage from "../common/BackgroundImage";
import { useMoneyContext } from "../contexts/MoneyContext";
import Padding from "../common/Padding";
import Badge from "../common/Badge";

interface PreviewProps extends Roact.JsxInstanceProperties<Frame> {
	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Preview: Hooks.FC<PreviewProps> = (props, hooks) => {
	const {} = hooks;
	const {} = props;

	const spreadableProps = { ...props } as Partial<PreviewProps>;

	const { selectedUnitSlot } = useSelectUnitContext(hooks);

	const { money } = useMoneyContext(hooks);
	const canPurchase = selectedUnitSlot && money >= selectedUnitSlot.price;

	return (
		<frame {...spreadableProps}>
			{/* <BackgroundImage Size={new UDim2(1, 0, 1, 0)} brightness={7} />
			{selectedUnitSlot && (
				<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
					<uilistlayout />
					<frame Size={new UDim2(1, 0, 1, -60)} BackgroundTransparency={1}>
						<uilistlayout />
						<frame Size={new UDim2(1, 0, 0.5, 0)} BackgroundTransparency={1}>
							<Viewport
								BackgroundTransparency={1}
								model={selectedUnitSlot.unitLevels[0].model}
								Size={new UDim2(1, 0, 1, 0)}
								offset={new Vector3(0.5, 1, -5)}
							/>
						</frame>
						<frame
							Size={new UDim2(1, 0, 0, 0)}
							AutomaticSize={Enum.AutomaticSize.Y}
							BackgroundTransparency={1}
						>
							<frame
								AutomaticSize={Enum.AutomaticSize.XY}
								Position={new UDim2(0.5, 0, 0, 0)}
								AnchorPoint={new Vector2(0.5, 0)}
								BackgroundTransparency={1}
							>
								<uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 8)} />
								<textlabel
									BackgroundTransparency={1}
									Text={selectedUnitSlot?.name}
									Size={new UDim2(0, 0, 0, 0)}
									AutomaticSize={Enum.AutomaticSize.XY}
									Font={Enum.Font.GothamBlack}
									TextSize={24}
								/>
								<frame
									Size={new UDim2(0, 0, 1, 0)}
									AutomaticSize={Enum.AutomaticSize.X}
									BackgroundTransparency={1}
								>
									<Badge
										Text={selectedUnitSlot.unitLevels[0].unitType.upper()}
										AnchorPoint={new Vector2(0, 0.5)}
										Position={new UDim2(0, 0, 0.5, 0)}
									/>
								</frame>
							</frame>
						</frame>
						<textlabel
							BackgroundTransparency={1}
							Text={selectedUnitSlot?.description}
							Size={new UDim2(1, 0, 0, 0)}
							AutomaticSize={Enum.AutomaticSize.Y}
							Font={Enum.Font.Gotham}
							TextSize={18}
							TextWrap
						/>
					</frame>

					<frame Size={new UDim2(1, 0, 0, 60)} BackgroundTransparency={1}>
						<textbutton
							AutomaticSize={Enum.AutomaticSize.XY}
							Position={new UDim2(0.5, 0, 0.5, 0)}
							AnchorPoint={new Vector2(0.5, 0.5)}
							TextSize={15}
							Text={`PLACE (-₩ ${selectedUnitSlot.price})`}
							Font={Enum.Font.Gotham}
							AutoButtonColor={canPurchase}
							Event={{
								Activated: () => {
									if (canPurchase) {
									}
								},
							}}
						>
							<Padding PaddingX={new UDim(0, 16)} PaddingY={new UDim(0, 8)} />
						</textbutton>
					</frame>
				</frame>
			)} */}
		</frame>
	);
};

export default new Hooks(Roact)(Preview);
