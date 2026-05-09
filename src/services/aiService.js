// ============================================
// GROQ AI SERVICE
// FREE + UNLIMITED + FASTEST AI API
// ============================================

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// ============================================
// AI PROMPTS
// ============================================
const AI_PROMPTS = {
  summarize:
    "Summarize the following note in exactly 3 clear bullet points. Use • for bullets. Be concise:",

  improve:
    "Improve the grammar, clarity, and flow of this text. Return only the improved version, no explanations:",

  explain:
    "Explain this content in very simple terms that a beginner can understand. Be friendly and clear:",

  expand:
    "Expand this note with more detail, examples, and useful information. Keep the same topic and tone:",

  translate: (lang) =>
    `Translate the following text to ${lang}. Return only the translation, nothing else:`,
};

// ============================================
// MAIN AI FUNCTION
// ============================================
export async function runAIAction(action, content, extra = {}) {
  
  // Check content
  if (!content || content.trim() === "") {
    throw new Error("Note is empty. Please write something first.");
  }

  // Check API key
  if (!API_KEY) {
    throw new Error("Please add your Groq API key to .env file");
  }

  // Build prompt
  let prompt;
  if (action === "translate") {
    const targetLang = extra.language || "Spanish";
    prompt = AI_PROMPTS.translate(targetLang);
  } else {
    prompt = AI_PROMPTS[action];
  }

  const fullPrompt = `${prompt}\n\n${content}`;

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Groq uses Bearer token like OpenAI
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        // Latest FREE Llama model — fast + smart
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: fullPrompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    // If failed
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Groq API request failed");
    }

    const data = await response.json();

    // Extract text from response
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("AI returned empty response");
    }

    return result;

  } catch (error) {
    throw new Error(error.message || "AI service failed. Try again.");
  }
}