import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'
import { isUsername } from "../crane/f/vessel.js"
const { isEmail } = validator

const crewSchema = mongoose.Schema({
  fame: {
    type: String,
    required: [true, 'Mohon masukkan nama Anda']
  },
  lame: {
    type: String,
    required: false
  },
  mail: {
    type: String, 
    required: [true, 'mohon masukkan email Anda'],
    unique: [true, 'email sudah terdaftar'],
    lowercase: true,
    validate: [isEmail, 'mohon masukkan email yang valid']
  },
  pass: {
    type: String,
    required: [true, 'masukkan password Anda'],
    minlength: [6, 'minimal password 6 karakter']
  },
  usen: {
    type: String,
    required: [true, 'mohon buat username terlebih dahulu'],
    unique: [true, 'username sudah digunakan oleh orang lain, mohon cari username lain'],
    lowercase: true,
    validate: [isUsername, 'hanya huruf, angka, -, dan _ yang diperbolehkan']
  },
  adge: [{
    type: String,
    required: true,
    lowercase: true,
  }],
})

crewSchema.pre('save', async function (nex) {
  const salt = await bcrypt.genSalt()
  this.pass = await bcrypt.hash(this.pass, salt)
  nex()
})

crewSchema.statics.login = async function (mail, pass) {
  console.log('login berjalan')
  const crew = await this.findOne({ mail })
  console.log(crew)
  if (crew) {
    const crypt = await bcrypt.compare(pass, crew.pass)
    if (crypt) {
      return crew
    }
    throw Error('email dan atau password salah')
  }
  throw Error('email dan atau password salah')
}

const Crew = mongoose.model('crew', crewSchema)

export default Crew