// ------------- Profile Settings  ------------- //
const defaultProfile = {
  allergies: [],
  dietaryRestrictions: [],
  recipeDifficulty: [],
  pantrySettings: {},
  shoppingListRecipe: []
};

function loadProfileSettings() {
  try {
    const raw = localStorage.getItem('profileSettings');
    if (!raw) return { ...defaultProfile };

    const data = JSON.parse(raw) || {};

    const allergies = Array.isArray(data.allergies) ? data.allergies : [];

    const dietaryRestrictions = Array.isArray(data.dietaryRestrictions)
      ? data.dietaryRestrictions : (typeof data.dietaryRestrictions === 'string' && data.dietaryRestrictions
          ? [data.dietaryRestrictions] : []);

    const recipeDifficulty = Array.isArray(data.recipeDifficulty) ? data.recipeDifficulty : [];

    return {
      ...defaultProfile,
      ...data,
      allergies,
      dietaryRestrictions,
      recipeDifficulty
    };
  } catch (e) {
    return { ...defaultProfile };
  }
}

function saveProfileSettings(settings) {
  const merged = {
    ...loadProfileSettings(),
    ...settings
  };

  localStorage.setItem('profileSettings', JSON.stringify(merged));
}

function initProfileForm() {
  const form = document.getElementById('profileForm');
  if (!form) return;

  const settings = loadProfileSettings();
  const allergiesInput = document.getElementById('allergiesInput');
  const dietCheckboxes = form.querySelectorAll('input[name="dietary"]');
  const diffCheckboxes = form.querySelectorAll('input[name="difficulty"]');
  const statusEl = document.getElementById('profileSaveStatus');

  if (allergiesInput) {
    allergiesInput.value = (settings.allergies || []).join('\n');
  }

  dietCheckboxes.forEach(cb => {
    cb.checked = settings.dietaryRestrictions.includes(cb.value);
  });

  diffCheckboxes.forEach(cb => {
    cb.checked = settings.recipeDifficulty.includes(cb.value);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const rawAllergies = (allergiesInput.value || '');
    const allergies = rawAllergies
      .split(/[\n,]/)
      .map(v => v.trim())
      .filter(v => v.length > 0);

    const dietaryRestrictions = Array.from(dietCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const recipeDifficulty = Array.from(diffCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    saveProfileSettings({
      allergies,
      dietaryRestrictions,
      recipeDifficulty
    });

    const filtered = filterRecipes(recipes);
    document.getElementById("recipeCards").innerHTML =
      filtered.length
        ? recipeCardsStr(filtered)
        : "<h3 class='notfound'>No recipes found</h3>";

    if (statusEl) {
      statusEl.textContent = 'Preferences saved.';
      setTimeout(() => {
        statusEl.textContent = '';
      }, 2000);
    }
  });
}

// ------------- Navigation  ------------- //
function openTab(tabName, elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.color = "";

  }
  document.getElementById(tabName).style.display = "block";
  elmnt.style.color = "#7b70e3";

}
// Defaults to the insights page
document.getElementById("defaultOpen").click();


// ------------- Recipe Search ------------- //
recipes = [
  {
    "name": "Chicken Parmesan",
    "ingredients": ["Chicken", "Tomato Sauce", "Spaghetti", "Parmesan"],
    "time": "40 min",
    "time_min": 40,
    "difficulty": "Easy",
    "difficulty_num": 1,
    "img_src": "images/recipes/baked-chicken-parmesan-24.jpg",
    "calories": 400,
    "diet_tags": ["gluten_free"],
  },
  {
    "name": "Beef Wellington",
    "ingredients": ["Beef", "Wellington :)"],
    "time": "2 hrs",
    "time_min": 120,
    "difficulty": "Difficult",
    "difficulty_num": 3,
    "img_src": "images/recipes/beef-wellington.jpg",
    "calories": 200,
    "diet_tags": ["gluten_free", "halal"],
  },
  {
    "name": "Blueberry Smoothie",
    "ingredients": ["Blueberries", "Milk", "Sugar", "Lemon Juice"],
    "time": " 5 min",
    "time_min": 5,
    "difficulty": "Easy",
    "difficulty_num": 1,
    "img_src": "images/recipes/blueberry-smth.jpg",
    "calories": 300,
    "diet_tags": ["pescatarian", "vegetarian", "vegan", "gluten_free", "kosher", "halal"],

  },
  {
    "name": "Chicken Alfredo",
    "ingredients": ["Chicken", "Fettucine", "Garlic"],
    "time": "1 hr",
    "time_min": 60,
    "difficulty": "Medium",
    "difficulty_num": 2,
    "img_src": "images/recipes/alfredo.jpg",
    "calories": 700,
    "diet_tags": ["kosher"],
  },
  {
    "name": "Grilled Salmon",
    "ingredients": ["Salmon", "Lemon", "Olive Oil", "Garlic"],
    "time": "25 min",
    "time_min": 25,
    "difficulty": "Medium",
    "difficulty_num": 2,
    "img_src": "images/recipes/grilled-salmon-3.jpg",
    "calories": 500,
    "diet_tags": ["pescatarian", "gluten_free", "halal"],
  },
  {
    "name": "Vegetable Stir Fry",
    "ingredients": ["Broccoli", "Carrots", "Soy Sauce", "Tofu"],
    "time": "20 min",
    "time_min": 20,
    "difficulty": "Easy",
    "difficulty_num": 1,
    "img_src": "images/recipes/veggie-stirfry.jpg",
    "calories": 350,
    "diet_tags": ["vegetarian", "vegan", "gluten_free", "kosher"],
  },
  {
    "name": "Shrimp Tacos",
    "ingredients": ["Shrimp", "Tortilla", "Cabbage", "Lime"],
    "time": "30 min",
    "time_min": 30,
    "difficulty": "Medium",
    "difficulty_num": 2,
    "img_src": "images/recipes/shrimp-tacos.jpg",
    "calories": 450,
    "diet_tags": ["pescatarian", "halal"],
  },
  {
    "name": "Chocolate Lava Cake",
    "ingredients": ["Chocolate", "Flour", "Butter", "Sugar", "Eggs"],
    "time": "45 min",
    "time_min": 45,
    "difficulty": "Difficult",
    "difficulty_num": 3,
    "img_src": "images/recipes/choco-lava.jpg",
    "calories": 600,
    "diet_tags": ["vegetarian", "kosher"],
  },
]

// Like a recipe/give a heart
function likeRecipe(index) {
  document.querySelectorAll('#heart')[index].style.color = document.querySelectorAll('#heart')[index].style.color == "red"? "#787879" : "red"
}

function addToShoppingFromRecipe(ingredient, amount) {
  const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  shoppingList.push({ ingredient, amount });
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  renderShoppingList();
}

function filterRecipes(recipes) {
  let settings = loadProfileSettings();
  let allergies = (settings.allergies || []).map(a => a.toLowerCase());
  let diet_rest = settings.dietaryRestrictions || [];
  let allowed_difficulties = settings.recipeDifficulty || [];

  let filteredRecipes = recipes.filter(recipe => {
    let hasAllergy = recipe.ingredients.some(ing => allergies.includes(String(ing).toLowerCase()));
    if (hasAllergy) return false;
    if (diet_rest.length > 0) {
      const recipeTags = recipe.diet_tags || [];
      const matchesDiet = diet_rest.every(tag =>
        recipeTags.includes(tag)
      );
      if (!matchesDiet) return false;
    }
    
    if (allowed_difficulties.length > 0) {
      if (!allowed_difficulties.includes(recipe.difficulty)) return false;
    }
    return true;
  });

  return filteredRecipes;
}

function recipeCardsStr(recipes){
  let recipeCards = ``;
  for (let i = 0; i < recipes.length; i++) {
    recipeCards += recipeCard(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].difficulty, recipes[i].img_src, recipes[i].calories, i)
  }
  return recipeCards
}


