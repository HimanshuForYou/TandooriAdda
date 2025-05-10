// Demo credentials (in a real application, this would be handled securely on the server)
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password123"

// DOM Elements
const loginSection = document.getElementById("login-section")
const adminSection = document.getElementById("admin-section")
const loginForm = document.getElementById("login-form")
const loginError = document.getElementById("login-error")
const logoutBtn = document.getElementById("logout-btn")
const menuItemsList = document.getElementById("menu-items-list")
const categoryFilter = document.getElementById("category-filter")
const saveChangesBtn = document.getElementById("save-changes-btn")
const dishSelect = document.getElementById("dish-select")
const imageUpload = document.getElementById("image-upload")
const currentImage = document.getElementById("current-image")
const imagePreview = document.getElementById("image-preview")
const uploadImageBtn = document.getElementById("upload-image-btn")
const uploadMessage = document.getElementById("upload-message")
const totalItemsElement = document.getElementById("total-items")
const totalCategoriesElement = document.getElementById("total-categories")
const lastUpdatedElement = document.getElementById("last-updated")

// Add Dish Form Elements
const addDishForm = document.getElementById("add-dish-form")
const dishNameInput = document.getElementById("dish-name")
const dishCategorySelect = document.getElementById("dish-category")
const dishPriceInput = document.getElementById("dish-price")
const dishDescriptionInput = document.getElementById("dish-description")
const dishImageInput = document.getElementById("dish-image")
const dishImagePreview = document.getElementById("dish-image-preview")
const addDishMessage = document.getElementById("add-dish-message")

// Specials Management Elements
const specialsContainer = document.getElementById("specials-container")
const saveSpecialsBtn = document.getElementById("save-specials-btn")

// Gallery Management Elements
const galleryContainer = document.getElementById("gallery-container")
const saveGalleryBtn = document.getElementById("save-gallery-btn")
const addGalleryItem = document.getElementById("add-gallery-item")
const galleryUpload = document.getElementById("gallery-upload")

// Tab navigation
const tabLinks = document.querySelectorAll(".sidebar li")
const tabContents = document.querySelectorAll(".tab-content")
const actionButtons = document.querySelectorAll(".action-btn")

// Menu data (in a real application, this would be fetched from a server)
let menuData = []

// Specials data
let specialsData = []

// Gallery data
let galleryData = []

// Initialize the admin panel
function init() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
  if (isLoggedIn) {
    showAdminPanel()
  } else {
    showLoginForm()
  }

  // Load menu data from localStorage or initialize with demo data
  loadMenuData()

  // Load specials data
  loadSpecialsData()

  // Load gallery data
  loadGalleryData()

  // Set up event listeners
  setupEventListeners()
}

