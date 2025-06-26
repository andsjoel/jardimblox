// Importa o SDK do Firebase
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// 🔧 Substitua com os dados do seu projeto Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SUA_APP_ID"
}

// Inicializa o Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, signInWithEmailAndPassword }
