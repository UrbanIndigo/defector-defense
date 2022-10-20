import Make from "@rbxts/make";
import { SoundService } from "@rbxts/services";

type Sounds = "Tick" | "Spawn";

const sounds = {
	Tick: Make("Sound", { SoundId: "rbxassetid://876939830", Volume: 0.3, TimePosition: 0.035 }),
	Spawn: Make("Sound", { SoundId: "rbxassetid://8022960947", Volume: 0.3, TimePosition: 0.07 }),
};

const playSound = (sound: keyof typeof sounds) => {
	SoundService.PlayLocalSound(sounds[sound]);
};

export default playSound;