// Extract menu items from the main website
function extractMenuItemsFromWebsite() {
  // This function would ideally be run once to initialize the menu data
  // In a real application, this would be done server-side

  // Complete list of all menu items from the website
  return [
    // Chinese Section
    {
      id: 1,
      name: "Veg Fried Rice",
      category: "filter-chinese",
      price: 140,
      description: "Classic fried rice with fresh vegetables and spices.",
      image: "../assets/img/menu/dish-1.jpg",
    },
    {
      id: 2,
      name: "Veg Noodles",
      category: "filter-chinese",
      price: 140,
      description: "Soft noodles stir-fried with fresh veggies and flavorful sauces",
      image: "../assets/img/menu/dish-2.jpg",
    },
    {
      id: 3,
      name: "Veg Hakka Noodles",
      category: "filter-chinese",
      price: 150,
      description: "Stir-fried noodles with mixed vegetables and a flavorful sauce.",
      image: "../assets/img/menu/veg-hakka-noodles-recipe-with-step-by-step-instructions.jpg",
    },
    {
      id: 4,
      name: "Manchurian Dry",
      category: "filter-chinese",
      price: 160,
      description: "Crispy vegetable balls tossed in a spicy Manchurian sauce.",
      image: "../assets/img/menu/veg-manchurian dry.jpg",
    },
    {
      id: 5,
      name: "Manchurian Gravy",
      category: "filter-chinese",
      price: 160,
      description: "Veg balls drenched in a rich and spicy Manchurian sauce.",
      image: "../assets/img/menu/manchurian-gravy-1-500x375.webp",
    },
    {
      id: 6,
      name: "paneer 65",
      category: "filter-chinese",
      price: 140,
      description: "Spicy and crispy paneer bites with South Indian flavors.",
      image: "../assets/img/menu/paneer 65.jpg",
    },
    {
      id: 7,
      name: "Chinese Bhel",
      category: "filter-chinese",
      price: 140,
      description: "A fusion snack with crispy noodles, tangy sauces, and fresh veggies.",
      image: "../assets/img/menu/chinese bhel.jpg",
    },
    {
      id: 8,
      name: "Veg Cutlet",
      category: "filter-chinese",
      price: 140,
      description: "Deep-fried vegetable patties with a crunchy golden crust.",
      image: "../assets/img/menu/Veg-cutlet-1-WS-1.jpg",
    },
    {
      id: 9,
      name: "Cheese Balls",
      category: "filter-chinese",
      price: 140,
      description: "Crispy cheese-filled balls served with a flavorful dip.",
      image: "../assets/img/menu/Potato-Cheese-Balls-social.webp",
    },
    {
      id: 10,
      name: "Veg Lollipop",
      category: "filter-chinese",
      price: 140,
      description: "Spiced and deep-fried vegetable sticks with a crunchy texture.",
      image: "../assets/img/menu/veg-lollipop-air-fryer.jpg",
    },
    {
      id: 11,
      name: "Veg Spring Roll",
      category: "filter-chinese",
      price: 140,
      description: "Crispy rolls stuffed with a delicious mix of vegetables.",
      image: "../assets/img/menu/Vegetable-Spring-Rolls-2-1-906001560ca545c8bc72baf473f230b4_thumbnail_170.jpg",
    },
    {
      id: 12,
      name: "Schezwan Rice",
      category: "filter-chinese",
      price: 140,
      description: "Fiery, tangy fried rice infused with Schezwan sauce.",
      image: "../assets/img/menu/schezwan-fried-rice-recipe.jpg",
    },
    {
      id: 13,
      name: "Paneer Fried Rice",
      category: "filter-chinese",
      price: 140,
      description: "Tandoori paneer tossed in aromatic fried rice.",
      image: "../assets/img/menu/paneer fried rice.jpg",
    },
    {
      id: 14,
      name: "Chilly Paneer",
      category: "filter-chinese",
      price: 140,
      description: "Soft paneer cubes tossed in spicy, tangy sauce.",
      image: "../assets/img/menu/chilli paneer.jpg",
    },
    {
      id: 15,
      name: "Panner manchurian",
      category: "filter-chinese",
      price: 140,
      description: "Paneer cooked in a rich Indo-Chinese Manchurian sauce.",
      image: "../assets/img/menu/manchurian-gravy-1-500x375.webp",
    },
    {
      id: 16,
      name: "Noodles Manchurian",
      category: "filter-chinese",
      price: 140,
      description: "A perfect blend of noodles and crispy Manchurian bites.",
      image: "../assets/img/menu/noodles manchurian.jpg",
    },
    {
      id: 17,
      name: "Veg Angara",
      category: "filter-chinese",
      price: 140,
      description: "Fiery, smoky vegetable dish with bold flavors.",
      image: "../assets/img/menu/VEG-ANGARA.jpg",
    },
    {
      id: 18,
      name: "Crispy Noodles",
      category: "filter-chinese",
      price: 140,
      description: "Deep-fried crunchy noodles served with savory toppings.",
      image: "../assets/img/menu/how-to-make-crispy-noodles.jpg",
    },
    {
      id: 19,
      name: "Dahi kabab",
      category: "filter-chinese",
      price: 140,
      description: "Soft and creamy curd kababs with a crispy golden crust.",
      image: "../assets/img/menu/dahi-ke-kabab-recipe.webp",
    },

    // Thali Section
    {
      id: 20,
      name: "Regural Thali",
      category: "filter-thali",
      price: 150,
      description: "A simple yet satisfying meal with Indian staples.",
      image: "../assets/img/menu/regular thali.jpg",
    },
    {
      id: 21,
      name: "Standard Thali",
      category: "filter-thali",
      price: 150,
      description: "A wholesome plate with extra sides for a balanced meal.",
      image: "../assets/img/menu/standard thali.webp",
    },
    {
      id: 22,
      name: "Special Thali",
      category: "filter-thali",
      price: 150,
      description: "A grand platter featuring a variety of flavorful dishes.",
      image: "../assets/img/menu/special thaali.jpg",
    },

    // Snacks Section
    {
      id: 23,
      name: "Crispy Corn",
      category: "filter-snacks",
      price: 190,
      description: "Crunchy golden corn tossed with spices and herbs.",
      image:
        "../assets/img/menu/8681426_Crispy-Corn_Dotdash-Meredith-Food-Studios_2x1-5aa261354db146a1a3b54d80c025cad9.jpg",
    },
    {
      id: 24,
      name: "French Fries",
      category: "filter-snacks",
      price: 190,
      description: "Classic crispy fries with a side of seasoning.",
      image: "../assets/img/menu/french fries.gif",
    },
    {
      id: 25,
      name: "Chana Roasted",
      category: "filter-snacks",
      price: 190,
      description: "Protein-rich roasted chickpeas with a smoky twist.",
      image: "../assets/img/menu/chana roasted.jpg",
    },
    {
      id: 26,
      name: "Honey Potato",
      category: "filter-snacks",
      price: 190,
      description: "Crispy potatoes glazed with a sweet and spicy honey sauce",
      image: "../assets/img/menu/Potato-Cheese-Balls-social.webp",
    },

    // Pasta Section
    {
      id: 27,
      name: "White Sauce Pasta",
      category: "filter-pasta",
      price: 170,
      description: "Creamy pasta cooked in rich and cheesy white sauce.",
      image: "../assets/img/menu/white-sauce-pasta-featured.webp",
    },
    {
      id: 28,
      name: "Red Sauce Pasta",
      category: "filter-pasta",
      price: 170,
      description: "Tangy tomato-based pasta with a burst of flavors.",
      image: "../assets/img/menu/red-sauce-pasta-1-500x500.jpg",
    },
    {
      id: 29,
      name: "Chinese Pasta",
      category: "filter-pasta",
      price: 170,
      description: "A fusion dish combining pasta with Indo-Chinese spices.",
      image: "../assets/img/menu/cheese pasta.jpg",
    },

    // Sandwich Section
    {
      id: 30,
      name: "Masala Sandwich",
      category: "filter-sandwich",
      price: 140,
      description: "Spiced vegetable filling stuffed in crispy toasted bread.",
      image: "../assets/img/menu/Masala-Sandwich.jpg",
    },
    {
      id: 31,
      name: "Masala Cheese Sandwich",
      category: "filter-sandwich",
      price: 140,
      description: "A cheesy twist on the classic masala sandwich.",
      image: "../assets/img/menu/masala cheese sw.jpg",
    },
    {
      id: 32,
      name: "Cheese Club Sandwich",
      category: "filter-sandwich",
      price: 140,
      description: "Layers of cheese with fresh veggies packed in toasted bread.",
      image: "../assets/img/menu/grilled-cheese-club-sandwich.jpg",
    },
    {
      id: 33,
      name: "Veg Club Sandwich",
      category: "filter-sandwich",
      price: 140,
      description: "Multi-layered sandwich with fresh vegetables and seasonings.",
      image: "../assets/img/menu/grilled-cheese-club-sandwich.jpg", // Placeholder image
    },
    {
      id: 34,
      name: "Veg Paneer Cheese Sandwich",
      category: "filter-sandwich",
      price: 140,
      description: "A hearty combo of paneer and cheese in grilled bread.",
      image: "../assets/img/menu/paneer-cheese sandwich.jpg",
    },

    // Momos Section
    {
      id: 35,
      name: "Veg Steam Momos",
      category: "filter-momos",
      price: 130,
      description: "Soft and flavorful steamed dumplings served with chutney.",
      image: "../assets/img/menu/steam veg momos.jpg",
    },
    {
      id: 36,
      name: "Veg Fried Momos",
      category: "filter-momos",
      price: 130,
      description: "Crispy, golden-fried momos with a spicy filling.",
      image: "../assets/img/menu/Fried-Momos-Recipe-Step-By-Step-Instructions-500x500.jpg",
    },
    {
      id: 37,
      name: "cheese Steam Momos",
      category: "filter-momos",
      price: 130,
      description: "Soft cheese-filled momos with a melt-in-mouth texture.",
      image: "../assets/img/menu/cheese momos steam.jpg",
    },
    {
      id: 38,
      name: "Cheese Fried Momos",
      category: "filter-momos",
      price: 130,
      description: "Crispy and golden-fried cheese momos with a rich taste",
      image: "../assets/img/menu/veg cheese fried.jpg",
    },
    {
      id: 39,
      name: "Paneer Steam Momos",
      category: "filter-momos",
      price: 130,
      description: "Paneer-stuffed momos with a soft, juicy texture.",
      image: "../assets/img/menu/paneer steam momos.jpg",
    },
    {
      id: 40,
      name: "Paneer Fried Momos",
      category: "filter-momos",
      price: 130,
      description: "Deep-fried paneer dumplings with bold flavors.",
      image: "../assets/img/menu/paneer fried momos.png",
    },

    // Cold Beverages Section
    {
      id: 41,
      name: "Lassi",
      category: "filter-beverages",
      price: 60,
      description: "A refreshing, creamy yogurt drink with traditional flavors.",
      image: "../assets/img/menu/Salt_lassi.jpg",
    },
    {
      id: 42,
      name: "Masala chhaach",
      category: "filter-beverages",
      price: 60,
      description: "Spiced buttermilk perfect for cooling off.",
      image: "../assets/img/menu/chhach.jpg",
    },
    {
      id: 43,
      name: "Cold Coffee",
      category: "filter-beverages",
      price: 60,
      description: "Smooth, chilled coffee blended with milk and sugar.",
      image: "../assets/img/menu/cold coffe.webp",
    },
    {
      id: 44,
      name: "Nimbu Sikanji",
      category: "filter-beverages",
      price: 60,
      description: "A classic lemonade with a tangy twist.",
      image: "../assets/img/menu/Nimbu-Paani.webp",
    },
  ]
}

