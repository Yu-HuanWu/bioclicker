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
            <div className="ColumnTitle">Traits</div>
            <ul className="TraitsList">
                {Object.keys(traits)
                    .map(key => traits[key])
                    .map(trait => (
                        allTraitsId.includes(trait.id) ?
                        <li key={trait.id} className="TraitEvolved">
                            <div className="Mutate">
                                {trait.name}
                            </div>
                        </li>
                        :
                        <li key={trait.id} className="TraitUnevolved">
                            <button
                                className="Mutate"
                                disabled={biomass < trait.biomassCost}
                                onClick={() => actions.traitEvolution(trait.id)}
                            >
                            <div>
                                {trait.name}: {trait.biomassCost} biomass
                            </div>
                                Mutate
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}