import Make from "@rbxts/make";
import moneyReducer from "client/store/reducers/moneyReducer";
import { ComponentModel } from "shared/components";

const ragdoll = (character: Model) => {
	const humanoid = character.FindFirstChildOfClass("Humanoid");
	if (!humanoid) {
		error("No humanoid");
	}

	humanoid.BreakJointsOnDeath = false;
	humanoid.Died.Connect(() => {
		character.GetDescendants().forEach((desc) => {
			if (desc.IsA("BasePart")) {
				desc.CanCollide = desc.Name !== "HumanoidRootPart";
			} else if (desc.IsA("Motor6D")) {
				const attachment0 = Make("Attachment", { CFrame: desc.C0, Parent: desc.Part0 });
				const attachment1 = Make("Attachment", { CFrame: desc.C1, Parent: desc.Part1 });
				Make("BallSocketConstraint", {
					Attachment0: attachment0,
					Attachment1: attachment1,
					LimitsEnabled: true, //desc.Name === "Head",
					TwistLimitsEnabled: true, //desc.Name === "Head",
					Parent: desc.Part0,
				});
				desc.Enabled = false;
			}
		});
	});

	// Char:WaitForChild("Humanoid").BreakJointsOnDeath = false
	// 		Char.Humanoid.Died:Connect(function()

	// 				if v:IsA("Motor6D") then
	// 					local Att0, Att1 = Instance.new("Attachment"), Instance.new("Attachment")
	// 					Att0.CFrame = v.C0
	// 					Att1.CFrame = v.C1
	// 					Att0.Parent = v.Part0
	// 					Att1.Parent = v.Part1
	// 					local BSC = Instance.new("BallSocketConstraint")
	// 					BSC.Attachment0 = Att0
	// 					BSC.Attachment1 = Att1
	// 					BSC.Parent = v.Part0
	// 					if v.Part1.Name ==  "Head" then
	// 						BSC.LimitsEnabled = true
	// 						BSC.TwistLimitsEnabled = true
	// 					end
	// 					v.Enabled = false
	// 				end
	// 				if v.Name == "AccessoryWeld" then
	// 					local WC = Instance.new("WeldConstraint")
	// 					WC.Part0 = v.Part0
	// 					WC.Part1 = v.Part1
	// 					WC.Parent = v.Parent
	// 					v.Enabled = false
	// 				end
	// 				if v.Name == "Head" then
	// 					v.CanCollide = true
	// 				end
	// 			end
	// 		end)
};

export default ragdoll;
