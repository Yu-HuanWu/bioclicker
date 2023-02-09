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

export function AutoIncrement({tbps, teps}) {
    const actions = useBioStore(s => s.actions);
    const incBiomass = useCallback(() => {
        actions.changeBiomass(tbps)
        actions.changeEnergy(teps)
        actions.increaseCounter()
    }, [
        actions,
        tbps,
        teps,
    ]);
    useInterval(incBiomass, 1000);
    return null
}

export function AutoIncrementByOrganisms() {
    const evolvedSpecies = useBioStore(s => s.evolvedSpecies);
    let totalBiomassPerSecond = 0;
    let totalEnergyPerSecond = 0;
    evolvedSpecies.forEach(organism => {
        totalBiomassPerSecond += organism.bps;
        totalEnergyPerSecond += organism.eps;
    })
    return (
        <AutoIncrement tbps={totalBiomassPerSecond} teps={totalEnergyPerSecond} />
    );
}