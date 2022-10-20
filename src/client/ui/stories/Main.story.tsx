import Roact from "@rbxts/roact";
import MoneyProvider from "../contexts/MoneyContext";
import PlacementProvider from "../contexts/PlacementContext";
import WorldProvider from "../contexts/WorldContext";
import Main from "../Main";

export = (target: Instance) => {
	const handle = Roact.mount(
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<PlacementProvider>
				<MoneyProvider>
					<Main />
				</MoneyProvider>
			</PlacementProvider>
		</frame>,
		target,
		"Action",
	);

	return () => {
		Roact.unmount(handle);
	};
};
