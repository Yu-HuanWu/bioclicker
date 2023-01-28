import { create } from 'zustand';

const getInitialBiomass = () => 0;
const getInitialOrganisms = () => ({
    1: {
        id: 1,
        bps: 1,
        biomassCost: 10,
        name: "protobiont",
        require: {
            trait: 1,
            species: 0,
        }
    },
    2: {
        id: 2,
        bps: 5,
        biomassCost: 50,
        name: "prokaryote",
        require: {
            trait: 2,
            species: 1,
        }
    },
    3: {
        id: 3,
        bps: 10,
        biomassCost: 100,
        name: "eukaryote",
        require: {
            trait: 2,
            species: 2,
        }
    },
});

const getInitialTraits = () => ({
    1: {
        id: 1,
        multiplier: 1,
        biomassCost: 10,
        name: "RNA"
    },
    2: {
        id: 2,
        multiplier: 5,
        biomassCost: 20,
        name: "DNA"
    },
    3: {
        id: 3,
        multiplier: 10,
        biomassCost: 100,
        name: "u"
    }
});

export const useBioStore = create((set, get) => ({
    biomass: getInitialBiomass(),
    organisms: getInitialOrganisms(),
    traits: getInitialTraits(),
    evolvedSpecies: [],
    evolvedTraits: [],
    actions: {
        newGame() {
            set({
                biomass: getInitialBiomass(),
                organisms: getInitialOrganisms(),
                evolvedSpecies: []
            });
        },
        changeBiomass(amount = 1) {
            set(state => ({ biomass: state.biomass + amount }));
        },
        speciesEvolution(organismId) {
            const { organisms, actions } = get();
            const organism = organisms[organismId];

            actions.changeBiomass(-organism.biomassCost);
            set(state => ({
                evolvedSpecies: [...state.evolvedSpecies, organism]
            }));
        },
        traitEvolution(traitId) {
            const { traits, actions } = get();
            const trait = traits[traitId];

            actions.changeBiomass(-trait.biomassCost);
            set(state => ({
                evolvedTraits: [...state.evolvedTraits, trait]
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
