import { Players, Workspace } from "@rbxts/services";

const getMouseTarget = (raycastParams: RaycastParams): RaycastResult | undefined => {
	const mouse = Players.LocalPlayer.GetMouse();
	const hit = mouse.Hit;
	const camera = Workspace.CurrentCamera;

	if (!camera || !hit) {
		return undefined;
	}

	const direction = hit.Position.sub(camera.CFrame.Position);

	const raycastResult = Workspace.Raycast(camera.CFrame.Position, direction.mul(100), raycastParams);

	return raycastResult;
};

export default getMouseTarget;
