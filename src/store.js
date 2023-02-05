import { create } from 'zustand';

const getInitialCounter = () => 0;
const getInitialBiomass = () => 1000;
const getInitialEnergy = () => 0;
const getInitialOrganisms = () => ({
    1: {
        id: 1,
        bps: 1,
        eps: 0,
        biomassCost: 10,
        name: "Protobiont",
        require: {
            trait: 2,
            species: 0,
        },
        text: "",
    },
    2: {
        id: 2,
        bps: 5,
        eps: 0,
        biomassCost: 50,
        name: "Prokaryote",
        require: {
            trait: 3, // DNA
            species: 1,
        },
        text: "",
    },
    3: {
        id: 3,
        bps: 5,
        eps: 0,
        biomassCost: 50,
        name: "photosynthesis",
        require: {
            trait: 4, // Photosynthesis
            species: 2, //prokaryote
        },
        text: "",
    },
    4: {
        id: 4,
        bps: 10,
        eps: 0,
        biomassCost: 200,
        name: "Eukaryote",
        require: {
            trait: 5, //nucleus
            species: 2,
        },
        text: "",
    },
    5: {
        id: 5,
        bps: 40,
        eps: 0,
        biomassCost: 1000,
        name: "Sponge",
        require: {
            trait: 5,
            species: 4,
        },
        text: "",
    },
    // 5: {
    //     id: 3,
    //     bps: 10,
    //     eps: 0,
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
    //     eps: 0,
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
        biomassCost: 10,
        name: "Carbohydrate",
        text: "Unlock Energy",
        require: {
            trait: 0,
            species: 0,
        },
    },
    2: {
        id: 2,
        multiplier: 1,
        biomassCost: 15,
        name: "RNA",
        text: "Unlock Protobiont",
        require: {
            trait: 0,
            species: 0,
        },
    },
    3: {
        id: 3,
        multiplier: 1,
        biomassCost: 75,
        name: "DNA",
        text: "Unlock Prokaryote",
        require: {
            trait: 2, // RNA
            species: 0,
        },
    },
    4: {
        id: 4,
        multiplier: 1,
        biomassCost: 300,
        name: "Photosynthesis",
        text: "Unlock ",
        require: {
            trait: 2, // RNA
            species: 0,
        },
    },
    5: {
        id: 5,
        multiplier: 1,
        biomassCost: 300,
        name: "Nucleus",
        text: "Unlock Eukaryotes",
        require: {
            trait: 3, // DNA
            species: 2, // prokaryote
        },
    },
    6: {
        id: 6,
        multiplier: 1,
        biomassCost: 400,
        name: "Endosymbiosis",
        text: "For every Prokaryote reproduction, there is a 10% chance of also reproducing an Eukaryotes",
        require: {
            trait: 3, // DNA
            species: 2, // prokaryote
        },
    },
    7: {
        id: 7,
        multiplier: 1,
        biomassCost: 1500,
        name: "Multicelluarity",
        text: "Unlock Sponge",
        require: {
            trait: 5, // nucleus
            species: 4, // eukaryote
        },
    },
    8: {
        id: 8,
        multiplier: 1,
        biomassCost: 2000,
        name: "Differentiation",
        text: "",
        require: {
            trait: 7, // multicellularity
            species: 5,
        },
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
    counter: getInitialCounter(),
    biomass: getInitialBiomass(),
    energy: getInitialEnergy(),
    organisms: getInitialOrganisms(),
    traits: getInitialTraits(),
    evolvedSpecies: [],
    evolvedTraits: [],
    actions: {
        increaseCounter() {
            const { counter } = get();
            // console.log(counter)
            if (counter >= 120) {
                set({ counter: 0 })
            } else {
                set(state => ({counter: state.counter + 1}))
            }
        },
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
        changeEnergy(amount = 1) {
            set(state => ({ energy: state.energy + amount }));
        },
        speciesEvolution(organismId) {
            const { organisms, actions, evolvedTraits } = get();
            const organism = organisms[organismId];
            const evolvedTraitsAffectingOrganism = evolvedTraitsAffectOrganism(organismId, evolvedTraits)

            switch (evolvedTraitsAffectingOrganism) {
                case 1:
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
                    break;
                // case 2:
                //     // code block
                //     break;
                default:
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
