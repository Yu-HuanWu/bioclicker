import { create } from 'zustand';

const getInitialCounter = () => 0;
const getInitialBiomass = () => 1000;
const getInitialEnergy = () => 0;
const getInitialOrganisms = () => ({
    "Protobiont": {
        bps: 1,
        eps: 0,
        biomassCost: 10,
        name: "Protobiont",
        require: {
            trait: "RNA",
            species: 0,
        },
        text: "",
    },
    "Prokaryote": {
        bps: 5,
        eps: 0,
        biomassCost: 50,
        name: "Prokaryote",
        require: {
            trait: "DNA", // DNA
            species: "Protobiont",
        },
        text: "",
    },
    "Algae": {
        bps: 5,
        eps: 0,
        biomassCost: 50,
        name: "Algae",
        require: {
            trait: "Photosynthesis", // Photosynthesis
            species: "Prokaryote", //prokaryote
        },
        text: "",
    },
    "Eukaryote": {
        bps: 10,
        eps: 0,
        biomassCost: 200,
        name: "Eukaryote",
        require: {
            trait: "Nucleus", //nucleus
            species: "Prokaryote",
        },
        text: "",
    },
    "Sponge": {
        bps: 40,
        eps: 0,
        biomassCost: 1000,
        name: "Sponge",
        require: {
            trait: "Multicelluarity",
            species: "Eukaryote",
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
    "Carbohydrate": {
        multiplier: 1,
        biomassCost: 10,
        name: "Carbohydrate",
        text: "Unlock Energy",
        require: {
            trait: 0,
            species: 0,
        },
    },
    "RNA": {
        multiplier: 1,
        biomassCost: 15,
        name: "RNA",
        text: "Unlock Protobiont",
        require: {
            trait: 0,
            species: 0,
        },
    },
    "DNA": {
        multiplier: 1,
        biomassCost: 75,
        name: "DNA",
        text: "Unlock Prokaryote",
        require: {
            trait: "RNA", // RNA
            species: 0,
        },
    },
    "Photosynthesis": {
        multiplier: 1,
        biomassCost: 300,
        name: "Photosynthesis",
        text: "Unlock ",
        require: {
            trait: "RNA", // RNA
            species: 0,
        },
    },
    "Nucleus": {
        multiplier: 1,
        biomassCost: 350,
        name: "Nucleus",
        text: "Unlock Eukaryotes",
        require: {
            trait: "DNA", // DNA
            species: "Prokaryote", // prokaryote
        },
    },
    "Endosymbiosis": {
        multiplier: 1,
        biomassCost: 400,
        name: "Endosymbiosis",
        text: "For every Prokaryote reproduction, there is a 10% chance of also reproducing an Eukaryotes",
        require: {
            trait: "DNA", // DNA
            species: "Prokaryote", // prokaryote
        },
    },
    "Multicelluarity": {
        multiplier: 1,
        biomassCost: 1500,
        name: "Multicelluarity",
        text: "Unlock Sponge",
        require: {
            trait: "Nucleus", // nucleus
            species: "Eukaryote", // eukaryote
        },
    },
    "Differentiation": {
        multiplier: 1,
        biomassCost: 2000,
        name: "Differentiation",
        text: "",
        require: {
            trait: "Multicelluarity", // multicellularity
            species: "Sponge",
        },
    }
});

function evolvedTraitsAffectOrganism(organismName, evolvedTraits) {
    const allTraits = []
    evolvedTraits.forEach(trait => {
        allTraits.push(trait.name)
    })

    if (organismName === "Prokaryote" && allTraits.includes("Endosymbiosis")) {
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
        speciesEvolution(organismName) {
            const { organisms, actions, evolvedTraits } = get();
            const organism = organisms[organismName];
            const evolvedTraitsAffectingOrganism = evolvedTraitsAffectOrganism(organismName, evolvedTraits)

            switch (evolvedTraitsAffectingOrganism) {
                case 1:
                    // endosymbiosis effect: 
                    actions.changeBiomass(-organism.biomassCost);
                    if (diceRoll(50)) {
                        set(state => ({
                            evolvedSpecies: [...state.evolvedSpecies, organism, organisms["Eukaryote"]]
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
        traitEvolution(traitName) {
            const { traits, actions } = get();
            const trait = traits[traitName];

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
