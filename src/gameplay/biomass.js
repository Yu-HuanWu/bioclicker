import { useBioStore } from "../store.js"

export function Biomass() {
    const biomass = useBioStore(s => s.biomass);
    return (
        <div>
            <div className="ColumnTitle">this is your current biomass:</div>
            <div className="ColumnTitle">{biomass}</div>
        </div>
    )
}

export function Polymerization() {
    const actions = useBioStore(s => s.actions);
    return (
        <button className="Polymerization" onClick={() => actions.changeBiomass(1)}>
            <img src="bioclicker/graphics/organic.png" alt="organic molecule" width="100" height="100"/>
            Polymerization
        </button>
    );
}

export function Energy() {
    const energy = useBioStore(s => s.energy);
    return (
        <div>
            <div className="ColumnTitle">this is your current energy:</div>
            <div className="ColumnTitle">{energy}</div>
        </div>
    )
}