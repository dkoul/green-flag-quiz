// Green Flag Quiz Questions - Friend Assessment Focus
export const quizQuestions = [
  {
    id: 1,
    question: "{friendName} texts you at 3 AM with 'EMERGENCY!' and it's about...",
    options: [
      { text: "A genuine crisis that needs immediate help", points: 5 },
      { text: "Drama about their crush not texting back", points: 2 },
      { text: "They're drunk and want to order pizza together", points: 4 },
      { text: "They found a spider and need emotional support", points: 3 }
    ],
    category: "crisis_response"
  },
  {
    id: 2,
    question: "When {friendName} posts a questionable outfit on Instagram, they usually...",
    options: [
      { text: "Own it confidently and respond to comments with humor", points: 5 },
      { text: "Get defensive and start drama in the comments", points: 2 },
      { text: "Delete it after a few hours when they realize", points: 3 },
      { text: "Leave it up but clearly feel embarrassed", points: 4 }
    ],
    category: "social_media"
  },
  {
    id: 3,
    question: "When you ask {friendName} to help you move this weekend, they...",
    options: [
      { text: "Show up early with coffee, snacks, and their best attitude", points: 5 },
      { text: "Agree but complain the entire time about their back", points: 2 },
      { text: "Suddenly remember they have other plans", points: 1 },
      { text: "Offer to pay for pizza and movers instead", points: 3 }
    ],
    category: "support"
  },
  {
    id: 4,
    question: "If your ex slid into {friendName}'s DMs, they would...",
    options: [
      { text: "Screenshot immediately and send it to you", points: 5 },
      { text: "Ignore it and never speak of it", points: 4 },
      { text: "Tell you about it but admit they responded 'for research'", points: 2 },
      { text: "Actually consider it because your ex is kind of cute", points: 1 }
    ],
    category: "loyalty"
  },
  {
    id: 5,
    question: "At parties, {friendName} usually...",
    options: [
      { text: "Makes sure everyone feels included and has a good time", points: 5 },
      { text: "Tells the same embarrassing stories about you every time", points: 2 },
      { text: "Is the life of the party but sometimes goes too far", points: 3 },
      { text: "Starts drama or gets into arguments with people", points: 1 }
    ],
    category: "social_behavior"
  },
  {
    id: 6,
    question: "When {friendName} asks for your honest opinion about their terrible haircut...",
    options: [
      { text: "They genuinely want the truth and can handle it maturely", points: 5 },
      { text: "They want honesty but will sulk if you're not positive", points: 3 },
      { text: "They're clearly fishing for compliments and want you to lie", points: 2 },
      { text: "They ask but then get angry when you're honest", points: 1 }
    ],
    category: "honesty"
  }
];

// Total possible points: 30 (6 questions × 5 max points)
export const SCORING_CONFIG = {
  totalQuestions: 6,
  maxPointsPerQuestion: 5,
  totalPossiblePoints: 30,
  thresholds: {
    greenFlag: 21,    // 70% and above
    yellowFlag: 13,   // 43% to 69%
    redFlag: 12       // 42% and below
  }
};

// Response messages based on score ranges - now about the friend
export const RESULT_MESSAGES = {
  greenFlag: {
    titles: [
      "{friendName} is a Green Flag Legend! 🌟",
      "{friendName} - Ultimate Friend Goals! 💚",
      "{friendName} is the Friend Everyone Deserves! ✨"
    ],
    descriptions: [
      "{friendName} is the friend who brings snacks to a crisis, handles drama maturely, and would help you move without complaining. They're a keeper!",
      "{friendName} has mastered the art of being supportive, loyal, and just the right amount of fun. You're lucky to have them!",
      "{friendName} is like the golden retriever of friendship - loyal, supportive, and always ready for an adventure. Treasure this friendship!"
    ]
  },
  yellowFlag: {
    titles: [
      "{friendName} is a Yellow Flag - Proceed with Caution! 💛",
      "{friendName} Gives Mixed Signals! 🤔",
      "{friendName} is a Loveable Mess! 😅"
    ],
    descriptions: [
      "{friendName} means well but sometimes misses the mark. They'd help you move but complain about their back for weeks. Still loveable though!",
      "{friendName} is great in small doses. They care about you, but sometimes their approach is... unique. They're working on it!",
      "{friendName} isn't quite red flag territory, but they've got some questionable friendship habits. Maybe gently guide them toward better choices!"
    ]
  },
  redFlag: {
    titles: [
      "Yikes... {friendName} is a Red Flag! 🚩",
      "Houston, We Have a Problem with {friendName}! 🚨",
      "{friendName} is the Chaotic Friend! 💥"
    ],
    descriptions: [
      "{friendName} is the friend who would steal your fries and then ask why you're being dramatic. You might need to have a serious conversation!",
      "{friendName} gives main character energy in everyone else's story. Maybe it's time they learn what 'supporting role' means?",
      "{friendName} is the friend people complain about in group chats. They're memorable, but not always for the right reasons!"
    ]
  }
};

export default quizQuestions; 