// Extract specials data from the main website
function extractSpecialsFromWebsite() {
  return [
    {
      id: 1,
      name: "Paneer Tikka",
      description: "Cottage cheese marinated in rich spices and grilled to perfection.",
      details: "Served with mint chutney, this smoky and flavorful dish is an all-time favorite.",
      image: "../assets/img/paneer-tikka.jpg",
    },
    {
      id: 2,
      name: "Dal Makhani",
      description: "A rich, buttery lentil dish slow-cooked for ultimate flavor.",
      details: "Best paired with fresh naan or kulcha, this dish is a treat for every vegetarian food lover.",
      image: "../assets/img/dal-makhani.jpg",
    },
    {
      id: 3,
      name: "Garlic Naan",
      description: "Soft naan infused with aromatic garlic butter.",
      details: "A perfect companion for all gravies and curries, baked to fluffy perfection.",
      image: "../assets/img/garlic-naan.jpg",
    },
    {
      id: 4,
      name: "Stuffed Kulcha",
      description: "Kulcha stuffed with spiced mashed potatoes and herbs.",
      details: "Served hot with butter and paired best with chole or dal makhani.",
      image: "../assets/img/stuffed-kulcha.jpg",
    },
    {
      id: 5,
      name: "Pudina Paratha",
      description: "Whole wheat paratha layered with fresh mint leaves.",
      details: "Light and flaky, this paratha enhances the flavors of every meal.",
      image: "../assets/img/pudina-paratha.jpg",
    },
  ]
}

