import { useBioStore } from "../store.js"

export function Events() {
  const traitDescription = useBioStore(s => s.traitDescription);
  const traits = useBioStore(s=> s.traits)
  let currTrait = traits[traitDescription.trait]

  const event = useBioStore(s => s.event)
  const actions = useBioStore(s => s.actions)

  return (
    <div>
      {traitDescription.hover ? 
        <div 
          onMouseEnter={() => { actions.changeTraitDescription(false, 0) }}
          className="TraitDescription"> 
          {traitDescription.trait} <br/>
          {currTrait.text} <br/>
          requires: {currTrait.biomassCost} biomass 
          {currTrait.energyCost !== 0 &&
            ` and ${currTrait.energyCost} energy`
          }
        </div>
        :
        <div onMouseEnter={() => { actions.changeTraitDescription(false, 0) }}
          className="TraitDescription">
          <div>Current Event:</div>
          <div>{event.text}</div>
          <div>{event.description}</div>
        </div>
      }
    </div>
  )
}