/// This script updates the menu prices, descriptions, and images from localStorage data
document.addEventListener("DOMContentLoaded", () => {
    console.log("Menu updater script loaded")
  
    // Check if there's menu data in localStorage
    const savedMenuData = localStorage.getItem("menuData")
    if (!savedMenuData) {
      console.log("No menu data found in localStorage")
      return
    }
  
    try {
      // Parse the menu data
      const menuData = JSON.parse(savedMenuData)
      console.log("Menu data loaded:", menuData.length, "items")
  
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
  
      // Update specials if they exist
      updateSpecials()
  
      // Update gallery if it exists
      updateGallery()
  
      console.log("Menu prices, descriptions, and images updated successfully")
    } catch (error) {
      console.error("Error updating menu data:", error)
    }
  })
  
  // Update specials section
  function updateSpecials() {
    console.log("Updating specials section")
  
    // Check if there's specials data in localStorage
    const savedSpecialsData = localStorage.getItem("specialsData")
    if (!savedSpecialsData) {
      console.log("No specials data found in localStorage")
      return
    }
  
    try {
      // Parse the specials data
      const specialsData = JSON.parse(savedSpecialsData)
      console.log("Specials data loaded:", specialsData.length, "items")
  
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
  
      console.log("Specials updated successfully")
    } catch (error) {
      console.error("Error updating specials:", error)
    }
  }
  
  // Update gallery section
  function updateGallery() {
    console.log("Updating gallery section")
  
    // Check if there's gallery data in localStorage
    const savedGalleryData = localStorage.getItem("galleryData")
    if (!savedGalleryData) {
      console.log("No gallery data found in localStorage")
      return
    }
  
    try {
      // Parse the gallery data
      const galleryData = JSON.parse(savedGalleryData)
      console.log("Gallery data loaded:", galleryData.length, "items")
  
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
  
      console.log("Gallery updated successfully")
    } catch (error) {
      console.error("Error updating gallery:", error)
    }
  }
  
  
  // this is testing dont delete