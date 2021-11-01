//import { auth } from '../lib/firebase-admin'
import { auth } from '../lib/firebase-admin'
import { DecodedIdToken } from 'firebase-admin/auth'

// Export function to verify id token in server side
interface IVerifyIdToken {
    status: boolean
    message?: string
    token?: DecodedIdToken
}

export const verifyIdToken = async (idToken: string): Promise<IVerifyIdToken> => {
    try {
        const decodedIdtoken = await auth.verifyIdToken(idToken, true)
        return { status: true, token: decodedIdtoken }
    } catch (e) {
        return { status: false, message: e }
    }
}