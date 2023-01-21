import { create } from 'zustand';

const getInitialScore = () => 5;
const getInitialUpgrades = () => ({
    1: {
        id: 1,
        cps: 1,
        cost: 10,
        name: "auto-clicker"
    },
});

export const useBioStore = create((set, get) => ({
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
        }
    }
}));

useBioStore.setState(JSON.parse(window.localStorage.getItem("state")));

useBioStore.subscribe(state => {
    const stateCopy = { ...state };
    delete stateCopy["actions"];
    window.localStorage.setItem("state", JSON.stringify(stateCopy));
});
