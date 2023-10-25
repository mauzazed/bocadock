import Crew from "../../chart/crew.js"
import jwt from 'jsonwebtoken'

const putor = (err) => {
  console.log(err)
  let errors = {
    mail: null, 
    pass: null,
    usen: null,
    fame: null
   }

  if (err.keyPattern && err.keyPattern.mail) {
    errors.mail = 'email sudah terdaftar';
  }
  if (err.keyPattern && err.keyPattern.usen) {
    errors.usen = 'username sudah dipakai, mohon cari yang lain'
  }

  if (err.message.includes('crew validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties)
      errors[properties.path] = properties.message;
    })
  }

  if (err.message.includes('password salah')) {
    errors.pass = 'email dan password salah'
  }

  return errors
}

const age = 7 * 60 * 60 * 24
const crechest = (id) => {
  return jwt.sign({id}, process.env.CHESCRET, {expiresIn: age})
}

const signUp = async (q, s) => {
  const { mail, pass , usen, fame, lame } = q.body

  try {
    const crew = await Crew.create({
      mail, pass , usen, fame, lame, adge:['g0']
    })
    const chest = crechest(crew._id)
    console.log(chest)
    console.log(crew.id)
    s.cookie('chest', chest, { httpOnly: true, maxAge: age * 1000})
    s.status(200).json(crew)
  }
  catch(err) {
    const errors = putor(err)
    s.status(400).json({ errors })
  }
}

const logIn = async (q, s) => {
  const { mail, pass } = q.body

  try {
    const crew = await Crew.login(mail, pass)
    const chest = crechest(crew._id)
    console.log(chest)
    s.cookie('dro', 'kontol')
    s.cookie('chest', chest, { maxAge: age * 1000 })
    s.status(200).json(crew)
  }
  catch(err) {
    const errors = putor(err)
    s.status(400).json({ errors })
  }
}

const logOut = (q, s) => {
  s.clearCookie('chest');
  s.redirect('/')
}

const cookie = async (q, s) => {
  const chest = q.cookies.chest
  let adge = null
  if (chest) {
    try {
      const gold = await jwt.verify(chest, process.env.CHESCRET);
      const crew = await Crew.findById(gold.id);
      adge = crew;
      console.log(adge)
    } catch (err) {
      adge = null;
    }
  } else {
    adge = null;
  }
  return adge;
}

export { signUp, logIn, logOut, cookie }