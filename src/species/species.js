import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { useBioStore } from "../store.js"

export function Species() {
    const score = useBioStore(s => s.score)
    return (
        <h1>this is a test {score}</h1>
    )
}