//Тротлинг
// fn - фунция которая будет вызываться
// wait - задержка между вызовами

function throttle(fn, wait) {
    let previouslyRun, queuedToRun;

    return function invokeFn(...args) {
        const now = Date.now();

        queuedToRun = clearTimeout(queuedToRun);

        if (!previouslyRun || now - previouslyRun >= wait) {
            fn.apply(null, args);
            previouslyRun = now;
        } else {
            queuedToRun = setTimeout(invokeFn.bind(null, ...args), wait - (now - previouslyRun));
        }
    };
}
