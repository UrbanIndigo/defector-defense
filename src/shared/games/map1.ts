import walkers, { WalkerType } from "shared/walkers";

type Spawn = {
	type: WalkerType;
	wait: number;
};

type Round = {
	message?: string;
	spawn: Spawn[];
};

const spawnBulk = (walkerType: WalkerType, amount: number, delay: number) => {
	let spawn: Spawn[] = [];
	for (let i = 1; i < amount; i++) {
		spawn.push({
			type: walkerType,
			wait: delay,
		});
	}
	return spawn;
};

const map1: Round[] = [
	// {
	// 	spawn: [
	// 		...spawnBulk(walkers.Normal, 50, 0.3),
	// 		...spawnBulk(walkers.Speedy, 10, 0.2),
	// 		...spawnBulk(walkers.Normal, 3, 0.3),
	// 		...spawnBulk(walkers.Speedy, 10, 0.2),
	// 		{
	// 			type: walkers.Slow,
	// 			wait: 1,
	// 		},
	// 		...spawnBulk(walkers["Boss Defector"], 3, 2),
	// 	],
	// },
	// {
	// 	message: "Watch out, defectors are coming!",
	// 	spawn: [...spawnBulk(walkers.Normal, 3, 0.6)],
	// },
	// {
	// 	message: "A slow defector, maybe he's getting old?",
	// 	spawn: [...spawnBulk(walkers.Normal, 3, 0.3), ...spawnBulk(walkers.Slow, 2, 1)],
	// },
	// {
	// 	spawn: [
	// 		...spawnBulk(walkers.Normal, 6, 0.3),
	// 		...spawnBulk(walkers.Slow, 2, 1),
	// 		...spawnBulk(walkers.Normal, 6, 0.3),
	// 	],
	// },
	// {
	// 	message: "SPEEDY WALKERS ARE COMING!",
	// 	spawn: [...spawnBulk(walkers.Speedy, 20, 0.2)],
	// },
	// {
	// 	spawn: [
	// 		...spawnBulk(walkers.Normal, 3, 0.3),
	// 		...spawnBulk(walkers.Speedy, 10, 0.2),
	// 		...spawnBulk(walkers.Normal, 3, 0.3),
	// 		...spawnBulk(walkers.Speedy, 10, 0.2),
	// 		{
	// 			type: walkers.Slow,
	// 			wait: 1,
	// 		},
	// 	],
	// },
	// {
	// 	message: "A BOSS DEFECTOR?? HOW COULD THIS BE POSSIBLE?!",
	// 	spawn: [
	// 		...spawnBulk(walkers.Speedy, 10, 0.3),
	// 		{ type: walkers.Speedy, wait: 3 },
	// 		{ type: walkers["Boss Defector"], wait: 1 },
	// 	],
	// },
];

export default map1;
