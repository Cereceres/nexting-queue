
const isFunc = (exec) => typeof exec === 'function';


module.exports = (arrayToListen = [], future = 1, ...extraArgs) => {
    future = future || 1;
    arrayToListen = arrayToListen || [];
    let running = 0;
    const queue = [];
    let queueing = null;
    const next = (error, ...argsWithNextExec) => {
        console.log(' argsWithNextExec ', argsWithNextExec);
        console.log('runnnig ', running);
        running--;
        queueing(null, error, ...argsWithNextExec);
    };
    queueing = (toExec, errorPassed, ...otherArgs) => {
        console.log('################## queueing #################3');
        console.log('otherArgs ', otherArgs);
        console.log('queue ', queue.length);
        if (running >= future && isFunc(toExec)) return queue.push(toExec);
        console.log('ejecutando ya%%%%%%%%%%%%%%%%%%%%%%');
        if (running >= future) return;

        if (!isFunc(toExec)) toExec = queue.shift();

        if (!isFunc(toExec)) return;

        try {
            console.log('toExec ', toExec);
            process.nextTick(toExec, next, errorPassed, ...extraArgs, ...otherArgs);
            running++;
            console.log('runnnig =====', running);
        } catch (error) {
            return next(error);
        }
    };
    arrayToListen._$push = arrayToListen.push;
    arrayToListen.push = function(...args) {
        args.forEach((exec) => queueing(exec));
        return arrayToListen._$push(...args);
    };
    arrayToListen.forEach((exec) => queueing(exec));

    return arrayToListen;
};
