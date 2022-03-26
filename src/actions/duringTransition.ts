type TransitionCallback = (isStart: boolean, isIntro: boolean) => void

/**
 * Calls a function when a Svelte transition is about to start or end.
 * @param node - The node to watch for transitions on.
 * @param callback - The function to call. The first parameter is true when the transition is about to start, false when it is about to end. The second parameter is true when the transition is an intro, false when it is an outro.
 */
export function transitionCallback(node: HTMLElement, callback: TransitionCallback ) {
    let startInto = () => { callback(true, true); };
    let endIntro = () => { callback(false, true); };
    let startOutro = () => { callback(true, false); };
    let endOutro = () => { callback(false, false); };

    function setListeners(add: boolean) {
        const action = add ? 'addEventListener' : 'removeEventListener';
        node[action]('introstart', startInto);
        node[action]('introend', endIntro);
        node[action]('outrostart', startOutro);
        node[action]('outroend', endOutro);
    }

    setListeners(true);

    return {
        update(newCallback: TransitionCallback) {
            setListeners(false);
            startInto = () => { newCallback(true, true); };
            endIntro = () => { newCallback(false, true); };
            startOutro = () => { newCallback(true, false); };
            endOutro = () => { newCallback(false, false); };
            setListeners(true);
        },
        destroy() {
            setListeners(false);
        }
    };
}