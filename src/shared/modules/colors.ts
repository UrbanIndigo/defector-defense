export type ColorTypes = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export const colorTypeToColors: {
	[C in ColorTypes]: {
		backgroundColor3: Color3;
		textColor3: Color3;
	};
} = {
	primary: {
		backgroundColor3: Color3.fromRGB(112, 171, 255),
		textColor3: Color3.fromRGB(0, 107, 255),
	},
	secondary: {
		backgroundColor3: Color3.fromRGB(163, 163, 163),
		textColor3: Color3.fromRGB(125, 125, 125),
	},
	success: {
		backgroundColor3: Color3.fromRGB(145, 255, 168),
		textColor3: Color3.fromRGB(61, 133, 74),
	},
	danger: {
		backgroundColor3: Color3.fromRGB(255, 107, 107),
		textColor3: Color3.fromRGB(145, 28, 28),
	},
	warning: {
		backgroundColor3: Color3.fromRGB(227, 222, 163),
		textColor3: Color3.fromRGB(166, 158, 61),
	},
	info: {
		backgroundColor3: Color3.fromRGB(56, 191, 255),
		textColor3: Color3.fromRGB(20, 130, 181),
	},
	light: {
		backgroundColor3: Color3.fromRGB(219, 219, 219),
		textColor3: Color3.fromRGB(166, 166, 166),
	},
	dark: {
		backgroundColor3: Color3.fromRGB(128, 128, 128),
		textColor3: Color3.fromRGB(43, 43, 43),
	},
};