// Extract gallery data from the main website
function extractGalleryFromWebsite() {
  return [
    {
      id: 1,
      image: "../assets/img/gallery/TAphotos-1.jpeg",
      alt: "Restaurant Image 1",
    },
    {
      id: 2,
      image: "../assets/img/gallery/TAphoto-2.jpeg",
      alt: "Restaurant Image 2",
    },
    {
      id: 3,
      image: "../assets/img/restaurant.jpeg",
      alt: "Restaurant Image 3",
    },
    {
      id: 4,
      image: "../assets/img/gallery/restaurant-2.jpg",
      alt: "Restaurant Image 4",
    },
    {
      id: 5,
      image: "../assets/img/gallery/restaurant-3.jpg",
      alt: "Restaurant Image 5",
    },
    {
      id: 6,
      image: "../assets/img/gallery/restaurant-4.jpg",
      alt: "Restaurant Image 6",
    },
    {
      id: 7,
      image: "../assets/img/gallery/restaurant-5.jpg",
      alt: "Restaurant Image 7",
    },
    {
      id: 8,
      image: "../assets/img/gallery/gallery-8.jpg",
      alt: "Restaurant Image 8",
    },
  ]
}

// Load menu data from localStorage or initialize with demo data
function loadMenuData() {
  const savedMenuData = localStorage.getItem("menuData")
  if (savedMenuData) {
    menuData = JSON.parse(savedMenuData)
  } else {
    // Initialize with demo data
    menuData = extractMenuItemsFromWebsite()
    saveMenuData()
  }

  // Update dashboard stats
  updateDashboardStats()

  // Populate dish select dropdown
  populateDishSelect()
}

