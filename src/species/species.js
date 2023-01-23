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

export function Species({upgrade}) {
    const score = useBioStore(s => s.score)
    const actions = useBioStore(s => s.actions);
    const incScore = useCallback(() => actions.changeScore(upgrade.cps), [
        actions,
        // upgrade.cps
    ]);
    const timeout = useInterval(incScore, 1000);
    return (
        <h1>this is a test {score}</h1>
    )
}