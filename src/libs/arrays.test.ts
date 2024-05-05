import { arrayUnique } from './arrays';

test('empty', () => {
  expect(arrayUnique([])).toEqual([]);
  expect(arrayUnique([1])).toEqual([1]);
  expect(arrayUnique([[1], []])).toEqual([1]);
  expect(arrayUnique([[1], 1])).toEqual([1]);
});

test('no duplicates', () => {
  expect(arrayUnique([[1, 2, 3]])).toEqual([1, 2, 3]);
  expect(
    arrayUnique([
      [1, 2, 3],
      [4, 5],
    ]),
  ).toEqual([1, 2, 3, 4, 5]);
});

test('duplicates', () => {
  expect(
    arrayUnique([
      [1, 2, 3],
      [1, 2, 3],
    ]),
  ).toEqual([1, 2, 3]);
  expect(
    arrayUnique([
      [1, 2, 3],
      [1, 5],
    ]),
  ).toEqual([1, 2, 3, 5]);
});
