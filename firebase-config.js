// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

// Your web app's Firebase configuration
// Replace these values with your actual Firebase project configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNdbEx0PIIIVcQLyv4dXm8J_h5mGxIKPg",
  authDomain: "tandoori-adda-793b9.firebaseapp.com",
  databaseURL: "https://tandoori-adda-793b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tandoori-adda-793b9",
  storageBucket: "tandoori-adda-793b9.firebasestorage.app",
  messagingSenderId: "467027221360",
  appId: "1:467027221360:web:49fb7ca89ed07b884f8db5",
  measurementId: "G-2METY7PCNF"
};
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Helper functions for database operations
export const saveData = async (path, data) => {
  try {
    await set(ref(database, path), data)
    console.log(`Data saved successfully at ${path}`)
    return true
  } catch (error) {
    console.error(`Error saving data at ${path}:`, error)
    return false
  }
}

export const getData = async (path) => {
  try {
    const snapshot = await get(ref(database, path))
    if (snapshot.exists()) {
      console.log(`Data retrieved successfully from ${path}`)
      return snapshot.val()
    } else {
      console.log(`No data available at ${path}`)
      return null
    }
  } catch (error) {
    console.error(`Error getting data from ${path}:`, error)
    return null
  }
}

export const listenForChanges = (path, callback) => {
  const dataRef = ref(database, path)
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    callback(data)
  })
}

export const removeData = async (path) => {
  try {
    await remove(ref(database, path))
    console.log(`Data removed successfully from ${path}`)
    return true
  } catch (error) {
    console.error(`Error removing data from ${path}:`, error)
    return false
  }
}

export { database, ref }
