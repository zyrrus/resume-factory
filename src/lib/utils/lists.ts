/**
 * Inserts an element between each pair of items in the original array
 * @param array
 * @param element The element to intersperse between the items of the array
 */
export const intersperse = <T>(array: T[], element: T): T[] => {
  const result: T[] = [];

  array.forEach((item, index) => {
    if (index > 0) {
      result.push(element);
    }
    result.push(item);
  });

  return result;
};
