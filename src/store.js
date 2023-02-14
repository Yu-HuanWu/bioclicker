import { create } from 'zustand';

const getInitialCounter = () => 0;
const getInitialBiomass = () => 10000;
const getInitialEnergy = () => 1000;
const getInitialOrganisms = () => ({
    "Protobiont": {
        bps: 1,
        eps: 0,
        biomassCost: 10,
        energyCost: 0,
        name: "Protobiont",
        require: {
            trait: "RNA",
            species: 0,
        },
        text: "sac of fat with gene",
    },
    "Prokaryote": {
        bps: 5,
        eps: 0,
        biomassCost: 50,
        energyCost: 0,
        name: "Prokaryote",
        require: {
            trait: "DNA", // DNA
            species: "Protobiont",
        },
        text: "no nucleus, no problem",
    },
    "Cyanobacteria": {
        bps: 5,
        eps: 2,
        biomassCost: 50,
        energyCost: 0,
        name: "Cyanobacteria",
        require: {
            trait: "Photosynthesis",
            species: "Prokaryote",
        },
        text: "more (sun) power to you",
    },
    "Eukaryote": {
        bps: 10,
        eps: 0,
        biomassCost: 200,
        energyCost: 5,
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
        energyCost: 50,
        name: "Sponge",
        require: {
            trait: "Multicelluarity",
            species: "Eukaryote",
        },
        text: "",
    },
    
});

const getInitialTraits = () => ({
    "Carbohydrate": {
        multiplier: 1,
        biomassCost: 10,
        energyCost: 0,
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
        energyCost: 0,
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
        energyCost: 0,
        name: "DNA",
        text: "Unlock Prokaryote",
        require: {
            trait: "RNA",
            species: 0,
        },
    },
    "Photosynthesis": {
        multiplier: 1,
        biomassCost: 300,
        energyCost: 0,
        name: "Photosynthesis",
        text: "Unlock Cyanobacteria",
        require: {
            trait: "RNA",
            species: 0,
        },
    },
    "Respiration": {
        multiplier: 1,
        biomassCost: 200,
        energyCost: 300,
        name: "Respiration",
        text: "Gain more energy: 10% of every producer's biomass cost",
        require: {
            trait: "RNA",
            species: 0,
        },
    },
    "Nucleus": {
        multiplier: 1,
        biomassCost: 350,
        energyCost: 0,
        name: "Nucleus",
        text: "Unlock Eukaryotes",
        require: {
            trait: "DNA",
            species: "Prokaryote",
        },
    },
    "Endosymbiosis": {
        multiplier: 1,
        biomassCost: 400,
        energyCost: 0,
        name: "Endosymbiosis",
        text: "For every Prokaryote reproduction, there is a 10% chance of also reproducing an Eukaryotes",
        require: {
            trait: "DNA",
            species: "Prokaryote",
        },
    },
    "Multicelluarity": {
        multiplier: 1,
        biomassCost: 1500,
        energyCost: 50,
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
        energyCost: 500,
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
        return 1
    } else if (["Cyanobacteria"].includes(organismName) && allTraits.includes("Respiration")) {
        return 2
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
    traitDescription: {"hover": false, "trait": 0},
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
        changeTraitDescription(bool, traitName) {
            set(() => ({ traitDescription: { "hover": bool, "trait": traitName }}))
        },
        speciesEvolution(organismName) {
            const { organisms, actions, evolvedTraits } = get();
            const organism = organisms[organismName];
            const evolvedTraitsAffectingOrganism = evolvedTraitsAffectOrganism(organismName, evolvedTraits)

            switch (evolvedTraitsAffectingOrganism) {
                case 1:
                    // endosymbiosis effect: 
                    actions.changeBiomass(-organism.biomassCost);
                    if (diceRoll(10)) {
                        set(state => ({
                            evolvedSpecies: [...state.evolvedSpecies, organism, organisms["Eukaryote"]]
                        }));
                    } else {
                        set(state => ({
                            evolvedSpecies: [...state.evolvedSpecies, organism]
                        }));
                    }
                    break;
                case 2:
                    set(state => ({
                        evolvedSpecies: [...state.evolvedSpecies, organism],
                        energy: state.energy+ Math.floor(organism.biomassCost * 0.1)
                    }));
                    break;
                // case 3:
                //     // code block
                //     break;
                default:
                    actions.changeBiomass(-organism.biomassCost);
                    actions.changeEnergy(-organism.energyCost);
                    set(state => ({
                        evolvedSpecies: [...state.evolvedSpecies, organism]
                    }));
            }
        },
        traitEvolution(traitName) {
            const { traits, actions } = get();
            const trait = traits[traitName];

            actions.changeBiomass(-trait.biomassCost);
            actions.changeEnergy(-trait.energyCost);
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
