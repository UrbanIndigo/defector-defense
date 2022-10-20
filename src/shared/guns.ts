import { ReplicatedFirst, ReplicatedStorage } from "@rbxts/services";

export type GunType = "HK-P7" | "AK-47 1st Class" | "PPSH41" | "Barrett .50";

export type GunInfo = {
	model: Model;
	reloadAnimation: `rbxassetid://${string}`;
	idleAnimation: `rbxassetid://${string}`;
	fireSound: `rbxassetid://${string}`;

	baseRange: number;
	ammo: number;
	reloadTime: number;
	damage: number;
	fireInterval: number;
};

const guns: { [gun in GunType]: GunInfo } = {
	"HK-P7": {
		model: ReplicatedStorage.Assets.guns["HK-P7"],
		reloadAnimation: "rbxassetid://10794341160",
		idleAnimation: "rbxassetid://10794344070",
		fireSound: "rbxassetid://165946474",

		baseRange: 30,
		ammo: 8,
		reloadTime: 1,
		damage: 10,
		fireInterval: 0.3,
	},
	"AK-47 1st Class": {
		model: ReplicatedStorage.Assets.guns["AK47 1st Class"],
		reloadAnimation: "rbxassetid://10794662862",
		idleAnimation: "rbxassetid://10794664849",
		fireSound: "rbxassetid://330704369",

		baseRange: 40,
		ammo: 30,
		reloadTime: 1,
		damage: 12,
		fireInterval: 0.1,
	},
	"Barrett .50": {
		model: ReplicatedStorage.Assets.guns["Barrett 50"],
		reloadAnimation: "rbxassetid://10794681985",
		idleAnimation: "rbxassetid://10794684909",
		fireSound: "rbxassetid://9067148538",

		baseRange: 200,
		ammo: 4,
		reloadTime: 7,
		damage: 100,
		fireInterval: 3,
	},
	PPSH41: {
		model: ReplicatedStorage.Assets.guns.PPSH41,
		idleAnimation: "rbxassetid://10743440865",
		reloadAnimation: "rbxassetid://3723056808",
		fireSound: "rbxassetid://263683195",

		baseRange: 40,
		ammo: 30,
		reloadTime: 2,
		damage: 6,
		fireInterval: 0.1,
	},
};

export default guns;
