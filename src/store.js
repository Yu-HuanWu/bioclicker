import { create } from 'zustand';

const getInitialBiomass = () => 0;
const getInitialOrganisms = () => ({
    1: {
        id: 1,
        cps: 1,
        cost: 10,
        name: "prokaryote"
    },
    2: {
        id: 2,
        cps: 5,
        cost: 50,
        name: "eukaryote"
    },
});

export const useBioStore = create((set, get) => ({
    biomass: getInitialBiomass(),
    organisms: getInitialOrganisms(),
    purchasedUpgrades: [],
    actions: {
        newGame() {
            set({
                biomass: getInitialBiomass(),
                organisms: getInitialOrganisms(),
                purchasedUpgrades: []
            });
        },
        changeBiomass(amount = 1) {
            set(state => ({ biomass: state.biomass + amount }));
        },
        purchase(upgradeId) {
            const { organisms, actions } = get();
            const organism = organisms[upgradeId];

            actions.changeBiomass(-organism.cost);
            set(state => ({
                purchasedUpgrades: [...state.purchasedUpgrades, organism]
            }));
        }
    }
}));

// useBioStore.setState(JSON.parse(window.localStorage.getItem("state")));

// useBioStore.subscribe(state => {
//     const stateCopy = { ...state };
//     delete stateCopy["actions"];
//     window.localStorage.setItem("state", JSON.stringify(stateCopy));
// });
