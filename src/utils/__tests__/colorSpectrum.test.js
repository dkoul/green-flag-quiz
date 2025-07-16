import { perc2color, getColorForScore, hexToRgb, rgbToHex } from '../colorSpectrum.js';

describe('Color Spectrum', () => {
  test('returns red for 0% score', () => {
    expect(perc2color(0)).toBe('#ff0000');
  });

  test('returns green for 100% score', () => {
    expect(perc2color(100)).toBe('#00ff00');
  });

  test('returns yellow for 50% score', () => {
    const color = perc2color(50);
    expect(color).toBe('#ffff00');
  });

  test('handles edge cases for percentage bounds', () => {
    expect(perc2color(-10)).toBe('#ff0000'); // Should clamp to 0
    expect(perc2color(110)).toBe('#00ff00'); // Should clamp to 100
  });

  test('getColorForScore works correctly', () => {
    const color1 = getColorForScore(0, 30);
    expect(color1).toBe('#ff0000');
    
    const color2 = getColorForScore(30, 30);
    expect(color2).toBe('#00ff00');
    
    const color3 = getColorForScore(15, 30);
    expect(color3).toBe('#ffff00');
  });

  test('hexToRgb converts hex to RGB correctly', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('invalid')).toBeNull();
  });

  test('rgbToHex converts RGB to hex correctly', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
  });

  test('color spectrum progression is smooth', () => {
    const colors = [];
    for (let i = 0; i <= 100; i += 10) {
      colors.push(perc2color(i));
    }
    
    // Check that we get different colors
    expect(colors[0]).not.toBe(colors[5]);
    expect(colors[5]).not.toBe(colors[10]);
    
    // Check that all colors are valid hex (case insensitive)
    colors.forEach(color => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });
  });
}); 