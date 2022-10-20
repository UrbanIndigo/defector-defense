import Hooks from "@rbxts/roact-hooks";
import Roact from "@rbxts/roact";

interface ViewportProps extends Roact.JsxInstanceProperties<Frame> {
	model: Model;
	offset: Vector3;

	Event?: Roact.JsxInstanceEvents<Frame>;
	Change?: Roact.JsxInstanceChangeEvents<Frame>;
}

const Viewport: Hooks.FC<ViewportProps> = (props, hooks) => {
	const { useEffect } = hooks;
	const { model, offset } = props;

	const spreadableProps = { ...props } as Partial<ViewportProps>;
	delete spreadableProps.model;
	delete spreadableProps.offset;

	const viewportRef = Roact.createRef<ViewportFrame>();

	useEffect(() => {
		const viewportFrame = viewportRef.getValue();

		if (!viewportFrame) {
			return;
		}

		viewportFrame.ClearAllChildren();

		const worldModel = new Instance("WorldModel", viewportFrame);

		const viewportModel = model.Clone();
		viewportModel.Parent = worldModel;

		viewportModel.PivotTo(new CFrame(0, 0, 0));

		const camera = new Instance("Camera", worldModel);
		camera.CFrame = new CFrame(offset, viewportModel.PrimaryPart!.Position);

		viewportFrame.CurrentCamera = camera;
	}, [viewportRef, model]);

	return (
		<frame {...spreadableProps}>
			<viewportframe Ref={viewportRef} Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} />
		</frame>
	);
};

export default new Hooks(Roact)(Viewport);
