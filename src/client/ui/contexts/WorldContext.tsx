import { AnyEntity, World } from "@rbxts/matter";
import Roact, { createContext } from "@rbxts/roact";
import Hooks, { CoreHooks } from "@rbxts/roact-hooks";
import { ClientState } from "shared/clientState";

interface WorldContextValue {
	world: World;
	clientState: ClientState;
}

interface Props {
	world: World;
	clientState: ClientState;
}

const WorldProviderWithoutHooks: Hooks.FC<Props> = (props, {}) => {
	const { world, clientState } = props;

	return <WorldContext.Provider value={{ world, clientState }}>{props[Roact.Children]}</WorldContext.Provider>;
};

const WorldProvider = new Hooks(Roact)(WorldProviderWithoutHooks);

export default WorldProvider;

const WorldContext = createContext<WorldContextValue | undefined>(undefined);

export const useWorldContext = ({ useContext }: CoreHooks) => {
	const context = useContext(WorldContext);
	if (!context) {
		error("useContext must be called within a Provider");
	}
	return context;
};
