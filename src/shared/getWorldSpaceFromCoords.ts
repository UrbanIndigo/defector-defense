import gridSize from "./gridSize";

const getWorldSpaceFromCoords = (coords: Vector2): Vector3 => {
	return new Vector3(coords.X * gridSize + gridSize / 2, 0, coords.Y * gridSize + gridSize / 2);
};

export default getWorldSpaceFromCoords;
