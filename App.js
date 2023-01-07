const userHeight = document.querySelector("#height"); //apiKey=37e278d859044a1eb15c5f4b299ec81c
const userWeight = document.querySelector("#weight");
const userAge = document.querySelector("#age");
const userGender = document.querySelector("#gender");
const userActivity = document.querySelector("#activity");
const generateBtn = document.querySelector("#generateBtn");
const cards = document.querySelector("#cardsid");
const RecipeContainer = document.querySelector("#recipeSection");
const equipmentContainer = document.querySelector("#equipmentSection");
const stepContainer = document.querySelector("#stepSection");
// const liitems = document.querySelector(".liitems");

// const orderlistitems = document.querySelector(".orderlistitems");
let calory, bmr;



fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=37e278d859044a1eb15c5f4b299ec81c&timeFrame=day`)
    .then((responce) =>
        responce.json())
    .then((data) => {
        console.log(data.meals);
        const url1 = `https://webknox.com/recipeImages/${data.meals[0].id}-556x370.jpg`;
        const id1 = data.meals[0].id;
        const id2 = data.meals[1].id;
        const id3 = data.meals[2].id;

        const name1 = data.meals[0].title;
        const calory1 = Math.round(data.nutrients.calories);

        const url2 = `https://webknox.com/recipeImages/${data.meals[1].id}-556x370.jpg`;
        const name2 = data.meals[1].title;
        const calory2 = Math.round(data.nutrients.calories);

        const url3 = `https://webknox.com/recipeImages/${data.meals[2].id}-556x370.jpg`;
        const name3 = data.meals[2].title;
        const calory3 = Math.round(data.nutrients.calories);




        cards.innerHTML = `
        <div>
        <h1 class="text-style1">BREAKFAST</h1>
        <div class="extracard setBreakfast">
            <img src="${url1}" alt="">
            <div class="extracard-info">
                <h3 class="break-fasth3">${name1}</h3>
                <section class="breakfase-section">Calorie : ${calory1}</section>
            <button class="btn" type="button" onclick= myFun(${id1})>GET RECIPE</button>
            </div>
        </div>
    </div>
    <div>
        <h1 class="text-style1">LUNCH</h1>
        <div class="extracard">
            <img src="${url2}" alt="" >
            <div class="extracard-info">
                <h3 class="break-fasth3">${name2}</h3>
                <section class="breakfase-section">Calorie : ${calory2}</section>            
                <button class="btn" type="button" onclick= myFun(${id2})>GET RECIPE</button>
            </div>
        </div>
    </div>
    <div>
        <h1 class="text-style1">DINNER</h1>
        <div class="extracard">
            <img src="${url3}" alt="">
            <div class="extracard-info">
                <h3 class="break-fasth3">${name3}</h3>
                <section class="breakfase-section">Calorie : ${calory3}</section>
                <button class="btn" type="button" onclick= myFun(${id3})>GET RECIPE</button>
            </div>
        </div>
    </div>
    `

    });

function myFun(id) {
    RecipeContainer.innerHTML = " ";
    const table = document.createElement("table")
    const headerRow = document.createElement("tr");
    const ingredientHeader = document.createElement("th");
    ingredientHeader.textContent = "Ingredient";
    headerRow.appendChild(ingredientHeader);
    table.appendChild(headerRow);
    RecipeContainer.appendChild(table);
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=37e278d859044a1eb15c5f4b299ec81c`)
        .then((responce) => responce.json())
        .then((res) => {
            res.extendedIngredients.forEach((element) => {
                const row = document.createElement("tr");
                const ingredientCell = document.createElement("td");
                ingredientCell.textContent = element.name;
                row.appendChild(ingredientCell);
                table.appendChild(row);
            });
            steps(id)
            equipment(id)
        });
}

function steps(id) {
    stepContainer.innerHTML = " ";
    const table = document.createElement("table")
    const headerRow = document.createElement("tr");
    const stepHeader = document.createElement("th");
    stepHeader.textContent = "Step";
    headerRow.appendChild(stepHeader);
    table.appendChild(headerRow);
    stepContainer.appendChild(table);

    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=37e278d859044a1eb15c5f4b299ec81c`)
        .then((responce) => responce.json())
        .then((res) => {

            res.analyzedInstructions[0].steps.forEach((element) => {
                const row = document.createElement("tr");
                const stepCell = document.createElement("td");
                stepCell.textContent = element.step;
                row.appendChild(stepCell);
                table.appendChild(row);


            });

        });

};

