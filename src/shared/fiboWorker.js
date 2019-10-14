const {
    Worker, isMainThread, parentPort, workerData
  } = require('worker_threads');
  
  if (isMainThread) {
    module.exports = function calculateFibo(num) {
      return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, {
          workerData: num
        });
        const workerThreadId = worker.threadId;

        console.log(`Worker ${workerThreadId} has been created.`);

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
          console.log(`Worker ${workerThreadId} stopped with exit code ${code}`);
        });
      });
    };
  } else {
    const calculateFibo = require('./calculateFibo')

    const fibo = calculateFibo(workerData);

    parentPort.postMessage(fibo);
  }
  