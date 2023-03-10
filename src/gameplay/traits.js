import { useBioStore } from "../store.js"
import { DisableEvolution } from "./organisms.js";

export function TraitList() {
  const biomass = useBioStore(s => s.biomass);
  const energy = useBioStore(s => s.energy);
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
          .map((trait, i) => {
            let mutationDisabled = DisableEvolution(trait.require)
            if (mutationDisabled) {
              return <div key={i}></div>
            } else {
              return (
                allTraits.includes(trait.name) ?
                <li key={i} 
                    onMouseEnter={() => { actions.changeTraitDescription(true, trait.name) }}
                    onMouseLeave={() => { actions.changeTraitDescription(false, 0) }}
                  className="TraitEvolved">
                  <div title={trait.text} className="Mutate">
                    {trait.name}
                  </div>
                </li>
                :
                <li key={i} 
                  onMouseEnter={() => { actions.changeTraitDescription(true, trait.name) }}
                  onMouseLeave={() => { actions.changeTraitDescription(false, 0) }}
                  className="TraitUnevolved">
                  <button
                    className="Mutate"
                    disabled={biomass < trait.biomassCost || energy < trait.energyCost}
                    onClick={() => actions.traitEvolution(trait.name)}
                  >
                    {trait.name}
                  </button>
                </li>
              )
            }
          })
        }
      </ul>
    </div>
  );
}