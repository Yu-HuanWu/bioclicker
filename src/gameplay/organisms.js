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
    const actions = useBioStore(s => s.actions);
    return (
        <div>
            <h3>Species</h3>
            <ul className="OrganismsList">
                {Object.keys(organisms)
                    .map(key => organisms[key])
                    .map(organism => (
                        <li key={organism.id} className="Organism">
                            <div>
                                {organism.name} ({organism.bps} biomass per second): {organism.biomassCost} biomass
                            </div>
                            <button
                                className="buyBtn"
                                disabled={DisableEvolution(organism.require) || (biomass < organism.biomassCost)}
                                onClick={() => actions.speciesEvolution(organism.id)}
                            >
                                Reproduce
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}