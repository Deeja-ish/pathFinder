const {GoogleGenerativeAI} = require('@google/generative-ai');
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
        responseMimeType: 'application/json',
    },
});

const textModel = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
        maxOutputTokens: 800,
    },
});

const fetchTopicExplanation = async (topic) => {
  const prompt = `
    You are an expert educator. Provide a comprehensive, beginner-friendly explanation 
    for the topic: "${topic}".
    
    Structure the explanation clearly. You can use paragraphs and bullet points,
    but do NOT use markdown headings (like '#') or bolding.
    
    Start with a simple definition, then cover the main components or key ideas
    related to the topic. Aim for 2-3 paragraphs.
  `;
  
  try {
    console.log('Sending text prompt to Gemini...');
    const result = await textModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Received text explanation from Gemini.');
    return text;
  } catch (error) {
    console.error('Error fetching text explanation from Gemini:', error);
    throw new Error('Failed to generate AI explanation.');
  }
};


// the prompt 
const generatePrompt = (topic) => {
    return `
You are an expert instructional designer. Your task is to generate a simple mind map for a beginner learning about: "${topic}".

Generate a JSON object for a React Flow graph. The JSON object must have two keys: "nodes" and "edges".

1.  **"nodes"**: An array of node objects.
    * Each node must have an "id" (string), "position" (object with x, y), and "data" (object with a "label" string).
    * Create a single "root" node for the main topic.
    * Create 4-6 "child" nodes for the main sub-concepts.
    * Keep labels short and simple (e.g., "Key Causes", "Main Events", "Major Figures").
    * Randomly scatter the "position" (x, y) coordinates within a 500x500 area. The root node can be at { x: 250, y: 25 }.

2.  **"edges"**: An array of edge objects.
    * Each edge must have an "id" (string, e.g., "e1-2"), a "source" (id of parent node), and a "target" (id of child node).
    * All edges should connect the "root" node to the "child" nodes.
    * You can set "animated" to true for a nice effect.

**Example Format:**
{
  "nodes": [
    { "id": "1", "position": { "x": 250, "y": 25 }, "data": { "label": "Main Topic" } },
    { "id": "2", "position": { "x": 100, "y": 100 }, "data": { "label": "Sub-Concept 1" } }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2", "animated": true }
  ]
}
`;
}

const fetchMindMapData = async (topic) => {
    try {
        const prompt = generatePrompt(topic)
        console.log("Sending Prompt to Gemini....")

        const result = await model.generateContent(prompt);
        const response = result.response;
        const jsonText = response.text()

        console.log("Recieved JSON text from Gemini.")

        return JSON.parse(jsonText)
    } catch (error) {
        console.error("Error fetching from Gemini:", error)
        throw new Error("Failed to generate AI mind map.")
    }
};

module.exports = { fetchMindMapData, fetchTopicExplanation };