// Load specials data from localStorage or initialize with demo data
function loadSpecialsData() {
  const savedSpecialsData = localStorage.getItem("specialsData")
  if (savedSpecialsData) {
    specialsData = JSON.parse(savedSpecialsData)
  } else {
    // Initialize with demo data
    specialsData = extractSpecialsFromWebsite()
    saveSpecialsData()
  }

  // Load specials into the UI
  loadSpecials()
}

// Load gallery data from localStorage or initialize with demo data
function loadGalleryData() {
  const savedGalleryData = localStorage.getItem("galleryData")
  if (savedGalleryData) {
    galleryData = JSON.parse(savedGalleryData)
  } else {
    // Initialize with demo data
    galleryData = extractGalleryFromWebsite()
    saveGalleryData()
  }

  // Load gallery into the UI
  loadGallery()
}

// Save menu data to localStorage
function saveMenuData() {
  localStorage.setItem("menuData", JSON.stringify(menuData))
  localStorage.setItem("lastUpdated", new Date().toISOString())
  updateDashboardStats()

  // Alert the user that changes have been saved
  console.log("Menu data saved to localStorage")
}

// Save specials data to localStorage
function saveSpecialsData() {
  localStorage.setItem("specialsData", JSON.stringify(specialsData))
  console.log("Specials data saved to localStorage")
}

// Save gallery data to localStorage
function saveGalleryData() {
  localStorage.setItem("galleryData", JSON.stringify(galleryData))
  console.log("Gallery data saved to localStorage")
}

// Update dashboard statistics
function updateDashboardStats() {
  // Count total menu items
  totalItemsElement.textContent = menuData.length

  // Count unique categories
  const categories = new Set(menuData.map((item) => item.category))
  totalCategoriesElement.textContent = categories.size

  // Show last updated time
  const lastUpdated = localStorage.getItem("lastUpdated")
  if (lastUpdated) {
    const date = new Date(lastUpdated)
    lastUpdatedElement.textContent = date.toLocaleString()
  } else {
    lastUpdatedElement.textContent = "Never"
  }
}

// Set up event listeners
function setupEventListeners() {
  // Login form submission
  loginForm.addEventListener("submit", handleLogin)

  // Logout button
  logoutBtn.addEventListener("click", handleLogout)

  // Tab navigation
  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const tabId = link.getAttribute("data-tab")
      switchTab(tabId)
    })
  })

  // Quick action buttons
  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")
      switchTab(tabId)
    })
  })

  // Category filter
  categoryFilter.addEventListener("change", filterMenuItems)

  // Save changes button
  saveChangesBtn.addEventListener("click", saveAllChanges)

  // Dish selection change
  dishSelect.addEventListener("change", updateCurrentImage)

  // Image upload preview
  imageUpload.addEventListener("change", previewImage)

  // Upload image button
  uploadImageBtn.addEventListener("click", handleImageUpload)

  // Add dish form submission
  addDishForm.addEventListener("submit", handleAddDish)

  // Add dish image preview
  dishImageInput.addEventListener("change", previewDishImage)

  // Save specials button
  saveSpecialsBtn.addEventListener("click", saveSpecialsChanges)

  // Save gallery button
  saveGalleryBtn.addEventListener("click", saveGalleryChanges)

  // Add gallery item
  addGalleryItem.addEventListener("click", () => {
    galleryUpload.click()
  })

  // Gallery upload
  galleryUpload.addEventListener("change", handleGalleryUpload)
}

// Handle login form submission
function handleLogin(e) {
  e.preventDefault()
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdminLoggedIn", "true")
    showAdminPanel()
  } else {
    loginError.textContent = "Invalid username or password"
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem("isAdminLoggedIn")
  showLoginForm()
}

// Show login form
function showLoginForm() {
  loginSection.style.display = "flex"
  adminSection.style.display = "none"
  // Clear login form
  loginForm.reset()
  loginError.textContent = ""
}

// Show admin panel
function showAdminPanel() {
  loginSection.style.display = "none"
  adminSection.style.display = "block"
  // Initialize admin panel
  loadMenuItems()
  populateDishSelect()
}

