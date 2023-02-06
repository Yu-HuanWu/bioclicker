import { useBioStore } from "../store.js"
import { DisableEvolution } from "./organisms.js";

export function TraitList() {
    const biomass = useBioStore(s => s.biomass);
    const traits = useBioStore(s => s.traits);
    const actions = useBioStore(s => s.actions);
    const evolvedTraits = useBioStore(s => s.evolvedTraits)
    const allTraits = []
    evolvedTraits.forEach(trait => {
        allTraits.push(trait.name)
    })
    return (
        <div>
            <div className="ColumnTitle">Traits</div>
            <ul className="TraitsList">
                {Object.keys(traits)
                    .map(key => traits[key])
                    .map(trait => {
                        let mutationDisabled = DisableEvolution(trait.require)
                        if (mutationDisabled) {
                            return <></>
                        } else {
                            return (
                        allTraits.includes(trait.name) ?
                        <li key={trait.biomassCost} className="TraitEvolved">
                            <div className="Mutate">
                                {trait.name}
                            </div>
                        </li>
                        :
                        <li key={trait.biomassCost} className="TraitUnevolved">
                            <button
                                className="Mutate"
                                disabled={biomass < trait.biomassCost}
                                onClick={() => actions.traitEvolution(trait.name)}
                            >
                            <div>
                                {trait.name}: {trait.biomassCost} biomass
                            </div>
                                Mutate
                            </button>
                        </li>
                        )}
                })}
            </ul>
        </div>
    );
}