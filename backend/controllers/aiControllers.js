const { fetchMindMapData, fetchTopicExplanation } = require("../services/aiService")


const generateMindMap = async (req, res) => {
  const { topic } = req.body;
  const userId = req.user._id;

  if(!topic) {
    return res.status(400).json({messsage: "Topic is required."})
  }

  console.log(`Generating map for user ${userId} on topic: ${topic}`);

  // --- AI LOGIC WILL GO HERE ---
  try {
    const [mapData, explanation] = await Promise.all([
      fetchMindMapData(topic),
      fetchTopicExplanation(topic)
    ]);

    res.status(200).json({ mapData, explanation });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message || "Server error during map generation."})
  }

};

module.exports = { generateMindMap };