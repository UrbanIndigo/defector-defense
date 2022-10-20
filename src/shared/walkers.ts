import { ReplicatedStorage } from "@rbxts/services";

type Tag = "Speedy" | "Boss" | "Slow" | "Hidden";

type Walkers = "Normal" | "Slow" | "Speedy" | "Hidden" | "Boss Defector";

export type WalkerType = {
	name: string;
	health: number;
	speed: number;
	model: Model;
	tags: Tag[];
	difficulty: number;
	weight: number;
	fromRound: number;
};

const walkers: WalkerType[] = [
	{
		name: "Normal",
		health: 90,
		speed: 10,
		model: ReplicatedStorage.Assets.walkers.Normal,
		tags: [],
		difficulty: 1,
		weight: 20,
		fromRound: 0,
	},
	{
		name: "Slow",
		health: 200,
		speed: 4,
		model: ReplicatedStorage.Assets.walkers.Slow,
		tags: [],
		difficulty: 2,
		weight: 10,
		fromRound: 3,
	},
	{
		name: "Speedy",
		health: 45,
		speed: 24,
		model: ReplicatedStorage.Assets.walkers.Speedy,
		tags: [],
		difficulty: 3,
		weight: 30,
		fromRound: 5,
	},
	// {
	// 	name: "Hidden",
	// 	health: 45,
	// 	speed: 10,
	// 	model: ReplicatedStorage.FindFirstChild("Assets")?.FindFirstChild("Walkers")?.FindFirstChild("Hidden") as Model,
	// 	tags: ["Hidden"],
	// 	difficulty: 5,
	// 	fromRound: 7,
	// },
	{
		name: "Boss Defector",
		health: 500,
		speed: 4,
		model: ReplicatedStorage.Assets.walkers.Boss,
		weight: 3,
		difficulty: 10,
		fromRound: 8,
		tags: [],
	},
];

export default walkers;
