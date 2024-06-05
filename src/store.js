import { create } from 'zustand';

const getInitialCounter = () => 0;
const getInitialBiomass = () => 10000;
const getInitialEnergy = () => 0;
const Role = {
    Producer: 1,
    Consumer: 2,
    Decomposer: 3,
}
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
        role: Role.Consumer,
        text: "sac of fat with gene",
        imagePath: "bioclicker/graphics/testtile.jpeg",
    },
    "Prokaryote": {
        bps: 5,
        eps: 0,
        biomassCost: 50,
        energyCost: 0,
        name: "Prokaryote",
        require: {
            trait: "DNA",
            species: "Protobiont",
        },
        role: Role.Consumer,
        text: "no nucleus, no problem",
        imagePath: "",
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
        role: Role.Producer,
        text: "more (sun) power to you",
        imagePath: "",
    },
    "Eukaryote": {
        bps: 10,
        eps: 0,
        biomassCost: 200,
        energyCost: 5,
        name: "Eukaryote",
        require: {
            trait: "Nucleus",
            species: "Prokaryote",
        },
        role: Role.Consumer,
        text: "mo nucleus, mo problem",
        imagePath: "bioclicker/graphics/testtile.jpeg",
    },
    "Yeast": {
        bps: 15,
        eps: 0,
        biomassCost: 300,
        energyCost: 10,
        name: "Yeast",
        require: {
            trait: "Nucleus",
            species: "Eukaryote",
        },
        role: Role.Consumer,
        text: "sun rises from the east, bread rises from the yeast",
        imagePath: "bioclicker/graphics/testtile.jpeg",
    },
    "Algae": {
        bps: 10,
        eps: 10,
        biomassCost: 1000,
        energyCost: 50,
        name: "Algae",
        require: {
            trait: "Photosynthesis",
            species: "Eukaryote",
        },
        role: Role.Producer,
        text: "what's a producer's favorite math? Algae-bra",
        imagePath: "",
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
        role: Role.Consumer,
        text: "are ya ready kids?",
        imagePath: "",
    },
    "Jellyfish": {
        bps: 90,
        eps: 0,
        biomassCost: 2000,
        energyCost: 100,
        name: "Jellyfish",
        require: {
            trait: "Differentiation",
            species: "Sponge",
        },
        role: Role.Consumer,
        text: "when will peanut butter fish evolve?",
        imagePath: "",
    },
    "Seaweed": {
        bps: 30,
        eps: 30,
        biomassCost: 2000,
        energyCost: 100,
        name: "Seaweed",
        require: {
            trait: "Differentiation",
            species: "Algae",
        },
        role: Role.Producer,
        text: "totally legal",
        imagePath: "",
    },
    "Starfish": {
        bps: 40,
        eps: 0,
        biomassCost: 2000,
        energyCost: 1000,
        name: "Starfish",
        require: {
            trait: "Deuterostome",
            species: "Jellyfish",
        },
        role: Role.Consumer,
        text: "Is mayonnaise an instrument?",
        imagePath: "",
    },
    "Nematode": {
        bps: 40,
        eps: 0,
        biomassCost: 1000,
        energyCost: 2000,
        name: "Nematode",
        require: {
            trait: "Protostome",
            species: "Jellyfish",
        },
        role: Role.Consumer,
        text: "head, shoulder, nematode~",
        imagePath: "",
    },
    "Lamprey": {
        bps: 100,
        eps: 0,
        biomassCost: 8000,
        energyCost: 3000,
        name: "Lamprey",
        require: {
            trait: "Vertebrate",
            species: "Starfish",
        },
        role: Role.Consumer,
        text: "nothing lame about lamprey!",
        imagePath: "",
    },
    "Shark": {
        bps: 500,
        eps: 0,
        biomassCost: 18000,
        energyCost: 9000,
        name: "Shark",
        require: {
            trait: "Vertebrate",
            species: "Lamprey",
        },
        role: Role.Consumer,
        text: "prehistoric shark, doo doo doo~",
        imagePath: "",
    },
    "Trilobite": {
        bps: 100,
        eps: 0,
        biomassCost: 2000,
        energyCost: 3000,
        name: "Trilobite",
        require: {
            trait: "Arthropod",
            species: "Nematode",
        },
        role: Role.Consumer,
        text: "Not the first in the sea, but first to see.",
        imagePath: "",
    },
    "Crab": {
        bps: 200,
        eps: 0,
        biomassCost: 3000,
        energyCost: 4500,
        name: "Crab",
        require: {
            trait: "Arthropod",
            species: "Trilobite",
        },
        role: Role.Consumer,
        text: "crab rave time",
        imagePath: "",
    },
    " ": {
        bps: 400,
        eps: 10,
        biomassCost: 10,
        energyCost: 100,
        name: " ",
        require: {
            trait: " ",
            species: " ",
        },
        role: Role.Decomposer,
        text: "",
        imagePath: "",
    },
    "": {
        bps: 0,
        eps: 0,
        biomassCost: 0,
        energyCost: 0,
        name: "",
        require: {
            trait: "",
            species: "",
        },
        role: Role.Consumer,
        text: "",
        imagePath: "",
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
    "Protein": {
        multiplier: 2,
        biomassCost: 20,
        energyCost: 0,
        name: "Protein",
        text: "Double your polymerization!",
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
    "Binary Fission": {
        multiplier: 2,
        biomassCost: 275,
        energyCost: 0,
        name: "Binary Fission",
        text: "10% chance of getting double Prokaryote per reproduction. Double your polymerization!",
        require: {
            trait: "DNA",
            species: "Prokaryote",
        },
    },
    "Photosynthesis": {
        multiplier: 2,
        biomassCost: 300,
        energyCost: 0,
        name: "Photosynthesis",
        text: "Unlock Cyanobacteria. Double your polymerization!",
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
        text: "Gain additional energy equal to 10% of every new Producer's biomass cost.",
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
        text: "For every Prokaryote reproduction, there is a 10% chance of Eukaryote reproduction",
        require: {
            trait: "DNA",
            species: "Prokaryote",
        },
    },
    "Mitosis": {
        multiplier: 2,
        biomassCost: 675,
        energyCost: 0,
        name: "Mitosis",
        text: "10% chance of getting double Eukaryotes per asexual reproduction. Double your polymerization!",
        require: {
            trait: "Nucleus",
            species: "Eukaryote",
        },
    },
    "Meiosis": {
        multiplier: 2,
        biomassCost: 675,
        energyCost: 0,
        name: "Meiosis",
        text: "10% chance of getting double Eukaryotes per sexual reproduction. Double your polymerization!",
        require: {
            trait: "Nucleus",
            species: "Seaweed",
        },
    },
    "Multicelluarity": {
        multiplier: 1,
        biomassCost: 1500,
        energyCost: 50,
        name: "Multicelluarity",
        text: "Unlock Sponge",
        require: {
            trait: "Mitosis",
            species: "Eukaryote",
        },
    },
    "Differentiation": {
        multiplier: 1,
        biomassCost: 2000,
        energyCost: 500,
        name: "Differentiation",
        text: "Unlock Jellyfish and Seaweed",
        require: {
            trait: "Multicelluarity",
            species: "Sponge",
        },
    },
    "Protostome": {
        multiplier: 2,
        biomassCost: 3500,
        energyCost: 1000,
        name: "Protostome",
        text: "Unlock Nematode. Double your polymerization!",
        require: {
            trait: "Multicelluarity",
            species: "Jellyfish",
        },
    },
    "Deuterostome": {
        multiplier: 2,
        biomassCost: 3500,
        energyCost: 1000,
        name: "Deuterostome",
        text: "Unlock Starfish. Double your polymerization!",
        require: {
            trait: "Multicelluarity",
            species: "Jellyfish",
        },
    },
    "Vertebrate": {
        multiplier: 2,
        biomassCost: 9000,
        energyCost: 2000,
        name: "Vertebrate",
        text: "Unlock Lamprey",
        require: {
            trait: "Deuterostome",
            species: "Jellyfish",
        },
    },
    "Arthropod": {
        multiplier: 1,
        biomassCost: 19000,
        energyCost: 20000,
        name: "Arthropod",
        text: "Unlock Trilobite",
        require: {
            trait: "Protostome",
            species: "Nematode",
        },
    },
    "Carcinisation": {
        multiplier: 1,
        biomassCost: 19000,
        energyCost: 20000,
        name: "Carcinisation",
        text: "Unlock crabs",
        require: {
            trait: "Deuterostome",
            species: "Jellyfish",
        },
    },
});

