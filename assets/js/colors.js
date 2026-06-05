const colorMap = {
  green: "#64d583",
  blue: "#91a8f9",
  orange: "#ee955e",
  pink: "#ee92d7",
  purple: "#aa8ef0",
  yellow: "#f5d770",
  default: "#64d583",
};

/**
 * Converts a color name into its hexadecimal color value.
 *
 * @param {string} colorName - The name of the color to convert.
 * @returns {string} The matching hexadecimal color value, or the default color.
 */
function stringToHex(colorName) {
  const color = colorMap[colorName];

  return color || colorMap.default;
}

/**
 * Converts a hexadecimal color value into its matching color name.
 *
 * @param {string} hexValue - The hexadecimal color value to convert.
 * @returns {string|null} The matching color name, or null if no match is found.
 */
function hexToString(hexValue) {
  const colorString = Object.keys(colorMap).find((key) => {
    return colorMap[key] === hexValue;
  });

  return colorString || null;
}

/**
 * Removes all color modifier classes from an element.
 *
 * @param {HTMLElement} element - The element whose color classes should be removed.
 * @returns {void}
 */
function removeColorClasses(element) {
  [...element.classList].forEach((cls) => {
    if (cls.includes("_color_")) {
      element.classList.remove(cls);
    }
  });
}

export { stringToHex, hexToString, removeColorClasses };