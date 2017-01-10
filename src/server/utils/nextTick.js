const thenableNextTick = new Promise(resolve => {
    process.nextTick(() => {
        resolve();
    });
});

module.exports = thenableNextTick;