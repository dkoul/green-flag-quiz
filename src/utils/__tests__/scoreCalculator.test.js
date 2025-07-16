import { calculateScore, getResultMessage, validateAnswers } from '../scoreCalculator.js';

describe('Score Calculator', () => {
  test('calculates correct score from answers', () => {
    const answers = [
      { points: 3 },
      { points: 4 },
      { points: 5 },
      { points: 2 },
      { points: 4 },
      { points: 5 }
    ];
    
    const result = calculateScore(answers);
    expect(result.totalScore).toBe(23);
    expect(result.percentage).toBe(77);
    expect(result.maxPossible).toBe(30);
    expect(result.questionCount).toBe(6);
  });

  test('determines green flag for high scores', () => {
    const answers = [
      { points: 5 },
      { points: 5 },
      { points: 5 },
      { points: 5 },
      { points: 5 },
      { points: 5 }
    ];
    
    const result = calculateScore(answers);
    expect(result.flag).toBe('greenFlag');
    expect(result.totalScore).toBe(30);
    expect(result.percentage).toBe(100);
  });

  test('determines red flag for low scores', () => {
    const answers = [
      { points: 1 },
      { points: 1 },
      { points: 2 },
      { points: 2 },
      { points: 2 },
      { points: 2 }
    ];
    
    const result = calculateScore(answers);
    expect(result.flag).toBe('redFlag');
    expect(result.totalScore).toBe(10);
    expect(result.percentage).toBe(33);
  });

  test('determines yellow flag for medium scores', () => {
    const answers = [
      { points: 3 },
      { points: 3 },
      { points: 3 },
      { points: 3 },
      { points: 3 },
      { points: 3 }
    ];
    
    const result = calculateScore(answers);
    expect(result.flag).toBe('yellowFlag');
    expect(result.totalScore).toBe(18);
    expect(result.percentage).toBe(60);
  });

  test('handles empty answers array', () => {
    const result = calculateScore([]);
    expect(result.totalScore).toBe(0);
    expect(result.percentage).toBe(0);
    expect(result.flag).toBe('redFlag');
  });

  test('validates answers correctly', () => {
    const validAnswers = [
      { points: 3 },
      { points: 4 },
      { points: 5 },
      { points: 2 },
      { points: 4 },
      { points: 1 }
    ];
    
    expect(validateAnswers(validAnswers)).toBe(true);
    expect(validateAnswers([])).toBe(false);
    expect(validateAnswers([{ points: 3 }])).toBe(false); // Wrong length
    expect(validateAnswers([{ points: 6 }])).toBe(false); // Points too high
  });

  test('gets result message for each flag type', () => {
    const greenMessage = getResultMessage('greenFlag');
    expect(greenMessage.title).toBeDefined();
    expect(greenMessage.description).toBeDefined();
    expect(typeof greenMessage.title).toBe('string');
    expect(typeof greenMessage.description).toBe('string');
    expect(greenMessage.title.length).toBeGreaterThan(0);
    expect(greenMessage.description.length).toBeGreaterThan(0);
    
    const redMessage = getResultMessage('redFlag');
    expect(redMessage.title).toBeDefined();
    expect(redMessage.description).toBeDefined();
    expect(typeof redMessage.title).toBe('string');
    expect(typeof redMessage.description).toBe('string');
    expect(redMessage.title.length).toBeGreaterThan(0);
    expect(redMessage.description.length).toBeGreaterThan(0);
    
    const yellowMessage = getResultMessage('yellowFlag');
    expect(yellowMessage.title).toBeDefined();
    expect(yellowMessage.description).toBeDefined();
    expect(typeof yellowMessage.title).toBe('string');
    expect(typeof yellowMessage.description).toBe('string');
    expect(yellowMessage.title.length).toBeGreaterThan(0);
    expect(yellowMessage.description.length).toBeGreaterThan(0);
  });
}); 