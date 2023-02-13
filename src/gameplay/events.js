import { useBioStore } from "../store.js"

export function Events() {
    const energy = useBioStore(s => s.energy);
    return (
        <div>
            <div className="ColumnTitle">Current Event:</div>
            <div className="ColumnTitle">{energy}</div>
        </div>
    )
}