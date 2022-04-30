/* Recipes Script File */

///////////////////////////////////////////////////////////////////////////////////////
/* initialize the variables */
const addRecipe = document.querySelector(".addRecipe");
const searchBtn = document.querySelector(".searchBtn");
const editSubmit = document.querySelector(".editSubmit");
const deleteRecipe = document.querySelector(".deleteRecipe");
const recipes = document.querySelector(".recipes");
let editing = "";

///////////////////////////////////////////////////////////////////////////////////////
/* Functions */

function addFunction(recipesData) {
  recipes.innerHTML = "";

  try {
    recipesData.forEach((recipe) => {
      if (!recipe.name || !recipe.img || !recipe.link) {
        console.log(`Do Not Leave Any Blank`);
        return;
      }

      const colDiv = document.createElement("div");
      colDiv.classList.add("col-md-4");

      const mainDiv = document.createElement("div");
      mainDiv.classList.add("card", "recipe", "shadow");
      mainDiv.setAttribute("data-bs-toggle", "modal");
      mainDiv.setAttribute("data-bs-target", "recipeModal");

      const imgDiv = document.createElement("div");
      imgDiv.classList.add("inner");
      const imgNode = document.createElement("img");
      imgNode.setAttribute("src", recipe.img);
      imgNode.setAttribute("data-bs-target", "#cardModal");
      imgNode.setAttribute("data-bs-toggle", "modal");
      imgNode.classList.add("card-img-top");

      imgNode.addEventListener("click", () => {
        editFunction(recipe);
      });

      imgDiv.appendChild(imgNode);
      mainDiv.appendChild(imgDiv);

      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card-body");
      const recipeName = document.createElement("h5");
      recipeName.classList.add("card-title");
      recipeName.textContent = recipe.name;
      cardDiv.appendChild(recipeName);
      const linkNode = document.createElement("a");
      linkNode.classList.add("btn", "btn-dark");

      linkNode.setAttribute("href", recipe.link);
      linkNode.textContent = `Go To Recipe`;
      cardDiv.appendChild(linkNode);

      mainDiv.appendChild(cardDiv);
      colDiv.appendChild(mainDiv);
      recipes.appendChild(colDiv);
    });
  } catch {
    console.log(
      "Please Make Sure You Filled Out Everything In The Add Recipes"
    );
    window.location.reload();
  }
}

function display() {}

function editFunction(recipe) {
  const cardRecipeName = document.querySelector("#cardRecipeName");
  cardRecipeName.innerHTML = recipe.name;

  const nameEdit = document.querySelector("#nameEdit");
  const linkEdit = document.querySelector("#linkEdit");
  const imgEdit = document.querySelector("#imgEdit");

  nameEdit.value = recipe.name;
  linkEdit.value = recipe.link;
  imgEdit.value = recipe.img;

  editing = recipe._id;
}

function searchFunction(resp) {
  axios.get("http://localhost:3005/recipes").then((resp) => {
    let searchRecipes = resp.data;

    //filter method to search
    searchBtn.addEventListener("keyup", (e) => {
      const searchStr = e.target.value.toLowerCase();

      const filtered = searchRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(searchStr);
      });

      addFunction(filtered);
    });
  });
}

///////////////////////////////////////////////////////////////////////////////////////
/* Buttons */
addRecipe.addEventListener("click", (e) => {
  const name = document.querySelector("#name").value;
  const img = document.querySelector("#img").value;
  const link = document.querySelector("#link").value;

  axios
    .post("http://localhost:3005/recipes", {
      name,
      img,
      link,
    })
    .then((resp) => {
      addFunction(resp.data);
    })
    .then(() => {
      const newForm = document.querySelector("#newForm");
      newForm.reset();
    })
    .then((resp) => {
      searchFunction();
    });
});

editSubmit.addEventListener("click", (e) => {
  const name = document.querySelector("#nameEdit").value;
  const img = document.querySelector("#imgEdit").value;
  const link = document.querySelector("#linkEdit").value;
  axios
    .put(`http://localhost:3005/recipes/${editing}`, {
      name,
      img,
      link,
    })
    .then((resp) => {
      addFunction(resp.data);
    })
    .then((resp) => {
      searchFunction();
    });
});

deleteRecipe.addEventListener("click", (e) => {
  axios.delete(`http://localhost:3005/recipes/${editing}`).then((resp) => {
    addFunction(resp.data);
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////

searchFunction();
