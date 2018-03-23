# nexting-queue
module to queueing a array of functions


# Install

```bash
npm install --save nexting-queue
```

# Usage

```js
let counter = 0;
const promise1 = (next, error, param) => {
    counter++;
    assert(param === 'test');
    new Promise((resolve) => setTimeout(resolve, 50))
        .then((res) => next(null, res));
};
const promise2 = (next, error, param) => {
    counter++;
    assert(param === 'test');
};
const promise3 = (next, error, param) => {
    counter++;
    assert(param === 'test');
    new Promise((resolve) => setTimeout(resolve, 500))
        .then(() => {
            assert(counter === 4);
            done();
        });
};
const promise4 = (next, error, param) => {
    counter++;
    assert(param === 'test');
};
const queue = queueNext([], 3, 'test');

queue.push(promise1, promise2, promise3, promise4);
```

# API nextingQueue(array=[], future=1, [... otherArgs])-> arrayWithPushOverWritten

Every function is exec with next function, error pass by before function executed, otherArgs passed to nextingQueue and extraArgs passed to next in before called.

exec(next, error, ... otherArgs, ... extraArgs)

# next(error, extraArgs)
nextingQueue check for exec at most future functions.

## arrayWithPushOverWritten

arrayWithPushOverWritten has the push method over written to catch every push to queue the function pushed.

