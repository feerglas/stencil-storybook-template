const format = (first: string, middle: string, last: string): string => {
  const firstValue = first || '';
  const middleValue = middle
    ? ` ${middle}`
    : '';

  const lastValue = last
    ? ` ${last}`
    : '';

  return firstValue + middleValue + lastValue;
};

export default format;
