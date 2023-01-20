import create from "zustand";

export const [useBioStore, store] = create((set, get) => ({
    score: getInitialScore(),
    upgrades: getInitialUpgrades(),
    purchasedUpgrades: [],
    actions: {
        newGame() {
            set({
                score: getInitialScore(),
                upgrades: getInitialUpgrades(),
                purchasedUpgrades: []
            });
        },
        changeScore(amount = 1) {
            set(state => ({ score: state.score + amount }));
        },
        purchase(upgradeId) {
            const { upgrades, actions } = get();
            const upgrade = upgrades[upgradeId];

            actions.changeScore(-upgrade.cost);
            set(state => ({
                purchasedUpgrades: [...state.purchasedUpgrades, upgrade]
            }));
            // setInterval(() => {
            //   actions.changeScore(1);
            // }, 1000 / upgrade.cps);
        }
    }
}));

store.setState(JSON.parse(window.localStorage.getItem("state")));

store.subscribe(state => {
    const stateCopy = { ...state };
    delete stateCopy["actions"];
    window.localStorage.setItem("state", JSON.stringify(stateCopy));
});
