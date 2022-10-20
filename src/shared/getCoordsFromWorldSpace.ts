import gridSize from "./gridSize";

const getCoordsFromWorldSpace = (position: Vector3): Vector2 => {
	return new Vector2(
		(position.X - (position.X % gridSize)) / gridSize,
		(position.Z - (position.Z % gridSize)) / gridSize,
	);
};

export default getCoordsFromWorldSpace;
