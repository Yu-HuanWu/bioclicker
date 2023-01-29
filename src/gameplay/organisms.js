import { useBioStore } from "../store.js"

function DisableEvolution(requirement) {
    const evolvedTraits = useBioStore(s => s.evolvedTraits)
    const evolvedSpecies = useBioStore(s => s.evolvedSpecies)
    const allTraitsId = []
    evolvedTraits.forEach(trait => {
        allTraitsId.push(trait.id)
    })
    const allSpeciesId = []
    evolvedSpecies.forEach(species => {
        allSpeciesId.push(species.id)
    })
    if ((allTraitsId.includes(requirement.trait) || requirement.trait === 0) && (allSpeciesId.includes(requirement.species) || requirement.species === 0)) {
        return false
    }
    return true
}

export function OrganismList() {
    const biomass = useBioStore(s => s.biomass);
    const organisms = useBioStore(s => s.organisms);
    const evolvedSpecies = useBioStore(s => s.evolvedSpecies);
    const actions = useBioStore(s => s.actions);

    const numberOfThisOrganism = (organismId) => {
        let count = 0
        evolvedSpecies.forEach(species => {
            if (species.id === organismId) {
                count += 1
            }
        })
        return count
    }
    return (
        <div>
            <h3>Species</h3>
            <div className="OrganismsList">
                {Object.keys(organisms)
                    .map(key => organisms[key])
                    .map(organism => (
                        <div key={organism.id} className="Organism">
                            <div>
                                {organism.name} ({organism.bps} biomass per second) X {numberOfThisOrganism(organism.id)}
                            </div>
                            <button
                                className="Reproduce"
                                disabled={DisableEvolution(organism.require) || (biomass < organism.biomassCost)}
                                onClick={() => actions.speciesEvolution(organism.id)}
                            >
                                Reproduce for {organism.biomassCost} biomass
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}