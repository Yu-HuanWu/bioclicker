import { useBioStore } from "../store.js"

export function Biomass() {
    const biomass = useBioStore(s => s.biomass);
    return (
        <div>
            <h1>this is your current biomass:</h1>
            <h2>{biomass}</h2>
        </div>
    )
}

export function Polymerization() {
    const actions = useBioStore(s => s.actions);
    return (
        <button onClick={() => actions.changeBiomass(1)}>
            Polymerization
        </button>
    );
}