function recipeCard(name, ingredients, time, difficulty, src, calories, index) {
  ingredients = ingredients.length >= 3 ? ingredients.slice(0, 3).join(', ') + '...' : ingredients = ingredients.join(', ');
  return `
    <div class="recipe-card" id=${index}>
      <div class="recipe-img" style="background-image: url('${src}');"></div>

      <div class="recipe-content">
        <h3 class='recipe-header'>${name} <i class="fas fa-heart recipe-heart" onclick="likeRecipe(${index})" id='heart'></i></h3>
        <div class="recipe-info">
          <div class="info-item">
            <i class="fas fa-utensils recipe-icon"></i> ${ingredients}
          </div>
          <div class="info-item">
            <i class="fas fa-clock recipe-icon"></i> ${time} (${difficulty})
          </div>
          <div class="info-item">
            <i class="fas fa-bolt recipe-icon"></i> ${calories} Cal.
          </div>
        </div>
        <button class="btn" onclick="focusedRecipe(${index})">See Recipe</button>
      </div>
    </div>
  `;
}

function focusedRecipe(index) {
  const recipe = recipes[index];

  document.getElementById("currentRecipe").innerHTML = `

    <div class="focused-recipe-card">
      <div class='close-bar'><h1>${recipe.name}</h1> <button onclick="openTab('Recipes')" class='close-btn'>Close <i class="fas fa-close"></i></button></div>
      <div class="focusedRecipe-img" style="background-image: url('${recipe.img_src}');"></div>
      <div class="recipe-icons">
        <div><i class="fas fa-clock recipe-icon"></i> ${recipe.time} - ${recipe.calories} calories</div>
        <div class="icon-actions"><i class="fas fa-heart recipe-icon" id='heart' onclick="console.log(${index})"></i><i class="fas fa-share-alt recipe-icon"></i></div>
      </div>
      <h2>Ingredients</h2>
      <ul class="focused-ingredients">
        ${recipe.ingredients.map((e) => {
          const amount = Math.floor(Math.random() * (16 - 3 + 1)) + 1;
          return `
            <div class='recipe-ingredient'>
              <div>- ${amount} oz ${e}</div>
              <button class="btn" onclick="addToShoppingFromRecipe('${e}', ${amount})">
                Add to Cart <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          `;
        }).join('')}
      </ul>
      <h2>Instructions</h2>
      <p class="focused-instructions">
        Lorem ipsum taco bell orange Lorem ipsum taco bell orangeLorem ipsum taco bell orangeLorem ipsum taco bell orange</br></br>
        Lorem ipsum taco bell orange Lorem ipsum taco bell orangeLorem ipsum taco bell orangeLorem ipsum taco bell orange</br></br>
        Lorem ipsum taco bell orange Lorem ipsum taco bell orangeLorem ipsum taco bell orangeLorem ipsum taco bell orange</br></br>
        Lorem ipsum taco bell orange Lorem ipsum taco bell orangeLorem ipsum taco bell orangeLorem ipsum taco bell orange</br></br>
        Lorem ipsum taco bell orange Lorem ipsum taco bell orangeLorem ipsum taco bell orangeLorem ipsum taco bell orange ding ding ding</br></br>
      </p>
    </div>
  `;

  openTab('focusedRecipe');
}

