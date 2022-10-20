import remotes from "shared/remotes";
import moneyChanged from "./store/actions/moneyChanged";
import store from "./store/store";

const receiveStore = () => {
	remotes.Client.Get("MoneyChanged").Connect((money) => {
		store.dispatch(moneyChanged(money));
	});
};

export default receiveStore;
