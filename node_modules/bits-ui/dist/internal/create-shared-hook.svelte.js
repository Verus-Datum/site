export function createSharedHook(factory) {
    let subscribers = 0;
    let state = $state();
    let scope;
    function dispose() {
        subscribers -= 1;
        if (scope && subscribers <= 0) {
            scope();
            state = undefined;
            scope = undefined;
        }
    }
    return ((...args) => {
        subscribers += 1;
        if (state === undefined) {
            scope = $effect.root(() => {
                state = factory(...args);
            });
        }
        $effect(() => {
            return () => {
                dispose();
            };
        });
        return state;
    });
}
