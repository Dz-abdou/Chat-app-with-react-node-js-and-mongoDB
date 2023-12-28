const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const arrayUniquePlugin = require('mongoose-unique-array');
const validator = require('validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username est obligatoire'],
    unique: [true, 'Ce username est deja utilise']
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: [true, 'Ce email est deja utilise']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
  },
  room: [String]
});

userSchema.plugin(arrayUniquePlugin);

// signup 
userSchema.statics.signup = async function (username, email, password) {

  // validation
  if (!username || !email || !password) {
    throw Error('Tous les champs doivent etre remplis');
  }
  if (!validator.isEmail(email)) {
    throw Error('E-mail non valide');
  }

  let exists = await this.findOne({ email });

  if (exists) {
    throw Error('email deja utilise');
  }

  exists = await this.findOne({ username });

  if (exists) {
    throw Error('username deja utilise');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
}

// login
userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error('Tous les champs doivent etre remplis');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Il n'y a pas de compte avec cet email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Mot de passe incorrect');
  }

  return user;
}


module.exports = mongoose.model('user', userSchema);