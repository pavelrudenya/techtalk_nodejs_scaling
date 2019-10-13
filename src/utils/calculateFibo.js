module.exports = function calculateFibo(num) {
  if (num < 2)
    return 1;
  else return calculateFibo(num - 2) + calculateFibo(num - 1);
}