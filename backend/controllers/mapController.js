const MindMap = require('../models/MindMap');

// @desc    Save a new mind map
// @route   POST /api/maps
// @access  Private
const saveMap = async (req, res) => {
  const { topic, mapData, explanation } = req.body;

  if (!topic || !mapData || !explanation) {
    return res.status(400).json({ message: 'Missing topic, map data, or explanation.' });
  }

  try {
    const newMap = new MindMap({
      topic,
      mapData,
      explanation: explanation || " ",
      author: req.user._id, 
    });

    const savedMap = await newMap.save();
    res.status(201).json(savedMap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while saving map.' });
  }
};

// @desc    Get all of the logged-in user's maps
// @route   GET /api/maps/my-maps
// @access  Private
const getMyMaps = async (req, res) => {
  try {
    
    const maps = await MindMap.find({ author: req.user._id })
      .select('topic createdAt') 
      .sort({ createdAt: -1 });
    
    res.status(200).json(maps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching maps.' });
  }
};


const getMapById = async (req, res) => {
  try {
    const map = await MindMap.findById(req.params.id);

    if (!map) {
      return res.status(404).json({ message: 'Map not found.' });
    }

    
    if (map.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view this map.' });
    }

    res.status(200).json(map);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching map.' });
  }
};


const deleteMap = async (req, res) => {
  try {
    const map = await MindMap.findById(req.params.id);

    if (!map) {
      return res.status(404).json({ message: 'Map not found.' });
    }

    if (map.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this map.' });
    }

    await map.deleteOne(); 
    res.status(200).json({ message: 'Map deleted successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting map.' });
  }
};

module.exports = {
  saveMap,
  getMyMaps,
  getMapById,
  deleteMap,
};