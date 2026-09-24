import type { Question, TopicFrequency, AnalysisResult, Roadmap, PracticeQuestion, Paper } from '@/types';

export const demoPapers: Paper[] = [
  { id: 'p1', filename: 'KSEEB_Math10_2022.pdf', fileType: 'PDF', year: 2022, board: 'Karnataka State Board', classLevel: '10', subject: 'Mathematics', language: 'en', status: 'analyzed', isDemo: true },
  { id: 'p2', filename: 'KSEEB_Math10_2023.pdf', fileType: 'PDF', year: 2023, board: 'Karnataka State Board', classLevel: '10', subject: 'Mathematics', language: 'en', status: 'analyzed', isDemo: true },
  { id: 'p3', filename: 'KSEEB_Math10_2024.pdf', fileType: 'PDF', year: 2024, board: 'Karnataka State Board', classLevel: '10', subject: 'Mathematics', language: 'en', status: 'analyzed', isDemo: true },
];

const demoQuestions: Question[] = [
  { id: 'q1', year: 2022, question: 'Prove the trigonometric identity: sin²θ + cos²θ = 1', topic: 'Trigonometry', subtopic: 'Trigonometric Identities', marks: 5, type: 'Proof', difficulty: 'Medium' },
  { id: 'q2', year: 2022, question: 'If sin A = 3/5, find cos A and tan A without using trigonometric tables.', topic: 'Trigonometry', subtopic: 'Basic Ratios', marks: 4, type: 'Problem', difficulty: 'Easy' },
  { id: 'q3', year: 2022, question: 'A tower stands vertically on the ground. From a point on the ground 15m away, the angle of elevation is 60°. Find the height of the tower.', topic: 'Trigonometry', subtopic: 'Heights and Distances', marks: 5, type: 'Problem', difficulty: 'Medium' },
  { id: 'q4', year: 2023, question: 'Prove that (1 + tan²θ) / (1 + cot²θ) = (sin θ / cos θ)²', topic: 'Trigonometry', subtopic: 'Trigonometric Identities', marks: 5, type: 'Proof', difficulty: 'Hard' },
  { id: 'q5', year: 2023, question: 'The angle of elevation of the top of a building from a point on the ground is 30°. If the point is 20m away, find the height of the building.', topic: 'Trigonometry', subtopic: 'Heights and Distances', marks: 4, type: 'Problem', difficulty: 'Medium' },
  { id: 'q6', year: 2024, question: 'Prove the identity: cos²θ + cos²θ·tan²θ = 1', topic: 'Trigonometry', subtopic: 'Trigonometric Identities', marks: 5, type: 'Proof', difficulty: 'Medium' },
  { id: 'q7', year: 2024, question: 'From the top of a lighthouse, the angle of depression of a ship is 45°. If the lighthouse is 30m tall, find the distance of the ship from the foot of the lighthouse.', topic: 'Trigonometry', subtopic: 'Heights and Distances', marks: 5, type: 'Problem', difficulty: 'Medium' },
  { id: 'q8', year: 2024, question: 'Evaluate: sin 30° × cos 60° + cos 30° × sin 60°', topic: 'Trigonometry', subtopic: 'Basic Ratios', marks: 3, type: 'Problem', difficulty: 'Easy' },

  { id: 'q9', year: 2022, question: 'A die is thrown once. Find the probability of getting an even number.', topic: 'Probability', subtopic: 'Simple Probability', marks: 3, type: 'Problem', difficulty: 'Easy' },
  { id: 'q10', year: 2022, question: 'A bag contains 5 red and 3 blue balls. A ball is drawn at random. Find the probability of drawing a red ball.', topic: 'Probability', subtopic: 'Simple Probability', marks: 4, type: 'Problem', difficulty: 'Easy' },
  { id: 'q11', year: 2023, question: 'Two coins are tossed simultaneously. Find the probability of getting at least one head.', topic: 'Probability', subtopic: 'Compound Events', marks: 4, type: 'Problem', difficulty: 'Medium' },
  { id: 'q12', year: 2023, question: 'A card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting a king.', topic: 'Probability', subtopic: 'Simple Probability', marks: 3, type: 'Problem', difficulty: 'Easy' },

  { id: 'q13', year: 2022, question: 'If A = [[2, 3], [1, 4]] and B = [[1, 0], [2, 3]], find A + B and A × B.', topic: 'Matrices', subtopic: 'Matrix Operations', marks: 5, type: 'Problem', difficulty: 'Medium' },
  { id: 'q14', year: 2022, question: 'Find the determinant of the matrix [[3, 1], [2, 4]].', topic: 'Matrices', subtopic: 'Determinants', marks: 3, type: 'Problem', difficulty: 'Easy' },
  { id: 'q15', year: 2024, question: 'If A = [[1, 2], [3, 4]] and B = [[2, 0], [1, 3]], find (AB)ᵀ.', topic: 'Matrices', subtopic: 'Matrix Operations', marks: 5, type: 'Problem', difficulty: 'Hard' },
  { id: 'q16', year: 2024, question: 'Solve the system of equations using matrix method: x + 2y = 5, 3x - y = 4.', topic: 'Matrices', subtopic: 'Solving Equations', marks: 5, type: 'Problem', difficulty: 'Medium' },

  { id: 'q17', year: 2023, question: 'Find the mean of the following data: 10, 20, 30, 40, 50.', topic: 'Statistics', subtopic: 'Mean, Median, Mode', marks: 3, type: 'Problem', difficulty: 'Easy' },
  { id: 'q18', year: 2024, question: 'Draw a histogram for the given frequency distribution and find the modal class.', topic: 'Statistics', subtopic: 'Graphical Representation', marks: 4, type: 'Problem', difficulty: 'Medium' },

  { id: 'q19', year: 2022, question: 'Solve the quadratic equation: x² - 5x + 6 = 0 using the quadratic formula.', topic: 'Algebra', subtopic: 'Quadratic Equations', marks: 4, type: 'Problem', difficulty: 'Easy' },
  { id: 'q20', year: 2022, question: 'Find the roots of the equation 2x² + 3x - 5 = 0 by factorization.', topic: 'Algebra', subtopic: 'Quadratic Equations', marks: 4, type: 'Problem', difficulty: 'Medium' },
  { id: 'q21', year: 2023, question: 'Solve: x² + 7x + 12 = 0 by splitting the middle term.', topic: 'Algebra', subtopic: 'Quadratic Equations', marks: 4, type: 'Problem', difficulty: 'Easy' },
  { id: 'q22', year: 2024, question: 'The sum of two numbers is 15 and their product is 56. Find the numbers using quadratic equations.', topic: 'Algebra', subtopic: 'Quadratic Equations', marks: 5, type: 'Problem', difficulty: 'Medium' },

  { id: 'q23', year: 2022, question: 'Find the distance between the points A(3, 6) and B(9, 15) using the distance formula.', topic: 'Coordinate Geometry', subtopic: 'Distance Formula', marks: 3, type: 'Problem', difficulty: 'Easy' },
  { id: 'q24', year: 2024, question: 'Find the area of the triangle formed by the points (0, 0), (4, 0), and (0, 6).', topic: 'Coordinate Geometry', subtopic: 'Area of Triangle', marks: 4, type: 'Problem', difficulty: 'Medium' },
];

