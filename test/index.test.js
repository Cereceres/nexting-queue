const queueNext = require('../index');

const assert = require('assert');


describe('description', () => {
    it('should catch the exec from push method', (done) => {
        let counter = 0;
        const promise1 = (next, error, param) => {
            counter++;
            assert(param === 'test');
            new Promise((resolve) => setTimeout(resolve, 100, 'promise1'))
                .then((res) => next(null, res));
        };
        const promise2 = (next, error, param, other) => {
            counter++;
            assert(param === 'test');
            assert(other === 'promise1');
            new Promise((resolve) => setTimeout(resolve, 100, 'promise2'))
                .then((res) => next(null, res));
        };
        const promise3 = (next, error, param, other) => {
            counter++;
            assert(param === 'test');
            assert(other === 'promise2');
            new Promise((resolve) => setTimeout(resolve, 100, 'promise3'))
                .then((res) => next(null, res));
        };
        const promise4 = (next, error, param, other) => {
            counter++;
            assert(param === 'test');
            assert(other === 'promise3');
            new Promise((resolve) => setTimeout(resolve, 100))
                .then(next)
                .then(() => {
                    assert(counter === 4);
                    done();
                });
        };
        const queue = queueNext([], 1, 'test');

        queue.push(promise1, promise2, promise3, promise4);
    });

    it('should get the exec from array given', (done) => {
        let counter = 0;
        const promise1 = (next, error, param) => {
            counter++;
            assert(param === 'test');
            new Promise((resolve) => setTimeout(resolve, 100, 'promise1'))
                .then((res) => next(null, res));
        };
        const promise2 = (next, error, param) => {
            counter++;
            assert(param === 'test');
            new Promise((resolve) => setTimeout(resolve, 200, 'promise1'))
                .then((res) => next(null, res));
        };
        const promise3 = (next, error, param) => {
            counter++;
            assert(param === 'test');
            new Promise((resolve) => setTimeout(resolve, 500, 'promise1'))
                .then(() => {
                    assert(counter === 4);
                    done();
                });
        };
        const promise4 = (next, error, param) => {
            counter++;
            assert(param === 'test');
        };
        const queue = queueNext([promise1, promise2, promise3, promise4], 2, 'test');

    });

    it('should get the exec from push method and only run the future given', (done) => {
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
    });
});
