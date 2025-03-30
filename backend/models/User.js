const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String,
    required: function() { 
      return !this.googleId; // Only required if no googleId
    }
  },
  name: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add pre-save middleware to log the document before saving
UserSchema.pre('save', function(next) {
  console.log('Saving user:', this);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;