let filteredRecipes = filterRecipes(recipes)
document.getElementById("recipeCards").innerHTML = recipeCardsStr(filteredRecipes);

// Recipe Filter On Search
const inputField = document.getElementById("recipeSearch");

inputField.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase().trim();

  let filteredRecipes = filterRecipes(recipes)

  filteredRecipes = filteredRecipes.filter(recipe => {
    const combined = (
      recipe.name + " " +
      recipe.ingredients.join(", ") + " " +
      recipe.time + " " +
      recipe.difficulty
    ).toLowerCase();

    return combined.includes(value);
  });


  let recipeCards = recipeCardsStr(filteredRecipes)
  
  if (recipeCards === "") {
    recipeCards = "<h3 class='notfound'>No recipes found</h3>"
  }

  document.getElementById("recipeCards").innerHTML = recipeCards;
});

const filter = document.getElementById('filter');

filter.addEventListener('change', (event) => {
  const selected = event.target.value;
  let recipeCards = ``;
  let new_recipes = []

  let filteredRecipes = filterRecipes(recipes)

  if (selected == 'Diff') new_recipes = filteredRecipes.sort((a, b) => a.difficulty_num - b.difficulty_num);
  else if (selected == 'Time') new_recipes = filteredRecipes.sort((a, b) => a.time_min - b.time_min);
  else if (selected == 'Cals') new_recipes = filteredRecipes.sort((a, b) => a.calories - b.calories);
  else new_recipes = filteredRecipes

  document.getElementById("recipeCards").innerHTML = recipeCardsStr(new_recipes);
});


