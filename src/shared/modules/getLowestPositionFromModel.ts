const getLowestPositionFromModel = (model: Model) => {
	const primaryPart = model.PrimaryPart;
	const [cframe, size] = model.GetBoundingBox();
	const lowest = cframe.Position.sub(size.mul(new Vector3(0, 1, 0)).div(2));

	if (!primaryPart) {
		return lowest;
	} else {
		return primaryPart.CFrame.Position.mul(new Vector3(1, 0, 1)).add(lowest.mul(new Vector3(0, 1, 0)));
	}
};

export default getLowestPositionFromModel;
