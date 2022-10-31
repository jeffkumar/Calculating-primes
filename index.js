// Import stylesheets
import './style.css';
import { calculatePrimes } from './primes.js';
const cp = calculatePrimes.toString().replace(/^function .+\{?|\}$/g, '');
// Write Javascript code!
const appDiv = document.getElementById('app');

const workerBlob = new Blob([cp], { type: 'text/javascript' });
const url = URL.createObjectURL(workerBlob);
const worker = new Worker(url);

let start = Date.now();
let interval = setInterval(() => {
  document.getElementById('time').innerHTML = (Date.now() - start) / 1000;
}, 1);

worker.addEventListener('message', (e) => {
  appDiv.innerHTML = 'Painting...';
  setTimeout(() => (appDiv.innerHTML = e.data.map((n) => ' ' + n)), 100);
  clearInterval(interval);
});

worker.postMessage({ msg: 'start', limit: 20000000 });