const allEvents = {
    0: {
        name: "Cosmic Radiation",
        text: "a burst of cosmic radiation detected!",
        description: "Polymerize twice as much!",
        imagePath: "",
    },
    1: {
        name: "Ice Age",
        text: "thick smokes and ashes cover the sun.",
        description: "All organisms ceased biomass and energy production.",
        imagePath: "",
    },
    2: {
        name: "Sunny",
        text: "clear sky allowing reliable sunshine through.",
        description: "All producers double their biomass and energy production.",
        imagePath: "",
    },
    3: {
        name: "Sunny",
        text: "clear sky allowing reliable sunshine through.",
        description: "All producers double their biomass and energy production.",
        imagePath: "",
    },
}

function evolvedTraitsAffectOrganism(organism, evolvedTraits) {
    const allTraits = []
    evolvedTraits.forEach(trait => {
        allTraits.push(trait.name)
    })

    if (organism.name === "Prokaryote" && allTraits.includes("Endosymbiosis")) {
        return 1
    } else if (organism.role === Role.Producer && allTraits.includes("Respiration")) {
        return 2
    } else if (organism.name === "Prokaryote" && allTraits.includes("Binary Fission")) {
        return 3
    } else if (organism.name === "Eukaryote" && allTraits.includes("Mitosis")) {
        return 4
    }
    return 0
}

