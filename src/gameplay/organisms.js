import { useBioStore } from "../store.js"

export function OrganismList() {
    const biomass = useBioStore(s => s.biomass);
    const organisms = useBioStore(s => s.organisms);
    const actions = useBioStore(s => s.actions);

    return (
        <div>
            <h3>Species</h3>
            <ul className="OrganismsList">
                {Object.keys(organisms)
                    .map(key => organisms[key])
                    .map(organism => (
                        <li key={organism.id} className="Organism">
                            <div>
                                {organism.name} ({organism.cps} biomass per second): {organism.cost} biomass
                            </div>
                            <button
                                className="buyBtn"
                                disabled={biomass < organism.cost}
                                onClick={() => actions.purchase(organism.id)}
                            >
                                Reproduce
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}