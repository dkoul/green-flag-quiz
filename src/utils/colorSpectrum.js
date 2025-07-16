/**
 * Convert percentage to color from red (0%) to green (100%)
 * Based on the algorithm from https://gist.github.com/mlocati/7210513
 * @param {number} perc - Percentage (0-100)
 * @returns {string} Hex color code
 */
export const perc2color = (perc) => {
  // Ensure percentage is within bounds
  const clampedPerc = Math.max(0, Math.min(100, perc));
  
  let r, g, b = 0;
  
  if (clampedPerc < 50) {
    r = 255;
    g = Math.round(5.1 * clampedPerc);
  } else {
    g = 255;
    r = Math.round(510 - 5.10 * clampedPerc);
  }
  
  const h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
};

/**
 * Get color for score based on percentage
 * @param {number} score - The score value
 * @param {number} maxScore - Maximum possible score
 * @returns {string} Hex color code
 */
export const getColorForScore = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  return perc2color(percentage);
};

/**
 * Get RGB values from hex color
 * @param {string} hex - Hex color code
 * @returns {Object} RGB values
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Convert RGB to hex
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} Hex color code
 */
export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Get color with alpha (transparency)
 * @param {string} hex - Hex color code
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} RGBA color string
 */
export const getColorWithAlpha = (hex, alpha = 1) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

/**
 * Get a lighter version of the color
 * @param {string} hex - Hex color code
 * @param {number} amount - Amount to lighten (0-1)
 * @returns {string} Lighter hex color
 */
export const lightenColor = (hex, amount) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount));
  
  return rgbToHex(r, g, b);
};

/**
 * Get a darker version of the color
 * @param {string} hex - Hex color code
 * @param {number} amount - Amount to darken (0-1)
 * @returns {string} Darker hex color
 */
export const darkenColor = (hex, amount) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.max(0, Math.round(rgb.r * (1 - amount)));
  const g = Math.max(0, Math.round(rgb.g * (1 - amount)));
  const b = Math.max(0, Math.round(rgb.b * (1 - amount)));
  
  return rgbToHex(r, g, b);
};

/**
 * Get predefined colors for different flag types
 * @param {string} flagType - Type of flag (greenFlag, yellowFlag, redFlag)
 * @returns {Object} Color object with various shades
 */
export const getFlagColors = (flagType) => {
  const baseColors = {
    greenFlag: '#22C55E',    // Green-500
    yellowFlag: '#EAB308',   // Yellow-500
    redFlag: '#EF4444'       // Red-500
  };
  
  const baseColor = baseColors[flagType] || baseColors.redFlag;
  
  return {
    primary: baseColor,
    light: lightenColor(baseColor, 0.3),
    lighter: lightenColor(baseColor, 0.6),
    dark: darkenColor(baseColor, 0.2),
    darker: darkenColor(baseColor, 0.4),
    alpha: (alpha) => getColorWithAlpha(baseColor, alpha)
  };
};

/**
 * Create a gradient string for CSS
 * @param {string} color1 - First color
 * @param {string} color2 - Second color
 * @param {string} direction - Gradient direction (default: 'to right')
 * @returns {string} CSS gradient string
 */
export const createGradient = (color1, color2, direction = 'to right') => {
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
};

/**
 * Get color for text based on background color (for contrast)
 * @param {string} backgroundColor - Background color hex
 * @returns {string} Text color (white or black)
 */
export const getTextColorForBackground = (backgroundColor) => {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return '#000000';
  
  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export default {
  perc2color,
  getColorForScore,
  hexToRgb,
  rgbToHex,
  getColorWithAlpha,
  lightenColor,
  darkenColor,
  getFlagColors,
  createGradient,
  getTextColorForBackground
}; 