import { useBioStore } from "../store.js"

export function TraitList() {
    const biomass = useBioStore(s => s.biomass);
    const traits = useBioStore(s => s.traits);
    const actions = useBioStore(s => s.actions);
    const evolvedTraits = useBioStore(s => s.evolvedTraits)
    const allTraitsId = []
    evolvedTraits.forEach(trait => {
        allTraitsId.push(trait.id)
    })
    return (
        <div>
            <h3>Mutations</h3>
            <ul className="OrganismsList">
                {Object.keys(traits)
                    .map(key => traits[key])
                    .map(trait => (
                        allTraitsId.includes(trait.id) ?
                        <li key={trait.id} className="Organism">
                            <div>
                                {trait.name}
                            </div>
                        </li>
                        :
                        <li key={trait.id} className="Organism">
                            <div>
                                {trait.name}: {trait.biomassCost} biomass
                            </div>
                            <button
                                className="buyBtn"
                                disabled={biomass < trait.biomassCost}
                                onClick={() => actions.traitEvolution(trait.id)}
                            >
                                Mutate
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}