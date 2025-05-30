// Updated menu updater script that uses Firebase instead of localStorage
import { getData, listenForChanges } from "./firebase-config.js"

document.addEventListener("DOMContentLoaded", () => {
  console.log("Firebase menu updater script loaded")

  // Initialize the updater
  initializeUpdater()

  // Set up real-time listeners for data changes
  setupRealTimeListeners()
})

// Initialize the updater by loading data from Firebase
async function initializeUpdater() {
  // Load initial data from Firebase
  const menuData = await getData("menuData")
  if (menuData) {
    console.log("Menu data loaded from Firebase:", menuData.length, "items")
    updateMenuItems(menuData)
  } else {
    console.log("No menu data found in Firebase")
  }

  const specialsData = await getData("specialsData")
  if (specialsData) {
    console.log("Specials data loaded from Firebase:", specialsData.length, "items")
    updateSpecials(specialsData)
  } else {
    console.log("No specials data found in Firebase")
  }

  const galleryData = await getData("galleryData")
  if (galleryData) {
    console.log("Gallery data loaded from Firebase:", galleryData.length, "items")
    updateGallery(galleryData)
  } else {
    console.log("No gallery data found in Firebase")
  }
}

// Set up real-time listeners for data changes
function setupRealTimeListeners() {
  // Listen for menu data changes
  listenForChanges("menuData", (data) => {
    if (data) {
      console.log("Menu data updated in Firebase:", data.length, "items")
      updateMenuItems(data)
    }
  })

  // Listen for specials data changes
  listenForChanges("specialsData", (data) => {
    if (data) {
      console.log("Specials data updated in Firebase:", data.length, "items")
      updateSpecials(data)
    }
  })

  // Listen for gallery data changes
  listenForChanges("galleryData", (data) => {
    if (data) {
      console.log("Gallery data updated in Firebase:", data.length, "items")
      updateGallery(data)
    }
  })
}

// Update menu items on the page
function updateMenuItems(menuData) {
  // Get all menu items on the page
  const menuItems = document.querySelectorAll(".menu-item")
  console.log("Found", menuItems.length, "menu items on page")

  // Update each menu item if there's a match
  menuItems.forEach((item) => {
    // Get the dish name from the menu item
    const nameElement = item.querySelector(".menu-content a")
    if (!nameElement) {
      console.log("No name element found for menu item")
      return
    }

    const dishName = nameElement.textContent.trim()
    console.log("Processing menu item:", dishName)

    // Find the matching dish in the menu data
    const matchingDish = menuData.find(
      (dish) =>
        dish.name.toLowerCase() === dishName.toLowerCase() ||
        dish.name.toLowerCase().includes(dishName.toLowerCase()) ||
        dishName.toLowerCase().includes(dish.name.toLowerCase()),
    )

    if (!matchingDish) {
      console.log("No match found for:", dishName)
      return
    }

    console.log("Found matching dish:", matchingDish.name, "for", dishName)

    // Update the price
    const priceElement = item.querySelector(".menu-content span")
    if (priceElement) {
      priceElement.textContent = `₹${matchingDish.price}`
      console.log(`Updated price for ${dishName} to ₹${matchingDish.price}`)
    } else {
      console.log("No price element found for", dishName)
    }

    // Update the description
    const descriptionElement = item.querySelector(".menu-ingredients")
    if (descriptionElement && matchingDish.description) {
      descriptionElement.textContent = matchingDish.description
      console.log(`Updated description for ${dishName}`)
    } else {
      console.log("No description element found for", dishName)
    }

    // Update the image if it exists in the data as a data URL
    if (matchingDish.image) {
      const imgElement = item.querySelector(".menu-img")
      if (imgElement) {
        // Only update if it's a data URL (uploaded image)
        if (matchingDish.image.startsWith("data:image")) {
          imgElement.src = matchingDish.image
          console.log(`Updated image for ${dishName}`)
        } else {
          console.log("Image is not a data URL for", dishName)
        }
      } else {
        console.log("No image element found for", dishName)
      }
    }
  })

  // Check for new dishes that need to be added to the page
  menuData.forEach((dish) => {
    // Check if this dish already exists on the page
    const existingItems = Array.from(menuItems).filter((item) => {
      const nameElement = item.querySelector(".menu-content a")
      if (!nameElement) return false

      const dishName = nameElement.textContent.trim()
      return (
        dish.name.toLowerCase() === dishName.toLowerCase() ||
        dish.name.toLowerCase().includes(dishName.toLowerCase()) ||
        dishName.toLowerCase().includes(dish.name.toLowerCase())
      )
    })

    // If the dish doesn't exist on the page, we need to add it
    if (existingItems.length === 0) {
      console.log("Adding new dish to page:", dish.name)

      // Find the container for this category
      const categoryContainer = document.querySelector(`.isotope-container .${dish.category}`)
      if (!categoryContainer) {
        console.log("No container found for category:", dish.category)
        return
      }

      // Create a new menu item element
      const newItem = document.createElement("div")
      newItem.className = `col-lg-6 menu-item isotope-item ${dish.category}`
      newItem.innerHTML = `
          <img src="${dish.image}" class="menu-img" alt="${dish.name}">
          <div class="menu-content">
            <a href="#">${dish.name}</a><span>₹${dish.price}</span>
          </div>
          <div class="menu-ingredients">
            ${dish.description}
          </div>
        `

      // Add the new item to the container
      categoryContainer.appendChild(newItem)
      console.log(`Added new dish ${dish.name} to the page`)
    }
  })
}

