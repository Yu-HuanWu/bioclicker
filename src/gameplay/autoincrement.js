import React, { useCallback, useEffect, useRef } from "react";
import { useBioStore } from "../store.js"

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export function AutoIncrement({tbps}) {
    const biomass = useBioStore(s => s.biomass)
    const actions = useBioStore(s => s.actions);
    const incBiomass = useCallback(() => actions.changeBiomass(tbps), [
        actions,
        tbps
    ]);
    useInterval(incBiomass, 1000);
    return null
}

export function AutoIncrementByOrganisms() {
    const purchasedUpgrades = useBioStore(s => s.purchasedUpgrades);
    let totalBiomassPerSecond = 0;
    purchasedUpgrades.forEach(organism => {
        totalBiomassPerSecond += organism.cps
    })
    return (
        <AutoIncrement tbps={totalBiomassPerSecond} />
    );
}