// Switch between tabs
function switchTab(tabId) {
  // Update active tab link
  tabLinks.forEach((link) => {
    if (link.getAttribute("data-tab") === tabId) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Show active tab content
  tabContents.forEach((content) => {
    if (content.id === tabId) {
      content.classList.add("active")
    } else {
      content.classList.remove("active")
    }
  })
}

// Load menu items into the menu items list
function loadMenuItems(category = "all") {
  menuItemsList.innerHTML = ""

  const filteredItems = category === "all" ? menuData : menuData.filter((item) => item.category === category)

  filteredItems.forEach((item) => {
    const menuItemCard = document.createElement("div")
    menuItemCard.className = "menu-item-card"
    menuItemCard.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-item-details">
                <h3>${item.name}</h3>
                <textarea class="description-input" data-id="${item.id}">${item.description}</textarea>
                <div class="price-input">
                    <span>₹</span>
                    <input type="number" id="price-${item.id}" value="${item.price}" min="0">
                </div>
                <p class="category-tag">${getCategoryName(item.category)}</p>
                <button class="remove-dish-btn" data-id="${item.id}"><i class="fas fa-trash"></i> Remove Dish</button>
            </div>
        `
    menuItemsList.appendChild(menuItemCard)

    // Add event listener for the remove button
    const removeBtn = menuItemCard.querySelector(".remove-dish-btn")
    removeBtn.addEventListener("click", () => {
      if (confirm(`Are you sure you want to remove ${item.name}?`)) {
        // Remove the dish from menuData
        menuData = menuData.filter((dish) => dish.id !== item.id)
        // Save the updated menu data
        saveMenuData()
        // Reload the menu items
        loadMenuItems(category)
        // Update the dish select dropdown
        populateDishSelect()
        // Show success message
        alert(`${item.name} has been removed successfully!`)
      }
    })
  })
}

// Load specials into the specials container
function loadSpecials() {
  specialsContainer.innerHTML = ""

  specialsData.forEach((special) => {
    const specialCard = document.createElement("div")
    specialCard.className = "special-card"
    specialCard.innerHTML = `
            <div class="special-image">
                <img src="${special.image}" alt="${special.name}">
            </div>
            <div class="special-details">
                <input type="text" class="special-name" data-id="${special.id}" value="${special.name}">
                <textarea class="special-description" data-id="${special.id}">${special.description}</textarea>
                <textarea class="special-details-text" data-id="${special.id}">${special.details}</textarea>
                <input type="file" class="special-image-upload" data-id="${special.id}" accept="image/*">
                <div class="preview-container">
                    <img class="special-image-preview" data-id="${special.id}" src="/placeholder.svg" alt="No image selected">
                </div>
            </div>
        `
    specialsContainer.appendChild(specialCard)

    // Add event listener for image upload
    const imageUpload = specialCard.querySelector(".special-image-upload")
    imageUpload.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const preview = specialCard.querySelector(".special-image-preview")
          preview.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    })
  })
}

// Load gallery into the gallery container
function loadGallery() {
  // Clear existing gallery items except the add button
  const galleryItems = galleryContainer.querySelectorAll(".gallery-item")
  galleryItems.forEach((item) => {
    galleryContainer.removeChild(item)
  })

  // Add gallery items
  galleryData.forEach((item) => {
    const galleryItem = document.createElement("div")
    galleryItem.className = "gallery-item"
    galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.alt}">
            <div class="overlay">
                <button class="replace-btn" data-id="${item.id}"><i class="fas fa-sync-alt"></i></button>
                <button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `
    galleryContainer.insertBefore(galleryItem, addGalleryItem)

    // Add event listeners for replace and delete buttons
    const replaceBtn = galleryItem.querySelector(".replace-btn")
    const deleteBtn = galleryItem.querySelector(".delete-btn")

    replaceBtn.addEventListener("click", () => {
      // Create a temporary file input
      const tempFileInput = document.createElement("input")
      tempFileInput.type = "file"
      tempFileInput.accept = "image/*"
      tempFileInput.style.display = "none"
      document.body.appendChild(tempFileInput)

      // Trigger click on the file input
      tempFileInput.click()

      // Handle file selection
      tempFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            // Update the gallery item image
            const img = galleryItem.querySelector("img")
            img.src = e.target.result

            // Update the gallery data
            const itemId = Number.parseInt(replaceBtn.getAttribute("data-id"))
            const galleryItem = galleryData.find((item) => item.id === itemId)
            if (galleryItem) {
              galleryItem.image = e.target.result
            }
          }
          reader.readAsDataURL(file)
        }

        // Remove the temporary file input
        document.body.removeChild(tempFileInput)
      })
    })

    deleteBtn.addEventListener("click", () => {
      const itemId = Number.parseInt(deleteBtn.getAttribute("data-id"))

      // Remove the gallery item from the UI
      galleryItem.remove()

      // Remove the gallery item from the data
      galleryData = galleryData.filter((item) => item.id !== itemId)
    })
  })
}

