import { Router } from "express"
import { signUp, logIn, logOut, cookie } from "../crane/n/auth.js"

const canelAuth = Router() 

canelAuth.post('/api/signup', signUp)
canelAuth.post('/api/login', logIn)
canelAuth.get('/api/logout', logOut)
canelAuth.get('/cookie', cookie)

export default canelAuth