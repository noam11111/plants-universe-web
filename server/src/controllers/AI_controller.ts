const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const improveText = async (inputText: string): Promise<any | null> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Improve the following text for a post content in a plants lover social media. the content may be a knowledge sharing, a question and more. the text to improve: "${inputText}". return only the text to be published in the post, only one option and no explanation`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

export { improveText };
