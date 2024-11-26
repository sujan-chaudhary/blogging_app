import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePicture: {type: String},
    bio: {type: String},
}, {timestamps: true});


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
  
    try{
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    }
    catch(err){
      next(err);
    }
  });
  
  userSchema.methods.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
  }
  
  const User = mongoose.model("User", userSchema);
  
  export default User;