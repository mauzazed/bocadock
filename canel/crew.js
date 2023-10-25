import { Router } from "express"
import { getCrews, getYou } from "../crane/n/crew.js"

const canelCrew = Router() 

canelCrew.get('/api/crew', getCrews)
canelCrew.get('/api/you', getYou)

export default canelCrew