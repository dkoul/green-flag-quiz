import { SCORING_CONFIG, RESULT_MESSAGES } from '../data/questions.js';

/**
 * Calculate the total score from user answers
 * @param {Array} answers - Array of selected answer objects with points
 * @returns {Object} Score result with total, percentage, and flag type
 */
export const calculateScore = (answers) => {
  if (!answers || answers.length === 0) {
    return {
      totalScore: 0,
      percentage: 0,
      flag: 'redFlag',
      message: 'No answers provided'
    };
  }

  // Calculate total score
  const totalScore = answers.reduce((sum, answer) => {
    return sum + (answer?.points || 0);
  }, 0);

  // Calculate percentage
  const percentage = Math.round((totalScore / SCORING_CONFIG.totalPossiblePoints) * 100);

  // Determine flag type
  let flagType;
  if (totalScore >= SCORING_CONFIG.thresholds.greenFlag) {
    flagType = 'greenFlag';
  } else if (totalScore >= SCORING_CONFIG.thresholds.yellowFlag) {
    flagType = 'yellowFlag';
  } else {
    flagType = 'redFlag';
  }

  return {
    totalScore,
    percentage,
    flag: flagType,
    maxPossible: SCORING_CONFIG.totalPossiblePoints,
    questionCount: SCORING_CONFIG.totalQuestions
  };
};

/**
 * Get result message based on flag type
 * @param {string} flagType - The flag type (greenFlag, yellowFlag, redFlag)
 * @returns {Object} Result message with title and description
 */
export const getResultMessage = (flagType) => {
  const messages = RESULT_MESSAGES[flagType];
  if (!messages) {
    return {
      title: "Unknown Result",
      description: "Something went wrong with your score calculation!"
    };
  }

  // Randomly select a title and description for variety
  const randomTitle = messages.titles[Math.floor(Math.random() * messages.titles.length)];
  const randomDescription = messages.descriptions[Math.floor(Math.random() * messages.descriptions.length)];

  return {
    title: randomTitle,
    description: randomDescription
  };
};

/**
 * Generate share text for social media
 * @param {Object} result - Score result object
 * @param {string} friendName - Name of the friend being assessed
 * @returns {string} Share text
 */
export const generateShareText = (result, friendName = 'My Friend') => {
  const { flag, percentage } = result;
  const flagEmoji = {
    greenFlag: '🟢',
    yellowFlag: '🟡',
    redFlag: '🔴'
  };

  const flagName = {
    greenFlag: 'Green Flag',
    yellowFlag: 'Yellow Flag',
    redFlag: 'Red Flag'
  };

  return `I just assessed ${friendName} in the Green Flag Quiz and they're a ${flagName[flag]} friend! ${flagEmoji[flag]} (${percentage}% friend score) 
  
Take the quiz and see what kind of friend YOUR friends are! 👫 #GreenFlagQuiz #FriendshipGoals`;
};

/**
 * Validate answers array
 * @param {Array} answers - Array of answer objects
 * @returns {boolean} True if valid
 */
export const validateAnswers = (answers) => {
  if (!Array.isArray(answers)) return false;
  if (answers.length !== SCORING_CONFIG.totalQuestions) return false;
  
  return answers.every(answer => {
    return answer && 
           typeof answer.points === 'number' && 
           answer.points >= 1 && 
           answer.points <= SCORING_CONFIG.maxPointsPerQuestion;
  });
};

/**
 * Get detailed score breakdown
 * @param {Array} answers - Array of answer objects with category info
 * @returns {Object} Detailed breakdown by category
 */
export const getScoreBreakdown = (answers) => {
  const breakdown = {};
  
  answers.forEach((answer, index) => {
    const category = answer.category || `question_${index + 1}`;
    if (!breakdown[category]) {
      breakdown[category] = {
        score: 0,
        maxPossible: SCORING_CONFIG.maxPointsPerQuestion,
        questions: 0
      };
    }
    
    breakdown[category].score += answer.points;
    breakdown[category].questions += 1;
  });

  // Calculate percentage for each category
  Object.keys(breakdown).forEach(category => {
    const categoryData = breakdown[category];
    categoryData.percentage = Math.round((categoryData.score / categoryData.maxPossible) * 100);
  });

  return breakdown;
};

export default {
  calculateScore,
  getResultMessage,
  generateShareText,
  validateAnswers,
  getScoreBreakdown
}; 