import { useBioStore } from "../store.js"

export function DisableEvolution(requirement) {
    const evolvedTraits = useBioStore(s => s.evolvedTraits)
    const evolvedSpecies = useBioStore(s => s.evolvedSpecies)
    const allTraits = []
    evolvedTraits.forEach(trait => {
        allTraits.push(trait.name)
    })
    const allSpecies = []
    evolvedSpecies.forEach(species => {
        allSpecies.push(species.name)
    })
    if ((allTraits.includes(requirement.trait) || requirement.trait === 0) && (allSpecies.includes(requirement.species) || requirement.species === 0)) {
        return false
    }
    return true
}

export function OrganismList() {
  const biomass = useBioStore(s => s.biomass);
  const organisms = useBioStore(s => s.organisms);
  const evolvedSpecies = useBioStore(s => s.evolvedSpecies);
  const actions = useBioStore(s => s.actions);

  const numberOfThisOrganism = (organismName) => {
    let count = 0
    evolvedSpecies.forEach(species => {
      if (species.name === organismName) {
        count += 1
      }
    })
    return count
  }
  return (
    <div>
      <div className="ColumnTitle">Species</div>
      <div className="OrganismsList">
        {Object.keys(organisms)
          .map(key => organisms[key])
          .map((organism, i) => {
            let evolutionDisabled = DisableEvolution(organism.require)
            const organismCount = numberOfThisOrganism(organism.name)
            if (evolutionDisabled && organismCount === 0) {
              return <div key={i}></div>
            } else {
              return (
                <div key={i} className="Organism">
                <div>
                    {organism.name} ({organism.bps} biomass per second) X {organismCount}
                </div>
                <button
                  className="Reproduce"
                  disabled={evolutionDisabled || (biomass < organism.biomassCost)}
                  onClick={() => {
                    actions.speciesEvolution(organism.name)
                  }}
                >
                  Reproduce for {organism.biomassCost} biomass
                </button>
            </div>
            )}
          })
        }
      </div>
    </div>
  );
}