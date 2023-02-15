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
    const evolvedTraits = useBioStore(s => s.evolvedTraits)
    let biomassPerClick = 1;
    if (Object.keys(evolvedTraits).includes()) {

    }
    return (
        <div className = "Polymerization">
            <button className="PolymerizationButton" onClick={() => actions.changeBiomass(biomassPerClick)}>
                {/* local have to use path bioclicker/graphics in order to work
                on prod remove the bioclicker */}
                <img src="bioclicker/graphics/organic.png" alt="organic molecule" width="100" height="100"/>
            </button>
            Polymerization <br/>
            + {biomassPerClick} per click
        </div>
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