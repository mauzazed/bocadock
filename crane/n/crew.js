import Crew from "../../chart/crew.js"
import jwt from 'jsonwebtoken'

const getCrews = async (q, s) => {
  const crews = await Crew.find({}).sort({ name: 1 })
  s.status(200).json(crews)
}

const getYou = async (q, s) => {
  const chest = q.cookies.chest
  if (!chest) {
    return s.status(400).json({ message: 'token tidak ditemukan' });
  }

  try {
    const gold = await jwt.verify(chest, process.env.CHESCRET);
    const crew = await Crew.findById(gold.id);
    return s.status(200).json({ id: crew._id, fame: crew.fame, adge: crew.adge });
  } catch (err) {
    return s.status(400).json({ message: 'token tidak valid' });
  }
}

export { getCrews, getYou }