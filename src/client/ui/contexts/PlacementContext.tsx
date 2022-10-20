import Roact, { createContext } from "@rbxts/roact";
import Hooks, { CoreHooks } from "@rbxts/roact-hooks";
import store from "client/store/store";
import { UnitDescriptor } from "shared/units";

interface PlacementContextValue {
	placingUnit: Readonly<UnitDescriptor | undefined>;
	setPlacingUnit: Hooks.Dispatch<Hooks.BasicStateAction<UnitDescriptor | undefined>>;
}

const PlacementProviderWithoutHooks: Hooks.FC = (props, { useState, useEffect }) => {
	const [placingUnit, setPlacingUnit] = useState<UnitDescriptor | undefined>(undefined);

	useEffect(() => {
		store.changed.connect((newState, oldState) => {
			if (newState.placementReducer !== oldState.placementReducer) {
				setPlacingUnit(newState.placementReducer.placingUnit);
			}
		});
	}, [store]);

	return (
		<PlacementContext.Provider value={{ placingUnit, setPlacingUnit }}>
			{props[Roact.Children]}
		</PlacementContext.Provider>
	);
};

const PlacementProvider = new Hooks(Roact)(PlacementProviderWithoutHooks);

export default PlacementProvider;

const PlacementContext = createContext<PlacementContextValue | undefined>(undefined);

export const usePlacementContext = ({ useContext }: CoreHooks) => {
	const context = useContext(PlacementContext);
	if (!context) {
		error("useContext must be called within a Provider");
	}
	return context;
};
