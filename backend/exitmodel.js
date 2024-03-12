const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    outlook: {type: String,required:true},
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  outgoingLocation: { type: String, required: true },

  date: { type: Date, required: true },
  rollNumber: {
    type:Number,required:true
  },
  roomNumber: {
    type: String,
    required:true
  },
  hostel: {
    type: String,
    required:true
  },
  department:{
    type:String,
    required:true
  },
  Course:{
    type:String,
    required:true
  },
  Status:{
    type:Boolean,
    required:true
  }



}, {
  timestamps: true,
});

const formData = mongoose.model('formData', formSchema);

module.exports = formData;  