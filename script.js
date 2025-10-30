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
    "difficulty": "Easy",
    "img_src": "images/recipes/baked-chicken-parmesan-24.jpg"
  },
  {
    "name": "Beef Wellington",
    "ingredients": ["Beef", "Wellington :)"],
    "time": "2 hrs",
    "difficulty": "Hard",
    "img_src": "images/recipes/beef-wellington.jpg"
  },
  {
    "name": "Blueberry Smoothie",
    "ingredients": ["Blueberries", "Milk", "Sugar", "Lemon Juice"],
    "time": " 5 min",
    "difficulty": "Easy",
    "img_src": "images/recipes/blueberry-smth.jpg"
  },
  {
    "name": "Chicken Alfredo",
    "ingredients": ["Chicken", "Fettucine", "Garlic"],
    "time": "1 hr",
    "difficulty": "Medium",
    "img_src": "images/recipes/alfredo.jpg"
  },
]

// Like a recipe/give a heart
function likeRecipe(index) {

  if (document.querySelectorAll('#heart')[index].style.color == "red") {
    document.querySelectorAll('#heart')[index].style.color = "#787879";
  }
  else {
    document.querySelectorAll('#heart')[index].style.color = "red";
  }
}

function recipeCard(name, ingredients, time, difficulty, src, index) {
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
      <p><strong>Time:</strong> ${recipe.time}</p>
      <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
      <h2>Ingredients</h2>
      <ul class="focused-ingredients">
      ${recipe.ingredients.map((e) => `<li>${e}</li>`)}
      </ul>
      
      <h2>Instructions</h2>
      <p class="focused-instructions">

        rerrrrrrrrrrrrrrr </br>

        rerrrrrrrrrrrrrrr

        rerrrrrrrrrrrrrrr

        rerrrrrrrrrrrrrrr

        rerrrrrrrrrrrrrrr
      
      
      
      
      
      </p>
     
      

    </div>
  `;

  openTab('focusedRecipe');
}



let recipeCards = ``;
for (let i = 0; i < recipes.length; i++) {
  recipeCards += recipeCard(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].difficulty, recipes[i].img_src,  i)
}

document.getElementById("recipeCards").innerHTML = recipeCards;

// Recipe Filter On Search
const inputField = document.getElementById("recipeSearch");

inputField.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase().trim();

  let filteredRecipes = recipes.filter(recipe => {
    const combined = (
      recipe.name + " " +
      recipe.ingredients.join(", ") + " " +
      recipe.time + " " +
      recipe.difficulty
    ).toLowerCase();

    return combined.includes(value);
  });

  let recipeCards = "";
  for (let i = 0; i < filteredRecipes.length; i++) {
    recipeCards += recipeCard(
      filteredRecipes[i].name,
      filteredRecipes[i].ingredients,
      filteredRecipes[i].time,
      filteredRecipes[i].difficulty,
      filteredRecipes[i].img_src,
      i
    );
  }
  if (recipeCards === ""){
    recipeCards = "<h3 class='notfound'>No recipes found</h3>"
  }

  document.getElementById("recipeCards").innerHTML = recipeCards;
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

function changeQty(icon, delta) {
  const qtyDiv = icon.parentElement.querySelector('.qty');
  let qty = parseInt(qtyDiv.textContent);
  qty += delta;
  if (qty < 1) qty = 1;
  qtyDiv.textContent = qty;
}

function newElement() {
  const input = document.getElementById("todoInput");
  const value = input.value.trim();
  if (!value) return;

  const li = document.createElement("li");
  li.innerHTML = `
    ${value}
    <div class="qty-controls">
      <div class="qty">1</div>
      <i class="fas fa-minus icon-pm" onclick="changeQty(this, -1)"></i>
      <i class="fas fa-plus icon-pm" onclick="changeQty(this, 1)"></i>
    </div>
  `;
  document.getElementById("todoList").appendChild(li);
  input.value = "";
}




// ------------- Pantry Ingredients ------------- //
ingredients = [
  {
    "name": "Chicken",
    "expiration": "11/27/2025",
    "amount": "2 pounds"
  },
  {
    "name": "Tomato Sauce",
    "expiration": "5/1/2026",
    "amount": "1 jar"
  },
  {
    "name": "Spaghetti",
    "expiration": "1/1/2028",
    "amount": "2 boxes"
  },
  {
    "name": "Parmesan",
    "expiration": "12/31/2025",
    "amount": "1 Cup"
  },
]

function ingredientCard(name, expiration, amount) {
  return `
    <div class="recipe-card">
      <div class="recipe-content">
        <h3 class='recipe-header'>${name}</h3>
        <div class="ingredient-info">
          <div class="item">
            <p>Expiration: ${expiration}</p>
          </div>
          <div class="item">
            <p>Amount: ${amount}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

let ingredientCards = ``;
for (let i = 0; i < ingredients.length; i++) {
  ingredientCards += ingredientCard(ingredients[i].name, ingredients[i].expiration, ingredients[i].amount)
}

document.getElementById("ingredientCards").innerHTML = ingredientCards;

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