// ------------- Fake Keyboard ------------- //
function openKeyboard() {
  document.getElementById('keyboard').style.display = "block";
}

function closeKeyboard() {
  document.getElementById('keyboard').style.display = "none";
}

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    closeKeyboard()
  }
});

// --- Shopping List --- //

let shoppingList = [];
let itemPurchaseHistory = {};
let shoppingPresets = {};

// loads all data from local stroage
function loadAllShoppingData() {
  // load the main list
  shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  // load purchase history
  itemPurchaseHistory = JSON.parse(localStorage.getItem("itemPurchaseHistory")) || {};
  // load presets
  shoppingPresets = JSON.parse(localStorage.getItem("shoppingPresets")) || {};
  // initial render
  renderShoppingList();
  renderTopItems();
  updatePresetDropdown();
}

function saveShoppingList() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

function renderShoppingList() {
  
  const listElement = document.getElementById("todoList");
  listElement.innerHTML = ""; 

  if (shoppingList.length === 0) {
    listElement.innerHTML = "<li class='empty-list'>Your shopping list is empty.</li>";
    return;
  }

  shoppingList.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.id = item.id; // store item ID on the element

    if (item.checked) {
      li.classList.add("checked");
    }

    li.innerHTML = `
      <span class="item-text">${item.text}</span>
      <div class="qty-controls">
        <div class="qty">${item.qty}</div>
        <i class="fas fa-minus icon-pm" onclick="changeQty(this, -1)"></i>
        <i class="fas fa-plus icon-pm" onclick="changeQty(this, 1)"></i>
      </div>
      <span class="close-item" onclick="deleteItem(this)">&times;</span>
    `;
    
    listElement.appendChild(li);
  });
}

function newElement(itemName = null) {
  const input = document.getElementById("todoInput");
  const value = (itemName || input.value).trim();
  
  if (!value) {
    if (!itemName) alert("You must write something!");
    return;
  }
  
  const existingItem = shoppingList.find(item => item.text.toLowerCase() === value.toLowerCase());
  
  if (existingItem) {
    // just increase quantity
    existingItem.qty += 1;
  } else {
    // create new item
    const newItem = {
      id: Date.now(),
      text: value,
      qty: 1,
      checked: false
    };
    shoppingList.push(newItem);
  }

  saveShoppingList();
  renderShoppingList();
  input.value = ""; 
}

function changeQty(icon, delta) {
  const li = icon.closest('li');
  const id = Number(li.dataset.id);
  const item = shoppingList.find(i => i.id === id);

  if (item) {
    item.qty += delta;
    if (item.qty < 1) {
      item.qty = 1; 
    }
    saveShoppingList();
    renderShoppingList(); 
  }
}

function deleteItem(closeButton) {
  const li = closeButton.closest('li');
  const id = Number(li.dataset.id);
  
  shoppingList = shoppingList.filter(item => item.id !== id);
  
  saveShoppingList();
  renderShoppingList();
}

function toggleChecked(li) {
  const id = Number(li.dataset.id);
  const item = shoppingList.find(i => i.id === id);
  
  if (item) {
    item.checked = !item.checked;
    
    if (item.checked) {
      updatePurchaseHistory(item.text);
    }

    saveShoppingList();
    renderShoppingList();
  }
}

document.getElementById('todoList').addEventListener('click', function(ev) {
  const li = ev.target.closest('li');
  if (li && !ev.target.closest('.qty-controls') && !ev.target.closest('.close-item')) {
    toggleChecked(li);
  }
});


function addToShoppingFromRecipe(ingredient, amount) {

  // check if item already exists
  const existingItem = shoppingList.find(item => item.text.toLowerCase() === ingredient.toLowerCase());
  
  if (existingItem) {
    existingItem.qty += amount;
  } else {
    const newItem = {
      id: Date.now(),
      text: ingredient,
      qty: amount,
      checked: false
    };
    shoppingList.push(newItem);
  }
  
  saveShoppingList();
  renderShoppingList();
  alert(`Added ${amount} ${ingredient} to your shopping list!`);
}