// Update specials section
function updateSpecials(specialsData) {
  console.log("Updating specials section with Firebase data")

  // Update each special tab
  specialsData.forEach((special, index) => {
    const tabId = `specials-tab-${index + 1}`
    const tabPane = document.getElementById(tabId)

    if (!tabPane) {
      console.log("No tab pane found for", tabId)
      return
    }

    console.log("Updating special tab:", tabId, "with", special.name)

    // Update the name
    const nameElement = tabPane.querySelector("h3")
    if (nameElement) {
      nameElement.textContent = special.name
      console.log("Updated name for", special.name)
    } else {
      console.log("No name element found for", special.name)
    }

    // Update the description (italic text)
    const descriptionElement = tabPane.querySelector(".fst-italic")
    if (descriptionElement) {
      descriptionElement.textContent = special.description
      console.log("Updated description for", special.name)
    } else {
      console.log("No description element found for", special.name)
    }

    // Update the details
    const detailsElement = tabPane.querySelector("p:not(.fst-italic)")
    if (detailsElement) {
      detailsElement.textContent = special.details
      console.log("Updated details for", special.name)
    } else {
      console.log("No details element found for", special.name)
    }

    // Update the image if it's a data URL
    if (special.image && special.image.startsWith("data:image")) {
      const imgElement = tabPane.querySelector("img")
      if (imgElement) {
        imgElement.src = special.image
        console.log("Updated image for", special.name)
      } else {
        console.log("No image element found for", special.name)
      }
    }

    // Update the tab name
    const tabLink = document.querySelector(`[data-bs-toggle="tab"][href="#${tabId}"]`)
    if (tabLink) {
      tabLink.textContent = special.name
      console.log("Updated tab link for", special.name)
    } else {
      console.log("No tab link found for", special.name)
    }
  })

  console.log("Specials updated successfully from Firebase")
}

// Update gallery section
function updateGallery(galleryData) {
  console.log("Updating gallery section with Firebase data")

  // Get all gallery items on the page
  const galleryItems = document.querySelectorAll(".gallery-item")
  console.log("Found", galleryItems.length, "gallery items on page")

  // Update each gallery item if there's a match
  galleryItems.forEach((item, index) => {
    if (index < galleryData.length) {
      const galleryItem = galleryData[index]
      console.log("Processing gallery item:", index)

      // Update the image if it's a data URL
      if (galleryItem.image && galleryItem.image.startsWith("data:image")) {
        const imgElement = item.querySelector("img")
        if (imgElement) {
          imgElement.src = galleryItem.image
          console.log("Updated gallery image at index", index)
        } else {
          console.log("No image element found for gallery item", index)
        }

        // Update the lightbox link
        const linkElement = item.querySelector("a")
        if (linkElement) {
          linkElement.href = galleryItem.image
          console.log("Updated gallery link at index", index)
        } else {
          console.log("No link element found for gallery item", index)
        }
      }
    }
  })

  console.log("Gallery updated successfully from Firebase")
}
