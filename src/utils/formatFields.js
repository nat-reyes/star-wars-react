/**
 * Upper case first letter
 * @param string
 * @returns {string}
 */
export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Convert meters to cm
 * @param cm
 * @returns {`${number} cm`|`${string} m`}
 */
export const metersToCm = (cm) => {
  const parsedCm = parseInt(cm, 10);
  if (parsedCm > 99) {
    const fixedValue = (parsedCm * 0.01).toFixed(2);
    return `${fixedValue} m`;
  }
  return `${parsedCm} cm`;
};
