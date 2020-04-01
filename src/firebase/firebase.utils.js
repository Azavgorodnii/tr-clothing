import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAKUWKU3QyyL_qvi-7V9_56aCj8HO2LEe4",
    authDomain: "crwn-clothing-9a4bb.firebaseapp.com",
    databaseURL: "https://crwn-clothing-9a4bb.firebaseio.com",
    projectId: "crwn-clothing-9a4bb",
    storageBucket: "crwn-clothing-9a4bb.appspot.com",
    messagingSenderId: "871294282985",
    appId: "1:871294282985:web:118104007efeb027329478",
    measurementId: "G-MHMFW15LYJ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;