function equipment(id) {
    equipmentContainer.innerHTML = " ";
    const table = document.createElement("table")
    const headerRow = document.createElement("tr");
    const equipmentHeader = document.createElement("th");
    equipmentHeader.textContent = "Equipment";
    headerRow.appendChild(equipmentHeader);
    table.appendChild(headerRow);
    equipmentContainer.appendChild(table);

    fetch(`https://api.spoonacular.com/recipes/${id}/equipmentWidget.json?apiKey=37e278d859044a1eb15c5f4b299ec81c`)
        .then((responce) => responce.json())
        .then((res) => {
            res.equipment.forEach((element) => {
                const row = document.createElement("tr");
                const stepCell = document.createElement("td");
                stepCell.textContent = element.name;
                row.appendChild(stepCell);
                table.appendChild(row);



            });

        });

}





generateBtn.addEventListener("click", () => {
    if (userGender.value === "male") {
        const height = userHeight.value;
        const weight = userWeight.value;
        const age = userAge.value;
        bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
        if (userActivity.value === "light") {
            calory = bmr * 1.375;

        } else if (userActivity.value === "moderate") {
            calory = bmr * 1.55;

        } else if (userActivity.value === "active") {
            calory = bmr * 1.725;

        } else {
            alert("Select physical activity");
        }

    } else if (userGender.value === "female") {
        const height = userHeight.value;
        const weight = userWeight.value;
        const age = userAge.value;
        bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
        if (userActivity.value === "light") {
            calory = bmr * 1.375;

        } else if (userActivity.value === "moderate") {
            calory = bmr * 1.55;

        } else if (userActivity.value === "active") {
            calory = bmr * 1.725;

        } else {
            alert("Select physical activity");
        }
    } else {
        alert("Select gender");
    }
    console.log(calory);

    mealFun();

});

function mealFun() {


    fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=37e278d859044a1eb15c5f4b299ec81c&timeFrame=day&targetCalories=${calory}`)
        .then((responce) =>
            responce.json())
        .then((data) => {
            console.log(data);
            const url1 = `https://webknox.com/recipeImages/${data.meals[0].id}-556x370.jpg`;
            const name1 = data.meals[0].title;
            const calory1 = Math.round(data.nutrients.calories);

            const url2 = `https://webknox.com/recipeImages/${data.meals[1].id}-556x370.jpg`;
            const name2 = data.meals[1].title;
            const calory2 = Math.round(data.nutrients.calories);

            const url3 = `https://webknox.com/recipeImages/${data.meals[2].id}-556x370.jpg`;
            const name3 = data.meals[2].title;
            const calory3 = Math.round(data.nutrients.calories);
            const id4 = data.meals[0].id;
            const id5 = data.meals[1].id;
            const id6 = data.meals[2].id;



            cards.innerHTML = `
            <div>
            <h1 class="text-style1">BREAKFAST</h1>
            <div class="extracard setBreakfast">
                <img src="${url1}" alt="">
                <div class="extracard-info">
                    <h3 class="break-fasth3">${name1}</h3>
                    <section class="breakfase-section">Calorie : ${calory1}</section>
                    <button class="btn" type="button" onclick= myFun(${id4})>GET RECIPE</button>
                </div>
            </div>
        </div>
        <div>
            <h1 class="text-style1">LUNCH</h1>
            <div class="extracard">
                <img src="${url2}" alt="">
                <div class="extracard-info">
                    <h3 class="break-fasth3">${name2}</h3>
                    <section class="breakfase-section">Calorie : ${calory2}</section>            
                    <button class="btn" type="button" onclick= myFun(${id5})>GET RECIPE</button>
                </div>
            </div>
        </div>
        <div>
            <h1 class="text-style1">DINNER</h1>
            <div class="extracard">
                <img src="${url3}" alt="">
                <div class="extracard-info">
                    <h3 class="break-fasth3">${name3}</h3>
                    <section class="breakfase-section">Calorie : ${calory3}</section>
                    <button class="btn" type="button" onclick= myFun(${id6})>GET RECIPE</button>
                </div>
            </div>
        </div>
        `
        });

};