// Filter menu items by category
function filterMenuItems() {
  const category = categoryFilter.value
  loadMenuItems(category)
}

// Get category name from category ID
function getCategoryName(categoryId) {
  const categoryMap = {
    "filter-chinese": "Chinese",
    "filter-thali": "Thali",
    "filter-snacks": "Snacks",
    "filter-pasta": "Pasta",
    "filter-sandwich": "Sandwich",
    "filter-momos": "Momos",
    "filter-beverages": "Cold Beverages",
  }
  return categoryMap[categoryId] || "Unknown"
}

// Save all price changes
function saveAllChanges() {
  let hasChanges = false

  // Save price changes
  menuData.forEach((item) => {
    const priceInput = document.getElementById(`price-${item.id}`)
    if (priceInput) {
      const newPrice = Number.parseInt(priceInput.value)
      if (newPrice !== item.price) {
        item.price = newPrice
        hasChanges = true
      }
    }
  })

  // Save description changes
  const descriptionInputs = document.querySelectorAll(".description-input")
  descriptionInputs.forEach((input) => {
    const itemId = Number.parseInt(input.getAttribute("data-id"))
    const item = menuData.find((item) => item.id === itemId)
    if (item && input.value !== item.description) {
      item.description = input.value
      hasChanges = true
    }
  })

  if (hasChanges) {
    saveMenuData()
    alert("All changes have been saved successfully!")
  } else {
    alert("No changes detected.")
  }
}

// Populate dish select dropdown
function populateDishSelect() {
  dishSelect.innerHTML = '<option value="">Select a dish</option>'

  menuData.forEach((item) => {
    const option = document.createElement("option")
    option.value = item.id
    option.textContent = item.name
    dishSelect.appendChild(option)
  })
}

// Update current image when dish is selected
function updateCurrentImage() {
  const dishId = Number.parseInt(dishSelect.value)
  if (dishId) {
    const dish = menuData.find((item) => item.id === dishId)
    if (dish) {
      currentImage.src = dish.image
      currentImage.alt = dish.name
    }
  } else {
    currentImage.src = ""
    currentImage.alt = "No image selected"
  }
}

// Preview uploaded image
function previewImage() {
  const file = imageUpload.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.src = e.target.result
      imagePreview.alt = "Image Preview"
    }
    reader.readAsDataURL(file)
  } else {
    imagePreview.src = ""
    imagePreview.alt = "No image selected"
  }
}

// Preview dish image
function previewDishImage() {
  const file = dishImageInput.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      dishImagePreview.src = e.target.result
      dishImagePreview.alt = "Image Preview"
    }
    reader.readAsDataURL(file)
  } else {
    dishImagePreview.src = ""
    dishImagePreview.alt = "No image selected"
  }
}

// Handle image upload
function handleImageUpload() {
  const dishId = Number.parseInt(dishSelect.value)
  const file = imageUpload.files[0]

  if (!dishId) {
    showMessage(uploadMessage, "Please select a dish.", "error")
    return
  }

  if (!file) {
    showMessage(uploadMessage, "Please select an image to upload.", "error")
    return
  }

  // In a real application, this would upload the file to a server
  // For this demo, we'll use FileReader to convert the image to a data URL
  const reader = new FileReader()
  reader.onload = (e) => {
    const dish = menuData.find((item) => item.id === dishId)
    if (dish) {
      dish.image = e.target.result
      saveMenuData()
      showMessage(uploadMessage, "Image uploaded successfully!", "success")

      // Update current image
      currentImage.src = dish.image

      // Clear file input
      imageUpload.value = ""
      imagePreview.src = ""
      imagePreview.alt = "No image selected"
    }
  }
  reader.readAsDataURL(file)
}

