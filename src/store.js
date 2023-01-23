import { create } from 'zustand';

const getInitialBiomass = () => 0;
const getInitialUpgrades = () => ({
    1: {
        id: 1,
        cps: 1,
        cost: 10,
        name: "auto-clicker"
    },
});

export const useBioStore = create((set, get) => ({
    biomass: getInitialBiomass(),
    upgrades: getInitialUpgrades(),
    purchasedUpgrades: [],
    actions: {
        newGame() {
            set({
                biomass: getInitialBiomass(),
                upgrades: getInitialUpgrades(),
                purchasedUpgrades: []
            });
        },
        changeBiomass(amount = 1) {
            set(state => ({ biomass: state.biomass + amount }));
        },
        purchase(upgradeId) {
            const { upgrades, actions } = get();
            const upgrade = upgrades[upgradeId];

            actions.changeBiomass(-upgrade.cost);
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
