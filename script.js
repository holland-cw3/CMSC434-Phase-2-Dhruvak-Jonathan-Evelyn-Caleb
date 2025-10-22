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

function likeRecipe(index) {

  if (document.querySelectorAll('#heart')[index].style.color == "red") {
    document.querySelectorAll('#heart')[index].style.color = "#787879";
  }
  else {
    document.querySelectorAll('#heart')[index].style.color = "red";
  }
}

function openKeyboard() {
  document.getElementById('keyboard').style.display = "block";
}

function closeKeyboard() {
  document.getElementById('keyboard').style.display = "none";
}

document.getElementById("defaultOpen").click();


recipes = [
  {
    "name": "Chicken Parmesean",
    "ingredients": ["Chicken", "Tomato Sauce", "Spaghetti", "Parmesean"],
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

function recipeCard(name, ingredients, time, difficulty, src, index) {
  if (ingredients.length >= 3) {
    ingredients = ingredients.slice(0, 3).join(', ') + '...';
  }
  else {
    ingredients = ingredients.join(', ')
  }

  return `
    <div class="recipe-card">
    <div class='recipe-img'>
     <img 
      src="${src}"
      class="recipe-img2" 
      alt="Baked Chicken Parmesan"
    >
    </div>
   
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
  

  <button class="btn">See Recipe</button>
</div>

  </div>
  `;
}


let recipeCards = ``;
for (let i = 0; i < recipes.length; i++) {
  recipeCards += recipeCard(recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].difficulty, recipes[i].img_src,  i)
}

document.getElementById("recipeCards").innerHTML = recipeCards;

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


inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    closeKeyboard()
  }
});
