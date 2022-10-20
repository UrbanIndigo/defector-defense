export enum FocusPriority {
	First,
	Last,
	MostHP,
	LeastHP,
	Closest,
}

type FocusPriorityInfo = {
	focusPriority: FocusPriority;
	text: string;
};

export const focusPriorities: FocusPriorityInfo[] = [
	{
		focusPriority: FocusPriority.First,
		text: "First",
	},
	{
		focusPriority: FocusPriority.Last,
		text: "Last",
	},
	{
		focusPriority: FocusPriority.Closest,
		text: "Closest",
	},
	{
		focusPriority: FocusPriority.MostHP,
		text: "Most HP",
	},
	{
		focusPriority: FocusPriority.LeastHP,
		text: "Least HP",
	},
];

export const getFocusPriorityInfo = (focusPriority: FocusPriority): FocusPriorityInfo => {
	return focusPriorities.find((focusPriorityInfo) => focusPriorityInfo.focusPriority === focusPriority)!;
};

export const getNextFocusPriority = (focusPriority: FocusPriority) => {
	const index =
		(focusPriorities.findIndex((focusPriorityInfo) => focusPriorityInfo.focusPriority === focusPriority)! + 1) %
		focusPriorities.size();
	return focusPriorities[index].focusPriority;
};
