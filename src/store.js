import { create } from 'zustand';

const getInitialBiomass = () => 1000;
const getInitialOrganisms = () => ({
    1: {
        id: 1,
        bps: 1,
        biomassCost: 10,
        name: "Protobiont",
        require: {
            trait: 1,
            species: 0,
        },
        text: "",
    },
    2: {
        id: 2,
        bps: 5,
        biomassCost: 50,
        name: "Prokaryote",
        require: {
            trait: 2,
            species: 1,
        },
        text: "",
    },
    3: {
        id: 3,
        bps: 10,
        biomassCost: 200,
        name: "Eukaryote",
        require: {
            trait: 3,
            species: 2,
        },
        text: "",
    },
    // 4: {
    //     id: 3,
    //     bps: 10,
    //     biomassCost: 200,
    //     name: "Eukaryote",
    //     require: {
    //         trait: 3,
    //         species: 2,
    //     },
    //     text: "",
    // },
    // 5: {
    //     id: 3,
    //     bps: 10,
    //     biomassCost: 200,
    //     name: "Eukaryote",
    //     require: {
    //         trait: 3,
    //         species: 2,
    //     },
    //     text: "",
    // },
    // 6: {
    //     id: 3,
    //     bps: 10,
    //     biomassCost: 200,
    //     name: "Eukaryote",
    //     require: {
    //         trait: 3,
    //         species: 2,
    //     },
    //     text: "",
    // },
});

const getInitialTraits = () => ({
    1: {
        id: 1,
        multiplier: 1,
        biomassCost: 15,
        name: "RNA",
        text: "Enable Protobiont",
    },
    2: {
        id: 2,
        multiplier: 1,
        biomassCost: 75,
        name: "DNA",
        text: "Enable Prokaryote",
    },
    3: {
        id: 3,
        multiplier: 1,
        biomassCost: 300,
        name: "Nucleus",
        text: "Enable Eukaryotes",
    },
    4: {
        id: 4,
        multiplier: 1,
        biomassCost: 300,
        name: "Endosymbiosis",
        text: "For every Prokaryote reproduction, there is a 10% chance of also reproducing an Eukaryotes",
    },
    5: {
        id: 5,
        multiplier: 1,
        biomassCost: 300,
        name: "Multicelluarity",
        text: "",
    }
});

function evolvedTraitsAffectOrganism(organismId, evolvedTraits) {
    const allTraitsId = []
    evolvedTraits.forEach(trait => {
        allTraitsId.push(trait.id)
    })

    if (organismId === 2 && allTraitsId.includes(4)) {
        // prokaryote and endosymbiosis
        return 1
    }
    return 0
}

function diceRoll(percentage) {
    return percentage > Math.floor(Math.random() * 100)
}

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
                evolvedSpecies: [],
                evolvedTraits: []
            });
        },
        changeBiomass(amount = 1) {
            set(state => ({ biomass: state.biomass + amount }));
        },
        speciesEvolution(organismId) {
            const { organisms, actions, evolvedTraits } = get();
            const organism = organisms[organismId];

            if (evolvedTraitsAffectOrganism(organismId, evolvedTraits) === 1) {
                // endosymbiosis effect: 
                actions.changeBiomass(-organism.biomassCost);
                if (diceRoll(10)) {
                    set(state => ({
                        evolvedSpecies: [...state.evolvedSpecies, organism, organisms[3]]
                    }));
                } else {
                    set(state => ({
                        evolvedSpecies: [...state.evolvedSpecies, organism]
                    }));
                }
            } else {
                actions.changeBiomass(-organism.biomassCost);
                set(state => ({
                    evolvedSpecies: [...state.evolvedSpecies, organism]
                }));
            }
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