function buildTopicFrequency(questions: Question[], years: number[]): TopicFrequency[] {
  const topicMap = new Map<string, Question[]>();
  questions.forEach((q) => {
    if (!topicMap.has(q.topic)) topicMap.set(q.topic, []);
    topicMap.get(q.topic)!.push(q);
  });

  const topics: TopicFrequency[] = [];
  topicMap.forEach((qs, topic) => {
    const yearsFound = [...new Set(qs.map((q) => q.year))].sort();
    const frequency = yearsFound.length;
    const totalYears = years.length;
    const subtopics = [...new Set(qs.map((q) => q.subtopic))];
    let priority: 'HIGH' | 'MEDIUM' | 'LOW';
    if (frequency >= totalYears) priority = 'HIGH';
    else if (frequency >= Math.ceil(totalYears / 2)) priority = 'MEDIUM';
    else priority = 'LOW';
    topics.push({ topic, subtopics, yearsFound, frequency, totalYears, questionCount: qs.length, priority, questions: qs });
  });

  return topics.sort((a, b) => b.frequency - a.frequency || b.questionCount - a.questionCount);
}

export const demoYears = [2022, 2023, 2024];

export const demoTopics: TopicFrequency[] = buildTopicFrequency(demoQuestions, demoYears);

export const demoAnalysis: AnalysisResult = {
  id: 'demo-analysis',
  papersAnalyzed: 3,
  questionsAnalyzed: demoQuestions.length,
  topicsDetected: demoTopics.length,
  recurringTopics: demoTopics.filter((t) => t.frequency >= 2).length,
  historicalPriority: 87,
  years: demoYears,
  topics: demoTopics,
  questions: demoQuestions,
  isDemo: true,
  createdAt: new Date().toISOString(),
};

