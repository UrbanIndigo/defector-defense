import { QueryResult } from "@rbxts/matter/lib/World";
import { Workspace } from "@rbxts/services";
import { Transform, Unit } from "./components";

export const isTooClose = (position: Vector3, unit: Unit, cframe: CFrame) => {
	return cframe.Position.sub(position).Magnitude < unit.unit.sizeDiameter / 2;
};

export const canBePlaced = (position: Vector3, units: QueryResult<[Unit, Transform]>) => {
	if (distanceFromPath(position) < 5) {
		return false;
	}

	for (const [id, unit, transform] of units) {
		if (isTooClose(position, unit, transform.cframe)) {
			return false;
		}
	}

	return true;
};

export const distanceToLineSegment = (v: Vector3, a: Vector3, b: Vector3) => {
	const ab = b.sub(a);
	const av = v.sub(a);

	if (av.Dot(ab) <= 0) {
		return av.Magnitude;
	}

	const bv = v.sub(b);

	if (bv.Dot(ab) >= 0) {
		return bv.Magnitude;
	}

	return ab.Cross(av).Magnitude / ab.Magnitude;
};

export const distanceFromPath = (point: Vector3) => {
	const path = Workspace.FindFirstChild("Map")?.FindFirstChild("Path")!;

	let lowestDistance: number | undefined = undefined;

	path?.GetChildren().forEach((child) => {
		const path = child.FindFirstChildOfClass("RodConstraint");

		if (!path) {
			return;
		}

		const a = (path?.Attachment0?.Parent as Part).Position;
		const b = (path?.Attachment1?.Parent as Part).Position;

		const distance = distanceToLineSegment(point, a, b);

		if (!lowestDistance || distance < lowestDistance) {
			lowestDistance = distance;
		}
	});

	return lowestDistance!;
};