function diceRoll(percentage) {
    return percentage > Math.floor(Math.random() * 100)
}

export const useBioStore = create((set, get) => ({
    counter: getInitialCounter(),
    event: {},
    biomass: getInitialBiomass(),
    energy: getInitialEnergy(),
    organisms: getInitialOrganisms(),
    traits: getInitialTraits(),
    traitDescription: {"hover": false, "trait": 0},
    evolvedSpecies: {},
    evolvedTraits: [],
    actions: {
        increaseCounter() {
            const { counter } = get();
            if (counter >= 10) {
                const currEvent = allEvents[Math.floor(Math.random() * 3)];

                set(()=> ({ 
                    counter: 0, 
                    event: currEvent 
                }))
            } else {
                set(state => ({
                    counter: state.counter + 1
                }))
            }
        },
        newGame() {
            set({
                biomass: getInitialBiomass(),
                organisms: getInitialOrganisms(),
                evolvedSpecies: {},
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
            const evolvedTraitsAffectingOrganism = evolvedTraitsAffectOrganism(organism, evolvedTraits)

            switch (evolvedTraitsAffectingOrganism) {
                case 1:
                    // endosymbiosis effect: 
                    actions.changeBiomass(-organism.biomassCost);
                    set(state => {
                        const newSpeciesState = state.evolvedSpecies;
                        if (newSpeciesState[organismName] ) {
                            newSpeciesState[organismName] += 1;
                        } else {
                            newSpeciesState[organismName] = 1;
                        }
                        if (diceRoll(10)){
                            if (newSpeciesState["Eukaryote"]) {
                                newSpeciesState["Eukaryote"] += 1;
                            } else {
                                newSpeciesState["Eukaryote"] = 1;
                            }
                        }
                        return ({
                            evolvedSpecies: newSpeciesState
                        })
                    });
                    break;
                case 2:
                    // Respiration
                    actions.changeBiomass(-organism.biomassCost);
                    set(state => {
                        const newSpeciesState = state.evolvedSpecies;
                        if (newSpeciesState[organismName]) {
                            newSpeciesState[organismName] += 1;
                        } else {
                            newSpeciesState[organismName] = 1;
                        }
                        return ({
                            evolvedSpecies: newSpeciesState,
                            energy: state.energy + Math.floor(organism.biomassCost * 0.1)
                        })
                    })
                    break;
                case 3:
                    // Binary Fission
                    actions.changeBiomass(-organism.biomassCost);
                    set(state => {
                        const newSpeciesState = state.evolvedSpecies;
                        if (newSpeciesState[organismName]) {
                            newSpeciesState[organismName] += 1;
                        } else {
                            newSpeciesState[organismName] = 1;
                        }
                        if (diceRoll(10)) {
                            newSpeciesState[organismName] += 1;
                        }
                        return ({
                            evolvedSpecies: newSpeciesState
                        })
                    })
                    break;
                case 4:
                    // Mitosis
                    actions.changeBiomass(-organism.biomassCost);
                    set(state => {
                        const newSpeciesState = state.evolvedSpecies;
                        if (newSpeciesState[organismName]) {
                            newSpeciesState[organismName] += 1;
                        } else {
                            newSpeciesState[organismName] = 1;
                        }
                        if (diceRoll(10)) {
                            newSpeciesState[organismName] += 1;
                        }
                        return ({
                            evolvedSpecies: newSpeciesState
                        })
                    })
                    break;
                // case 4:
                //     // code block
                //     break;
                default:
                    actions.changeBiomass(-organism.biomassCost);
                    actions.changeEnergy(-organism.energyCost);
                    set(state => {
                        const newSpeciesState = state.evolvedSpecies;
                        if (newSpeciesState[organismName]) {
                            newSpeciesState[organismName] += 1;
                        } else {
                            newSpeciesState[organismName] = 1;
                        }
                        return ({
                            evolvedSpecies: newSpeciesState
                        })
                    })
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
