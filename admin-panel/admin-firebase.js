// Firebase integration for the admin panel
import { saveData, getData } from "../firebase-config.js"

// Initialize Firebase data from localStorage if it doesn't exist yet
export async function initializeFirebaseData() {
  console.log("Initializing Firebase data from localStorage if needed")

  // Check if menu data exists in Firebase
  const menuData = await getData("menuData")
  if (!menuData) {
    // If not, check if it exists in localStorage
    const localMenuData = localStorage.getItem("menuData")
    if (localMenuData) {
      // Upload localStorage data to Firebase
      await saveData("menuData", JSON.parse(localMenuData))
      console.log("Menu data initialized in Firebase from localStorage")
    }
  }

  // Check if specials data exists in Firebase
  const specialsData = await getData("specialsData")
  if (!specialsData) {
    // If not, check if it exists in localStorage
    const localSpecialsData = localStorage.getItem("specialsData")
    if (localSpecialsData) {
      // Upload localStorage data to Firebase
      await saveData("specialsData", JSON.parse(localSpecialsData))
      console.log("Specials data initialized in Firebase from localStorage")
    }
  }

  // Check if gallery data exists in Firebase
  const galleryData = await getData("galleryData")
  if (!galleryData) {
    // If not, check if it exists in localStorage
    const localGalleryData = localStorage.getItem("galleryData")
    if (localGalleryData) {
      // Upload localStorage data to Firebase
      await saveData("galleryData", JSON.parse(localGalleryData))
      console.log("Gallery data initialized in Firebase from localStorage")
    }
  }

  console.log("Firebase data initialization complete")
}

// Save menu data to Firebase
export async function saveMenuDataToFirebase(data) {
  const result = await saveData("menuData", data)
  if (result) {
    // Also update localStorage for backward compatibility
    localStorage.setItem("menuData", JSON.stringify(data))
    localStorage.setItem("lastUpdated", new Date().toISOString())
    console.log("Menu data saved to Firebase and localStorage")
    return true
  }
  return false
}

// Save specials data to Firebase
export async function saveSpecialsDataToFirebase(data) {
  const result = await saveData("specialsData", data)
  if (result) {
    // Also update localStorage for backward compatibility
    localStorage.setItem("specialsData", JSON.stringify(data))
    console.log("Specials data saved to Firebase and localStorage")
    return true
  }
  return false
}

// Save gallery data to Firebase
export async function saveGalleryDataToFirebase(data) {
  const result = await saveData("galleryData", data)
  if (result) {
    // Also update localStorage for backward compatibility
    localStorage.setItem("galleryData", JSON.stringify(data))
    console.log("Gallery data saved to Firebase and localStorage")
    return true
  }
  return false
}

// Get menu data from Firebase
export async function getMenuDataFromFirebase() {
  const data = await getData("menuData")
  if (data) {
    // Also update localStorage for backward compatibility
    localStorage.setItem("menuData", JSON.stringify(data))
    console.log("Menu data retrieved from Firebase and saved to localStorage")
    return data
  }
  return null
}

// Get specials data from Firebase
export async function getSpecialsDataFromFirebase() {
  const data = await getData("specialsData")
  if (data) {
    // Also update localStorage for backward compatibility
    localStorage.setItem("specialsData", JSON.stringify(data))
    console.log("Specials data retrieved from Firebase and saved to localStorage")
    return data
  }
  return null
}

// Get gallery data from Firebase
export async function getGalleryDataFromFirebase() {
  const data = await getData("galleryData")
  if (data) {
    // Also update localStorage for backward compatibility
    localStorage.setItem("galleryData", JSON.stringify(data))
    console.log("Gallery data retrieved from Firebase and saved to localStorage")
    return data
  }
  return null
}
