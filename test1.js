// Ping Pong
for (let i = 1; i <= 100; i++) {
  let string = '';
  if (i % 3 && i % 5) {
    string = i;
  } else {
    if (i % 3 === 0) {
      string += 'ping';
    }
    if (i % 5 === 0) {
      string += 'pong';
    }
  }
  console.log(string);
}

// Numbers Squared
function numbersSquared(n) {
  for (let i = 1; i <= n; i++) {
    let string = '';
    if (i === 1 || i === n) {
      string = Array(n + 1).join(n);
    } else {
      string = `${n}${Array(n - 1).join(' ')}${n}`;
    }
    console.log(string);
  }
}

numbersSquared(7);

// Numbers Sorted
function sortArray(array) {
  let done = false;
  let sortedArr = [...array];
  while (!done) {
    done = true;
    for (let i = 1; i < sortedArr.length; i += 1) {
      if (sortedArr[i - 1] > sortedArr[i]) {
        done = false;
        [sortedArr[i - 1], sortedArr[i]] = [sortedArr[i], sortedArr[i - 1]];
      }
    }
  }

  return sortedArr;
}

const unsorted = [7, 2, 6, 1, 8, 4, 5];
const sorted = sortArray(unsorted);
console.log(sorted);
