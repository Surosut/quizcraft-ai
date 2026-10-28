import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateQuiz(apiKey, notesText, numQuestions, difficulty) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Please enter your Gemini API key in settings or on the create page.');
  }
  if (!notesText || notesText.trim().length < 30) {
    throw new Error('Please provide at least a few sentences of notes for the AI to generate meaningful questions.');
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim());
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are a quiz generator. Based on the following notes, generate exactly ${numQuestions} ${difficulty.toLowerCase()} multiple-choice questions.

Each question should:
- Test understanding of the material, not just memorization
- Have exactly 4 answer options
- Have only ONE correct answer
- Include a brief explanation for the correct answer
- Be clear, unambiguous, and well-written

Return ONLY a valid JSON array (no markdown, no code fences, no extra text) with this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Brief explanation of why this is correct"
  }
]

The correctAnswer field is the 0-based index of the correct option.

Notes:
${notesText}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // Clean up the response — strip markdown fences if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  let questions;
  try {
    questions = JSON.parse(cleaned);
  } catch {
    throw new Error('The AI returned an invalid response. Please try again.');
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('The AI did not generate any questions. Please try again with more detailed notes.');
  }

  // Validate each question
  const validQuestions = questions.filter(
    (q) =>
      q.question &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      typeof q.correctAnswer === 'number' &&
      q.correctAnswer >= 0 &&
      q.correctAnswer <= 3
  );

  if (validQuestions.length === 0) {
    throw new Error('Generated questions were malformed. Please try again.');
  }

  return validQuestions;
}
