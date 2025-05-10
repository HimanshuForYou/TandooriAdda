// This script checks if the menu-updater.js script is properly loaded and functioning
document.addEventListener("DOMContentLoaded", () => {
    console.log("Checking if menu-updater.js is loaded and functioning...")
  
    // Check if the script is loaded
    const scripts = document.querySelectorAll("script")
    let menuUpdaterLoaded = false
  
    scripts.forEach((script) => {
      if (script.src && script.src.includes("menu-updater.js")) {
        menuUpdaterLoaded = true
        console.log("menu-updater.js is loaded!")
      }
    })
  
    if (!menuUpdaterLoaded) {
      console.error("menu-updater.js is not loaded! Adding it now...")
  
      // Add the script if it's not loaded
      const script = document.createElement("script")
      script.src = "menu-updater.js"
      document.body.appendChild(script)
    }
  
    // Check if localStorage has menu data
    const savedMenuData = localStorage.getItem("menuData")
    if (savedMenuData) {
      console.log("Menu data found in localStorage:", JSON.parse(savedMenuData).length, "items")
    } else {
      console.warn("No menu data found in localStorage!")
    }
  
    // Check if localStorage has gallery data
    const savedGalleryData = localStorage.getItem("galleryData")
    if (savedGalleryData) {
      console.log("Gallery data found in localStorage:", JSON.parse(savedGalleryData).length, "items")
    } else {
      console.warn("No gallery data found in localStorage!")
    }
  
    // Check if localStorage has specials data
    const savedSpecialsData = localStorage.getItem("specialsData")
    if (savedSpecialsData) {
      console.log("Specials data found in localStorage:", JSON.parse(savedSpecialsData).length, "items")
    } else {
      console.warn("No specials data found in localStorage!")
    }
  })
  