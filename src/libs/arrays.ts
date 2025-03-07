/* eslint-disable */
export function arrayUnique(array: any[]) {
  const a: any[] = [].concat(...array);
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
}

// See: https://jsperf.com/array-filter-unique/13
/** Filter an array to only contain unique items.
 * @argument selector Select what to compare on each given item. Defaults to the item itself.
 * @example
 * [1, 2, 1, 3].filter(arrayFilterUnique())
 * // returns [1, 2, 3]
 * @returns The actual filter function to be used with `array.filter(<here>)`.
 */
export function arrayFilterUnique<T>(selector: (i: T) => string | number = String): (element: T) => boolean {
  if (arguments.length > 1) {
    throw new Error(
      'array-filter-unique has to be called as a function like `array.filter(arrayFilterUnique(<optional arg>))`',
    );
  }

  const seen: Record<string | number, boolean> = {};
  return (element: T) => {
    const toBeSearched = selector(element);

    const isNew = !(toBeSearched in seen);
    seen[toBeSearched] = true;
    return isNew;
  };
}

export function flattenArray<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}
