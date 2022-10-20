const calculateRoundDifficulty = (round: number) => {
	return math.pow(round, 2) + 5;
};

export default calculateRoundDifficulty;
