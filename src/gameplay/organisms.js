import { useBioStore } from "../store.js"

export function OrganismList() {
    const score = useBioStore(s => s.score);
    const organisms = useBioStore(s => s.organisms);
    const actions = useBioStore(s => s.actions);

    return (
        <div className="Organisms">
            <h3>Species</h3>
            <ul>
                {Object.keys(organisms)
                    .map(key => organisms[key])
                    .map(organism => (
                        <li key={organism.id} className="Organism">
                            <div>
                                {organism.name} ({organism.cps} biomass per second): {organism.cost} biomass
                            </div>
                            <button
                                className="buyBtn"
                                disabled={score < organism.cost}
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