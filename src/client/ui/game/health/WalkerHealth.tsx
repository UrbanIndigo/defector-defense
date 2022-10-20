import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import Padding from "client/ui/common/Padding";
import PercentageBar from "client/ui/common/PercentageBar";
import { BoundComponent } from "shared/bindComponent";
import { Health, Hovered } from "shared/components";

interface WalkerHealthProps extends Roact.JsxInstanceProperties<Frame> {
	name: string;
	onHovered: BoundComponent<Hovered>["event"];
	healthSignal: BoundComponent<Health>;

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const WalkerHealth: Hooks.FC<WalkerHealthProps> = (props, hooks) => {
	const { useState, useEffect } = hooks;
	const { onHovered, healthSignal, name } = props;

	const spreadableProps = { ...props } as Partial<WalkerHealthProps>;
	delete spreadableProps.onHovered;
	delete spreadableProps.healthSignal;
	delete spreadableProps.name;

	const [health, setHealth] = useState<number>(healthSignal.current.health);
	const [maxHealth, setMaxHealth] = useState<number>(healthSignal.current.maxHealth);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const hoveredConnection = onHovered.Connect((hovered) => {
			if (hovered && hovered.hovered) {
				setIsVisible(hovered.hovered);
			} else {
				setIsVisible(false);
			}
		});

		const healthConnection = healthSignal.event.Connect((health) => {
			if (health) {
				setHealth(health.health);
				setMaxHealth(health.maxHealth);
			}
		});

		return () => {
			hoveredConnection.Disconnect();
			healthConnection.Disconnect();
		};
	}, [onHovered, healthSignal]);

	if (isVisible) {
		return (
			<frame {...spreadableProps} BackgroundTransparency={1}>
				<textlabel
					Size={new UDim2(0, 0, 0.5, 0)}
					AutomaticSize={Enum.AutomaticSize.X}
					Text={name}
					TextScaled
					TextColor3={new Color3(1, 1, 1)}
					BackgroundColor3={new Color3()}
					BackgroundTransparency={1}
					TextXAlignment={Enum.TextXAlignment.Left}
				>
					<uistroke />

					<Padding Padding={new UDim(0, 2)} />
				</textlabel>
				<frame
					Size={new UDim2(1, 0, 0.5, 0)}
					Position={new UDim2(0, 0, 0.4, 0)}
					BackgroundColor3={new Color3()}
					BackgroundTransparency={0.3}
				>
					<PercentageBar
						Key={"Health"}
						current={health}
						max={maxHealth}
						color={new Color3(0, 1, 0)}
						Size={new UDim2(1, 0, 1, 0)}
					/>
				</frame>
			</frame>
		);
	} else {
		return <></>;
	}
};

export default new Hooks(Roact)(WalkerHealth);
