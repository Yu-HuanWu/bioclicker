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
    const actions = useBioStore(s => s.actions);
    const incBiomass = useCallback(() => {
        actions.changeBiomass(tbps)
        actions.increaseCounter()
    }, [
        actions,
        tbps
    ]);
    useInterval(incBiomass, 1000);
    return null
}

export function AutoIncrementByOrganisms() {
    const evolvedSpecies = useBioStore(s => s.evolvedSpecies);
    let totalBiomassPerSecond = 0;
    evolvedSpecies.forEach(organism => {
        totalBiomassPerSecond += organism.bps
    })
    return (
        <AutoIncrement tbps={totalBiomassPerSecond} />
    );
}