
const isFunc = (exec) => typeof exec === 'function';


module.exports = (arrayToListen = [], future = 1, ...extraArgs) => {
    future = future || 1;
    arrayToListen = arrayToListen || [];
    let running = 0;
    const queue = [];
    let queueing = null;
    const next = (error, ...argsWithNextExec) => {
        running--;
        queueing(null, error, ...argsWithNextExec);
    };
    queueing = (toExec, errorPassed, ...otherArgs) => {
        if (running >= future && isFunc(toExec)) return queue.push(toExec);

        if (running >= future) return;

        if (!isFunc(toExec)) toExec = queue.shift();

        if (!isFunc(toExec)) return;

        process.nextTick(toExec, next, errorPassed, ...extraArgs, ...otherArgs);
        running++;
    };
    arrayToListen._$push = arrayToListen.push;
    arrayToListen.push = function(...args) {
        args.forEach((exec) => queueing(exec));
        return arrayToListen._$push(...args);
    };
    arrayToListen.forEach((exec) => queueing(exec));

    return arrayToListen;
};
