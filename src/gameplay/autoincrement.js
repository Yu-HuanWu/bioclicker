import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
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

export function AutoIncrement({organism}) {
    const biomass = useBioStore(s => s.biomass)
    const actions = useBioStore(s => s.actions);
    console.log(organism)
    const incBiomass = useCallback(() => actions.changeBiomass(organism.cps), [
        actions,
        organism.cps
        // upgrade.cps
    ]);
    useInterval(incBiomass, 1000);
    return (
        <h1>this is your current biomass: {biomass}</h1>
    )
}