// most bought
function updatePurchaseHistory(itemName) {
  const key = itemName.toLowerCase().trim();
  itemPurchaseHistory[key] = (itemPurchaseHistory[key] || 0) + 1;
  localStorage.setItem("itemPurchaseHistory", JSON.stringify(itemPurchaseHistory));
  renderTopItems();
}

function renderTopItems() {
  const container = document.getElementById("topItemsContainer");
  container.innerHTML = "";

  const sortedItems = Object.entries(itemPurchaseHistory)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3);

  if (sortedItems.length === 0) {
    container.innerHTML = "<span class_='empty-list'>Buy items to see your top 3!</span>";
    return;
  }

  sortedItems.forEach(([name]) => {
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    const button = document.createElement("button");
    button.className = "top-item-btn";
    button.innerHTML = `<i class="fas fa-plus"></i> ${displayName}`;
    button.onclick = () => newElement(displayName);
    container.appendChild(button);
  });
}


// shopping preset
function updatePresetDropdown() {
  const select = document.getElementById("presetSelect");
  select.innerHTML = '<option value="">Select Preset</option>'; // Clear old options
  
  Object.keys(shoppingPresets).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

function saveCurrentListAsPreset() {
  const input = document.getElementById("presetNameInput");
  const name = input.value.trim();
  
  if (!name) {
    alert("Please enter a name for your preset.");
    return;
  }
  
  if (shoppingList.length === 0) {
    alert("Cannot save an empty list as a preset.");
    return;
  }
  
  shoppingPresets[name] = [...shoppingList];
  localStorage.setItem("shoppingPresets", JSON.stringify(shoppingPresets));
  
  updatePresetDropdown();
  input.value = "";
  alert(`Preset "${name}" saved!`);
}

function loadSelectedPreset() {
  const select = document.getElementById("presetSelect");
  const name = select.value;
  
  if (!name) {
    alert("Please select a preset to load.");
    return;
  }
  
  if (confirm(`This will replace your current list with the "${name}" preset. Are you sure?`)) {
    shoppingList = shoppingPresets[name].map(item => ({
      ...item,
      id: Date.now() + Math.random() // new ID
    }));
    
    saveShoppingList();
    renderShoppingList();
  }
}


// ------------- Pantry Ingredients ------------- //
ingredients = [
  {
    "name": "Chicken",
    "expiration": new Date('11/27/2025'),
    "amount": "2 pounds"
  },
  {
    "name": "Grapes",
    "expiration": new Date('11/7/2025'),
    "amount": "1"
  },
  {
    "name": "Onion",
    "expiration": new Date('12/3/2025'),
    "amount": "1"
  },
  {
    "name": "Eggs",
    "expiration": new Date('12/10/2025'),
    "amount": "12"
  },
  {
    "name": "Tomato Sauce",
    "expiration": new Date('5/1/2026'),
    "amount": "1"
  },
  {
    "name": "Milk",
    "expiration": new Date('11/1/2025'),
    "amount": "1"
  },
  {
    "name": "Honey Yogurt",
    "expiration": new Date('11/19/2025'),
    "amount": "1"
  },
  {
    "name": "Spaghetti",
    "expiration": new Date('1/1/2028'),
    "amount": "2 boxes"
  },
  {
    "name": "Green Salad Mix",
    "expiration": new Date('12/18/2025'),
    "amount": "1"
  },
  {
    "name": "Onion and Chive Cream Cheese",
    "expiration": new Date('12/2/2025'),
    "amount": "1"
  },
  {
    "name": "Parmesan",
    "expiration": new Date('12/31/2025'),
    "amount": "1 Cup"
  },
  {
    "name": "Coconut Milk",
    "expiration": new Date('12/1/2026'),
    "amount": "1"
  },
  {
    "name": "Dots Pretzels",
    "expiration": new Date('2/16/2026'),
    "amount": "1"
  },
  {
    "name": "Shin Ramen",
    "expiration": new Date('3/18/2026'),
    "amount": "4"
  }
]

ingredients.sort((a, b) => a.expiration - b.expiration);

function ingredientCard(name, expiration, amount, index) {
  const today = new Date();
  const diffTime = expiration - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms → days

  let expirationText = "";

  if (diffDays < 0) {
    expirationText = "<span style='color: red; font-weight: bold;'>Expired</span>";
  } else if (diffDays === 0) {
    expirationText = "<span style='color: orange; font-weight: bold;'>Expires today!</span>";
  } else if (diffDays === 1) {
    expirationText = "<span style='color: #FEC20C; font-weight: bold;'>1 day left</span>";
  } else {
    expirationText = `<span style='color: green; font-weight: bold;'>${diffDays} days left</span>`;
  }

  return `
    <div class="ingredient-card" onclick="showEditIngredientModal(${index})" style="cursor: pointer; position: relative;">
      <button onclick="event.stopPropagation(); deleteIngredient(${index})" style="position: absolute; top: 10px; right: 10px; background: #afaaaaff; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer; font-weight: bold; font-size: 24px; line-height: 1;">x</button>
      <h3>${name}</h3>
      <p>${expirationText}</p>
      <p>Quantity: ${amount}</p>
    </div>
  `;
}

function displayIngredients(ingredientsList) {
  let ingredientCards = ``;
  for (let i = 0; i < ingredientsList.length; i++) {
    ingredientCards += ingredientCard(
      ingredientsList[i].name,
      ingredientsList[i].expiration,
      ingredientsList[i].amount,
      i
    );
  }
  document.getElementById("ingredientCards").innerHTML = ingredientCards;
}

displayIngredients(ingredients);

// Pantry Search Feature
const ingredientSearchField = document.getElementById("searchIngredient");

ingredientSearchField.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase().trim();

  let filteredIngredients = ingredients.filter(ingredient => {
    const combined = (
      ingredient.name + " " +
      ingredient.amount
    ).toLowerCase();

    return combined.includes(value);
  });

  displayIngredients(filteredIngredients);
});

ingredientSearchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    closeKeyboard();
  }
});

function showAddIngredientModal() {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div class="ingredient-card-add-edit">
      <div class="ingredient-card-add-edit-inner">
        <h3 style="margin-top: 0;">Add New Ingredient</h3>
        <input type="text" id="modalName" class="modalName" placeholder="Name">
        <input type="date" id="modalDate" class="modalDate">
        <input type="text" id="modalAmount" class="modalAmount" placeholder="Amount (e.g., 2 pounds)">
        <div style="display: flex; gap: 10px; margin-top: 15px;">
          <button id="modalCancel" class="modalCancel">Cancel</button>
          <button id="modalAdd" class="modalSave">Add</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Focus on the name input
  setTimeout(() => document.getElementById('modalName').focus(), 100);
  
  document.getElementById('modalAdd').onclick = function() {
    const name = document.getElementById('modalName').value.trim();
    const dateStr = document.getElementById('modalDate').value;
    const amount = document.getElementById('modalAmount').value.trim();
    
    if (!name || !dateStr || !amount) {
      alert('All fields are required!');
      return;
    }
    
    ingredients.push({
      name: name,
      expiration: new Date(dateStr),
      amount: amount
    });
    
    ingredients.sort((a, b) => a.expiration - b.expiration);
    displayIngredients(ingredients);
    
    document.body.removeChild(modal);
  };
  
  document.getElementById('modalCancel').onclick = function() {
    document.body.removeChild(modal);
  };
  
  modal.onclick = function(e) {
    if (e.target === modal.querySelector('.ingredient-card-add-edit')) {
      document.body.removeChild(modal);
    }
  };
}

function showEditIngredientModal(index) {
  const ingredient = ingredients[index];
  
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div class="ingredient-card-add-edit">
      <div class="ingredient-card-add-edit-inner">
        <h3 style="margin-top: 0;">Edit Ingredient</h3>
        <input type="text" id="modalName" class="modalName" placeholder="Name" value="${ingredient.name}">
        <input type="date" id="modalDate" class="modalDate" value="${ingredient.expiration.toISOString().split('T')[0]}">
        <input type="text" id="modalAmount" class="modalAmount" placeholder="Amount (e.g., 2 pounds)" value="${ingredient.amount}">
        <div style="display: flex; gap: 10px; margin-top: 15px;">
          <button id="modalCancel" class="modalCancel">Cancel</button>  
          <button id="modalSave" class="modalSave">Save</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Focus on the name input
  setTimeout(() => document.getElementById('modalName').focus(), 100);
  
  document.getElementById('modalSave').onclick = function() {
    const name = document.getElementById('modalName').value.trim();
    const dateStr = document.getElementById('modalDate').value;
    const amount = document.getElementById('modalAmount').value.trim();
    
    if (!name || !dateStr || !amount) {
      alert('All fields are required!');
      return;
    }
    
    ingredients[index] = {
      name: name,
      expiration: new Date(dateStr),
      amount: amount
    };
    
    ingredients.sort((a, b) => a.expiration - b.expiration);
    displayIngredients(ingredients);
    
    document.body.removeChild(modal);
  };
  
  document.getElementById('modalCancel').onclick = function() {
    document.body.removeChild(modal);
  };
  
  modal.onclick = function(e) {
    if (e.target === modal.querySelector('.ingredient-card-add-edit')) {
      document.body.removeChild(modal);
    }
  };
}

