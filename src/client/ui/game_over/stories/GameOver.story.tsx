import Roact from "@rbxts/roact";
import GameOver from "../GameOver";

export = (target: Instance) => {
	const handle = Roact.mount(
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<GameOver
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={new UDim2(0.45, 0, 0.3, 0)}
			/>
		</frame>,
		target,
		"GameOver",
	);

	return () => {
		Roact.unmount(handle);
	};
};
