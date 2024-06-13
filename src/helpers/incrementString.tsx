/**
 * Increments the numeric part of a string by 1.
 * @param {string} string - The input string containing the numeric part to increment.
 * @returns {string} The new string with the incremented numeric part.
 * 
 * The function performs the following steps:
 * 1. Converts the input to a string (in case it isn't already).
 * 2. Extracts the numeric part of the string. If no numeric part is found, defaults to "0".
 * 3. Stores the length of the numeric part.
 * 4. Increments the numeric part by 1.
 * 5. Pads the incremented numeric part with leading zeros to maintain its original length.
 * 6. Replaces the old numeric part in the original string with the new incremented numeric part.
 */
const incrementString = (string: string): string => {
  const str = string.toString();
  let number = str.match(/\d+/) === null ? "0" : str.match(/\d+/)?.[0] || "";
  const numberLength = number.length;
  number = (parseInt(number) + 1).toString();
  while (number.length < numberLength) {
    number = "0" + number;
  }
  return str.replace(/\d+/g, "").concat(number);
};

export default incrementString;
