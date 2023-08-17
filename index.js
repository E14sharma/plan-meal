// const title = document.getElementById("title");
// title.innerText = "hello";

async function getdata(calorie) {
    const response = await fetch("https://content.newtonschool.co/v1/pr/64995a40e889f331d43f70ae/categories");
    const result = await response.json();
    for (let meal of result) {
        let min = meal["min"];
        let max = meal["max"];
        if (calorie <= max && calorie >= min) {
            console.log(meal);
            displayMealPlan(meal);
        }
    }
}
async function fetchRecipe(mealId) {
    const response = await fetch(`https://content.newtonschool.co/v1/pr/64996337e889f331d43f70ba/recipes/${mealId}`);
    const recipeData = await response.json();

    populateRecipeTabs(recipeData);

}
const mealPlanSection = document.getElementById("plan");
mealPlanSection.style.display = "none";
const generateMeal = document.getElementById("btn-meal");
generateMeal.addEventListener("click", (e) => {
    e.preventDefault();
    calculatecalorie();
    mealPlanSection.style.display = "flex";
});


function calculatecalorie() {
    const weight = document.getElementById("weight").value;
    console.log("weight" + weight);
    const height = document.getElementById("height").value;
    console.log(height + "h");
    const age = document.getElementById("age").value;
    console.log("a" + age);
    const gender = document.getElementById("gender").value;
    const activity = document.getElementById("activity").value;
    let BMR;
    if (gender === "male") {
        BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    }
    if (gender === "female") {
        BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
    }
    console.log("BMR" + BMR);
    let calorie;

    if (activity === "light") {
        calorie = BMR * 1.375;
    }
    if (activity === "moderate") {
        calorie = BMR * 1.55;
    }
    if (activity === "active") {
        calorie = BMR * 1.725;
    }
    console.log("calorie" + calorie);
    getdata(calorie);
}

function displayMealPlan(meal) {
    document.getElementById("meal1").src = meal["breakfast"]["image"];
    document.getElementById("meal2").src = meal["lunch"]["image"];
    document.getElementById("meal3").src = meal["dinner"]["image"];
    document.getElementById("dish1").innerText = meal["breakfast"]["title"];
    document.getElementById("dish2").innerText = meal["lunch"]["title"];
    document.getElementById("dish3").innerText = meal["dinner"]["title"];

    const mealCards = document.querySelectorAll(".meal-card");


    mealCards.forEach((card, index, meal) => {

        const getRecipeButton = card.querySelector(".get-recipe-btn");
        // console.log(getRecipeButton);
        getRecipeButton.addEventListener("click", (index, meal) => {
            // fetchRecipe(meal[index].id);
            alert("hello", meal[index].id);
        });
    });
}


function populateRecipeTabs(recipe) {
    const ingredientsArray = recipe.ingredients.split(', ');
    const stepsArray = recipe.steps.split('. ');


    const ingredientsTab = document.getElementById("ingredients-tab");
    ingredientsTab.innerHTML = "<ul>" + ingredientsArray.map(item => `<li>${item}</li>`).join("") + "</ul>";

    const stepsTab = document.getElementById("steps-tab");
    stepsTab.innerHTML = "<ol>" + stepsArray.map(item => `<li>${item}</li>`).join("") + "</ol>";


    const recipeSection = document.querySelector(".recipe-section");
    recipeSection.style.display = "block";
}


// Peanut Butter and Chocolate Oatmeal"
// Lentil Salad With Vegetables
// Asian Noodles
// Spaghetti Bolognese
// Chocolate Chip Cookies
// Caprese Salad
// Vegetable Curry
// Spinach and Feta Stuffed Peppers"
// Lentil Soup

