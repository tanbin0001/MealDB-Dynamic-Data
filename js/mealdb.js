const loadMeals = (searchField) => {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
}

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerText = '';

    meals.forEach(meal => {
        console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML =
            `
                <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
                    <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">
             
                    </p>
                    <!-- Button trigger modal -->
        <button onclick="loadMealDetail2(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Details
        </button>
                    </div>
                </div>
            `
        mealsContainer.appendChild(mealDiv);

    });
}
const searchMeal = () => {
    const searchField = document.getElementById('search-field').value;
    loadMeals(searchField);
    // console.log(searchField)

}

const loadMealDetail = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
        .catch(error => console.log(error))
}

const loadMealDetail2 = async (idMeal) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0])

    } catch (error) {
        console.log(error)
    }
}


const displayMealDetails = meal => {
    document.getElementById('mealDetailsModal').innerText = meal.strMeal
    const mealsDetails = document.getElementById('mealDetailsBody');
    mealsDetails.innerHTML =
        `
        <p>${meal.strInstructions}</p>
    `
}


loadMeals('rice')