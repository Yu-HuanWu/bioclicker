import { useBioStore } from "../store.js"

export function Biomass() {
    const biomass = useBioStore(s => s.biomass);
    return (
        <h1>this is your current biomass: {biomass}</h1>
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