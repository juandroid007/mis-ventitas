import { auth, googleProvider } from '../lib/firebase'
import { authState } from 'rxfire/auth'

export const user = authState(auth)
export const login = async () => { auth.signInWithPopup(googleProvider) }
export const logout = async () => { await auth.signOut() }