function deleteIngredient(index) {
  if (confirm(`Are you sure you want to delete ${ingredients[index].name}?`)) {
    ingredients.splice(index, 1);
    displayIngredients(ingredients);
  }
}

//filtering
const ingredientFilter = document.getElementById('ingredientFilter');
ingredientFilter.addEventListener('change', (event) => {
  const selected = event.target.value;
  let new_ingredients = [];

  if (selected === 'Expiration') {
    new_ingredients = ingredients.sort((a, b) => a.expiration - b.expiration);
  } else if (selected === 'A-Z') {
    new_ingredients = ingredients.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selected === 'Quantity') {
    new_ingredients = ingredients.sort((a, b) => a.amount.localeCompare(b.amount));
  } else {
    new_ingredients = ingredients;
  }

  displayIngredients(new_ingredients);
});

// ------------- Insights ------------- //

function updateInsights() {
  const recipeTitle =
    document.querySelector('#recipeCards .title, #recipeCards h3, #recipeCards .recipe-title');
  const insightRecipes = document.getElementById('insightRecipes');
  if (insightRecipes) {
    insightRecipes.textContent = recipeTitle && recipeTitle.textContent.trim()
      ? `Top Recipe: ${recipeTitle.textContent.trim()}`
      : 'Top Recipe: None found :(';
  }

  const insightShopping = document.getElementById('insightShopping');
  if (insightShopping) {
    const li = document.querySelector('#todoList li:not(.checked)');
    let text = '';
    if (li) {
      let node = li.firstChild;
      while (node && !node.textContent.trim()) {
        node = node.nextSibling;
      }
      if (node) text = node.textContent.trim();
    }
    insightShopping.textContent = text
      ? `Next Item: ${text}`
      : 'Next Item: Add something to your list';
  }

  const insightPantry = document.getElementById('insightPantry');
  if (insightPantry) {
    const arr = Array.isArray(window.ingredients) ? window.ingredients : [];
    let soonestItem = null;
    let soonestDate = null;

    for (let i = 0; i < arr.length; i++) {
      const it = arr[i];
      if (!it || !it.expiration) continue;
      const d = new Date(it.expiration);
      if (isNaN(d)) continue;
      if (soonestDate === null || d < soonestDate) {
        soonestDate = d;
        soonestItem = it;
      }
    }

    if (soonestItem) {
      insightPantry.textContent =
        `Expiring Next: ${soonestItem.amount} of ${soonestItem.name} on ${soonestItem.expiration}`;
    } else {
      insightPantry.textContent = 'Expiring Next: Nothing :)';
    }
  }
}

function linkInsights() {
  document.querySelectorAll('.insight-card-link').forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.getAttribute('data-jumptab');
      if (typeof openTab === 'function' && tab) {
        openTab(tab);
      }
    });
  });
}

// Run once on page load
document.addEventListener('DOMContentLoaded', () => {
  updateInsights();
  linkInsights();
  initProfileForm();
  loadAllShoppingData();
});

// Refresh when the user navigates back to insights
document.addEventListener('click', e => {
  const el = e.target.closest('button, [data-tab]');
  if (!el) return;
  const goesToInsights =
    (el.getAttribute && el.getAttribute('data-tab') === 'Insights') ||
    /Insights/i.test(el.textContent || '');
  if (goesToInsights) {
    setTimeout(updateInsights, 0);
  }
});
