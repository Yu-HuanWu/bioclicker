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
    const event = useBioStore(s => s.event)
    const evolvedTraits = useBioStore(s => s.evolvedTraits)
    const carbohydrateEvolved = evolvedTraits.filter(trait => {
        return trait.name === "Carbohydrate";
    }).length > 0;
    const organism = useBioStore(s => s.organisms)
    const evolvedSpecies = useBioStore(s => s.evolvedSpecies);
    let totalBiomassPerSecond = 0;
    let totalEnergyPerSecond = 0;
    const counter = useBioStore(s => s.counter)
    if (counter < 0) { 
        return
    }

    Object.keys(evolvedSpecies).forEach(organismName => {
        if (event.name === "Ice Age") {
            totalBiomassPerSecond = 0;
            totalEnergyPerSecond = 0;
        } else if (event.name === "Sunny" && organism[organismName].role === 1) {
            totalBiomassPerSecond += ((organism[organismName].bps * evolvedSpecies[organismName]) *2);
            if (carbohydrateEvolved) {
                totalEnergyPerSecond += ((organism[organismName].eps * evolvedSpecies[organismName]) *2);
            }
        } else {
            totalBiomassPerSecond += (organism[organismName].bps * evolvedSpecies[organismName]);
            if (carbohydrateEvolved) {
                totalEnergyPerSecond += (organism[organismName].eps * evolvedSpecies[organismName]);
            }
        }
    })
    return (
        <AutoIncrement tbps={totalBiomassPerSecond} teps={totalEnergyPerSecond} />
    );
}