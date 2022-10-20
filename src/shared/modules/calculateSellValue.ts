const calculateSellValue = (originalPrice: number) => {
	return math.floor(originalPrice * 0.7);
};

export default calculateSellValue;
