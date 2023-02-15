import { useBioStore } from "../store.js"

export function Events() {
  const traitDescription = useBioStore(s => s.traitDescription);
  const traits = useBioStore(s=> s.traits)
  let currTrait = traits[traitDescription.trait]

  const event = useBioStore(s => s.event)

  return (
    <div>
      {traitDescription.hover ? 
        <div className="TraitDescription"> 
          {traitDescription.trait} <br/>
          {currTrait.text} <br/>
          requires: {currTrait.biomassCost} biomass 
          {currTrait.energyCost !== 0 &&
            ` and ${currTrait.energyCost} energy`
          }
        </div>
        :
        <div>
          <div className="ColumnTitle">Current Event:</div>
          <div className="ColumnTitle">{event.text}</div>
        </div>
      }
    </div>
  )
}