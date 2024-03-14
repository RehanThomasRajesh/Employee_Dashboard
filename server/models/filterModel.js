const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true
  },
  filterType: {
    type: String,
    required: true
  }
});

const Filter = mongoose.model('filters', filterSchema);

module.exports = Filter;