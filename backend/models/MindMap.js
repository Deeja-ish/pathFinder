const mongoose = require('mongoose');

const MindMapSchema = new mongoose.Schema({
  // Link to the user who created it
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  topic: { type: String, required: true },
  mapData: { type: Object, required: true },
  explanation: { type: String, default: '', },
}, { 
  timestamps: true
});

const MindMap = mongoose.model('MindMap', MindMapSchema);
module.exports = MindMap;