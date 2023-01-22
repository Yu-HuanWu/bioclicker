import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useBioStore } from "../store.js"

const useInterval = (callback, delay) => {
    const savedCallback = useRef(() => { });

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        if (delay !== null) {
            const interval = setInterval(() => savedCallback.current(), delay || 0);
            return () => clearInterval(interval);
        }

        return undefined;
    }, [delay]);
};

export function Species({upgrade}) {
    const score = useBioStore(s => s.score)
    const actions = useBioStore(s => s.actions);
    const greaterThan1000cps = upgrade.cps > 1000;
    const delay = Math.max(1000 / upgrade.cps, 1);
    const incAmount = greaterThan1000cps ? upgrade.cps / 1000 : 1;
    const incScore = useCallback(() => actions.changeScore(incAmount), [
        actions,
        incAmount
    ]);
    // const timeout = useInterval(incScore, delay);
    // useEffect(() => {
    //     timeout.start();
    // }, []);
    return (
        <h1>this is a test {score}</h1>
    )
}