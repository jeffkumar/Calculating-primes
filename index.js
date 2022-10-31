// Import stylesheets
import './style.css';
import { calculatePrimes } from './primes.js';

// Write Javascript code!
const appDiv = document.getElementById('app');

const ps = calculatePrimes.toString().replace(/^function .+\{?|\}$/g, '');

const workerBlob = new Blob([ps], { type: 'text/javascript' });
const url = URL.createObjectURL(workerBlob);
const worker = new Worker(url);

worker.addEventListener('message', (e) => {
  appDiv.innerHTML = e.data.map((n) => ' ' + n);
});

worker.postMessage({ msg: 'start', limit: 20000000 });
