import type { User } from 'firebase'

import { auth, googleProvider } from '../lib/firebase'
import { authState } from 'rxfire/auth'

export const user = authState(auth)
export const login = () => { auth.signInWithPopup(googleProvider) }
export const logout = () => { auth.signOut() }
