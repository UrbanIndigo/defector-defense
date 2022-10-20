import Roact, { createContext } from "@rbxts/roact";
import Hooks, { CoreHooks } from "@rbxts/roact-hooks";
import RoactRodux from "@rbxts/roact-rodux";
import store from "client/store/store";

interface MoneyContextValue {
	money: number;
}

const MoneyProviderWithoutHooks: Hooks.FC = (props, { useState, useEffect }) => {
	const [money, setMoney] = useState<number>(store.getState().moneyReducer.money);

	useEffect(() => {
		store.changed.connect((newState, oldState) => {
			if (newState.moneyReducer !== oldState.moneyReducer) {
				setMoney(newState.moneyReducer.money);
			}
		});
	}, []);

	return <MoneyContext.Provider value={{ money }}>{props[Roact.Children]}</MoneyContext.Provider>;
};

const MoneyProvider = new Hooks(Roact)(MoneyProviderWithoutHooks);

export default MoneyProvider;

const MoneyContext = createContext<MoneyContextValue | undefined>(undefined);

export const useMoneyContext = ({ useContext }: CoreHooks) => {
	const context = useContext(MoneyContext);
	if (!context) {
		error("useContext must be called within a Provider");
	}
	return context;
};