// Handle add dish form submission
function handleAddDish(e) {
  e.preventDefault()

  // Get form values
  const name = dishNameInput.value
  const category = dishCategorySelect.value
  const price = Number.parseInt(dishPriceInput.value)
  const description = dishDescriptionInput.value
  const file = dishImageInput.files[0]

  if (!name || !category || !price || !description || !file) {
    showMessage(addDishMessage, "Please fill in all fields.", "error")
    return
  }

  // Generate a new ID
  const newId = menuData.length > 0 ? Math.max(...menuData.map((item) => item.id)) + 1 : 1

  // Convert image to data URL
  const reader = new FileReader()
  reader.onload = (e) => {
    // Create new dish object
    const newDish = {
      id: newId,
      name,
      category,
      price,
      description,
      image: e.target.result,
    }

    // Add to menu data
    menuData.push(newDish)
    saveMenuData()

    // Update dish select dropdown
    populateDishSelect()

    // Show success message
    showMessage(addDishMessage, "Dish added successfully!", "success")

    // Reset form
    addDishForm.reset()
    dishImagePreview.src = ""
    dishImagePreview.alt = "No image selected"
  }
  reader.readAsDataURL(file)
}

// Save specials changes
function saveSpecialsChanges() {
  let hasChanges = false

  // Save name changes
  const nameInputs = document.querySelectorAll(".special-name")
  nameInputs.forEach((input) => {
    const specialId = Number.parseInt(input.getAttribute("data-id"))
    const special = specialsData.find((special) => special.id === specialId)
    if (special && input.value !== special.name) {
      special.name = input.value
      hasChanges = true
    }
  })

  // Save description changes
  const descriptionInputs = document.querySelectorAll(".special-description")
  descriptionInputs.forEach((input) => {
    const specialId = Number.parseInt(input.getAttribute("data-id"))
    const special = specialsData.find((special) => special.id === specialId)
    if (special && input.value !== special.description) {
      special.description = input.value
      hasChanges = true
    }
  })

  // Save details changes
  const detailsInputs = document.querySelectorAll(".special-details-text")
  detailsInputs.forEach((input) => {
    const specialId = Number.parseInt(input.getAttribute("data-id"))
    const special = specialsData.find((special) => special.id === specialId)
    if (special && input.value !== special.details) {
      special.details = input.value
      hasChanges = true
    }
  })

  // Save image changes
  const imagePreviewElements = document.querySelectorAll(".special-image-preview")
  imagePreviewElements.forEach((preview) => {
    if (preview.src && preview.src !== "" && preview.src !== "data:,") {
      const specialId = Number.parseInt(preview.getAttribute("data-id"))
      const special = specialsData.find((special) => special.id === specialId)
      if (special) {
        special.image = preview.src
        hasChanges = true
      }
    }
  })

  if (hasChanges) {
    saveSpecialsData()
    alert("Specials have been updated successfully!")
  } else {
    alert("No changes detected.")
  }
}

// Save gallery changes
function saveGalleryChanges() {
  saveGalleryData()

  // Log the gallery data for debugging
  console.log("Gallery data saved:", galleryData)

  // Force a refresh of the gallery on the main website
  // In a real application, this would be handled by a server-side update
  // For this demo, we're using localStorage which is already updated by saveGalleryData()

  alert("Gallery has been updated successfully! The changes will be visible on the main website.")
}

// Handle gallery upload
function handleGalleryUpload(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      // Generate a new ID
      const newId = galleryData.length > 0 ? Math.max(...galleryData.map((item) => item.id)) + 1 : 1

      // Create new gallery item
      const newGalleryItem = {
        id: newId,
        image: e.target.result,
        alt: "Restaurant Image",
      }

      // Add to gallery data
      galleryData.push(newGalleryItem)

      // Reload gallery
      loadGallery()

      // Clear file input
      galleryUpload.value = ""
    }
    reader.readAsDataURL(file)
  }
}

// Show message
function showMessage(element, message, type) {
  element.textContent = message
  element.className = "message"
  if (type === "success") {
    element.classList.add("success-message")
  } else if (type === "error") {
    element.classList.add("error-message")
  }

  // Clear message after 3 seconds
  setTimeout(() => {
    element.textContent = ""
    element.className = "message"
  }, 3000)
}

// Initialize the admin panel
document.addEventListener("DOMContentLoaded", init)
