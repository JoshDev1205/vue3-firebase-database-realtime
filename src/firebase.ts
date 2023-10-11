import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDD8buXRpLqfyppQT7TvADhYv4P4oEqaO8',
  authDomain: 'vue-firebase-realtime-deef2.firebaseapp.com',
  databaseURL:
    'https://vue-firebase-realtime-deef2-default-rtdb.firebaseio.com',
  projectId: 'vue-firebase-realtime-deef2',
  storageBucket: 'vue-firebase-realtime-deef2.appspot.com',
  messagingSenderId: '454239278850',
  appId: '1:454239278850:web:1fe107a5f3bfeb0f6dd41b',
})

// used for the databas refs
export const db = getDatabase(firebaseApp)

// here we can export reusable database references
export const todosRef = ref(db, 'tutorials')
