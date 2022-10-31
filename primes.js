// Sieve of Erosthenes
export function calculatePrimes(n) {
  self.onmessage = function (e) {
    const n = e.data.limit;
    let primes = [...Array(n).keys()].map((n) => {
      return { prime: true, number: n };
    });

    for (let i = 2; i < Math.sqrt(n); i++) {
      for (let j = i; i * j < n; j++) {
        primes[j * i].prime = false;
      }
    }

    const result = primes
      .slice(2)
      .filter((n) => n.prime)
      .map((n) => n.number);
    self.postMessage(result);
  };
}
