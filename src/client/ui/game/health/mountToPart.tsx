import Roact from "@rbxts/roact";
import { BoundComponent } from "shared/bindComponent";
import { Health, Hovered } from "shared/components";
import WalkerHealth from "./WalkerHealth";

const mountToPart = (
	name: string,
	part: Part,
	hoveredSignal: BoundComponent<Hovered>,
	healthSignal: BoundComponent<Health>,
) => {
	const tree = (
		<billboardgui Key="WalkerHealth" AlwaysOnTop Size={new UDim2(0, 100, 0, 30)} StudsOffset={new Vector3(0, 2, 0)}>
			<WalkerHealth
				name={name}
				onHovered={hoveredSignal.event}
				healthSignal={healthSignal}
				Size={new UDim2(1, 0, 1, 0)}
			/>
		</billboardgui>
	);

	const handle = Roact.mount(tree, part, "Health");
};

export default mountToPart;
