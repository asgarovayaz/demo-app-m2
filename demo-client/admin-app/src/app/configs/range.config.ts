export function rangeObject(start: number, end: number): number[] {
  const rangeArray: number[] = [];

  for (let index = start; index < end; index++) {
    rangeArray.push(index);
  }
  rangeArray.reverse();
  return rangeArray;
}
