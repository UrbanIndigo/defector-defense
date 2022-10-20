import { Debugger, Loop, System, World } from "@rbxts/matter";
import Plasma from "@rbxts/plasma";
import { RunService, UserInputService } from "@rbxts/services";

const start = <S extends object>(containers: Array<Instance>, state: S) => {
	const world = new World();

	const matterDebugger = new Debugger(Plasma);

	const loop = new Loop(world, state);

	matterDebugger.authorize = (player) => {
		return player.UserId === 3602398034;
	};

	const systems: System<[World]>[] = [];

	for (const container of containers) {
		if (container.IsA("ModuleScript")) {
			systems.push(require(container) as System<[World]>);
		}
	}

	loop.scheduleSystems(systems);

	matterDebugger.autoInitialize(loop);

	loop.begin({
		default: RunService.Heartbeat,
	});

	if (RunService.IsClient()) {
		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.F4) {
				matterDebugger.toggle();
			}
		});
	}

	return world;
};

export default start;