export const demoPracticeQuestions: PracticeQuestion[] = [
  { id: 'pq1', question: 'Prove that (1 - cos²θ) / sin θ = sin θ', topic: 'Trigonometry', marks: 5, difficulty: 'Medium', answer: 'LHS = (1 - cos²θ) / sin θ = sin²θ / sin θ = sin θ = RHS. Hence proved.' },
  { id: 'pq2', question: 'If tan θ = 5/12, find sin θ and cos θ.', topic: 'Trigonometry', marks: 4, difficulty: 'Easy', answer: 'tan θ = 5/12. Let opposite = 5, adjacent = 12. Hypotenuse = √(25+144) = 13. sin θ = 5/13, cos θ = 12/13.' },
  { id: 'pq3', question: 'A bag contains 4 white and 6 black balls. Two balls are drawn at random. Find the probability that both are white.', topic: 'Probability', marks: 4, difficulty: 'Medium', answer: 'P(both white) = (4C2)/(10C2) = 6/45 = 2/15.' },
  { id: 'pq4', question: 'A coin is tossed 3 times. Find the probability of getting exactly 2 heads.', topic: 'Probability', marks: 3, difficulty: 'Medium', answer: 'Total outcomes = 8. Favorable = {HHT, HTH, THH} = 3. P = 3/8.' },
  { id: 'pq5', question: 'If A = [[2, 1], [3, 2]], find A⁻¹ and verify AA⁻¹ = I.', topic: 'Matrices', marks: 5, difficulty: 'Hard', answer: 'det(A) = 4-3 = 1. A⁻¹ = (1/1)[[2, -1], [-3, 2]] = [[2, -1], [-3, 2]]. AA⁻¹ = [[4-3, -2+2], [6-6, -3+4]] = [[1,0],[0,1]] = I.' },
  { id: 'pq6', question: 'Find the determinant of [[5, 2], [1, 3]].', topic: 'Matrices', marks: 3, difficulty: 'Easy', answer: 'det = (5×3) - (2×1) = 15 - 2 = 13.' },
  { id: 'pq7', question: 'Find the median of: 12, 18, 6, 25, 15, 10, 20.', topic: 'Statistics', marks: 3, difficulty: 'Easy', answer: 'Sorted: 6, 10, 12, 15, 18, 20, 25. Median (middle value) = 15.' },
  { id: 'pq8', question: 'Solve: x² - 7x + 12 = 0 by factorization.', topic: 'Algebra', marks: 4, difficulty: 'Easy', answer: 'x² - 7x + 12 = (x-3)(x-4) = 0. x = 3 or x = 4.' },
  { id: 'pq9', question: 'Find the distance between P(-2, 3) and Q(4, 11).', topic: 'Coordinate Geometry', marks: 3, difficulty: 'Easy', answer: 'd = √((4-(-2))² + (11-3)²) = √(36 + 64) = √100 = 10 units.' },
  { id: 'pq10', question: 'Prove: sec θ (1 - sin θ)(sec θ + tan θ) = 1.', topic: 'Trigonometry', marks: 5, difficulty: 'Hard', answer: 'sec θ(1-sin θ)(sec θ+tan θ) = sec θ(sec θ + tan θ - sec θ sin θ - tan θ sin θ) = sec²θ + sec θ tan θ - sec θ tan θ - tan²θ = sec²θ - tan²θ = 1.' },
];

export const demoRoadmap: Roadmap = {
  id: 'demo-roadmap',
  analysisId: 'demo-analysis',
  totalDays: 7,
  completedDays: 0,
  isDemo: true,
  days: [
    { day: 1, title: 'Foundation', topic: 'Trigonometry', tasks: ['Review basic trigonometric ratios', 'Memorize important identities', 'Solve 5 previous-year questions on identities'], estimatedTime: '2.5 hours', practiceQuestions: [demoPracticeQuestions[0], demoPracticeQuestions[1]], completed: false },
    { day: 2, title: 'Advanced Trigonometry', topic: 'Trigonometry', tasks: ['Heights and distances problems', 'Practice elevation/depression questions', 'Solve 5 previous-year problems'], estimatedTime: '2.5 hours', practiceQuestions: [demoPracticeQuestions[9]], completed: false },
    { day: 3, title: 'Probability', topic: 'Probability', tasks: ['Simple probability concepts', 'Compound events and tree diagrams', 'Solve previous-year probability questions'], estimatedTime: '2 hours', practiceQuestions: [demoPracticeQuestions[2], demoPracticeQuestions[3]], completed: false },
    { day: 4, title: 'Matrices', topic: 'Matrices', tasks: ['Matrix operations review', 'Determinants and inverse', 'Solve previous-year matrix problems'], estimatedTime: '2 hours', practiceQuestions: [demoPracticeQuestions[4], demoPracticeQuestions[5]], completed: false },
    { day: 5, title: 'Statistics & Algebra', topic: 'Statistics & Algebra', tasks: ['Mean, median, mode problems', 'Quadratic equations practice', 'Graphical representation'], estimatedTime: '2.5 hours', practiceQuestions: [demoPracticeQuestions[6], demoPracticeQuestions[7]], completed: false },
    { day: 6, title: 'Mixed Revision', topic: 'All Topics', tasks: ['Revise all high-priority topics', 'Review formulas and identities', 'Practice mixed question set'], estimatedTime: '3 hours', practiceQuestions: [demoPracticeQuestions[8], demoPracticeQuestions[9]], completed: false },
    { day: 7, title: 'AI Practice Test', topic: 'Full Test', tasks: ['Complete practice test on all topics', 'Review weak areas', 'Final revision of roadmap'], estimatedTime: '3 hours', practiceQuestions: demoPracticeQuestions.slice(0, 5), completed: false },
  ],
};
