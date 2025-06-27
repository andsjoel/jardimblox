import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDHHsvC4goyELBnBjE5m6Z5IBkR5NqcWew",
  authDomain: "jardimblox-c8709.firebaseapp.com",
  projectId: "jardimblox-c8709",
  storageBucket: "jardimblox-c8709.firebasestorage.app",
  messagingSenderId: "566464208551",
  appId: "1:566464208551:web:318d3c6916eb01cda4c582"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage()

export { auth, signInWithEmailAndPassword, db, storage  }
