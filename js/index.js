//handel search button
document.getElementById('search-btn').addEventListener('click',
    function(e) {
        e.preventDefault();
        const inputField = document.getElementById('search-box');
        let api;

        if (inputField.value !== '') {
            clearMelaData()
            inputError('none');
            showNotFound('none');
            if (inputField.value.lenght === 1) {
                api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputField.value}`;
                loadData(api);
            } else {
                api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputField.value}`;
                loadData(api);
            }
        } else {
            clearMelaData()
            showNotFound('none');
            inputError('block')

        }

        inputField.value = '';
    }
)


//load meals data
const loadData = async(apiUrl) => {
    try {
        spinner('block');
        const api = await fetch(apiUrl);
        const response = await api.json();
        spinner('none');
        if (response.meals !== null) {
            displayMealData(response.meals);
        } else {
            inputError('none')
            showNotFound('block');
        }
    } catch (err) {
        console.log(err.message);
    }
}


//function for empty input error message
const inputError = displayStyle => {
    document.getElementById('error-for-empty-search-box').style.display = displayStyle;
}

//function for show and hide not found error message
const showNotFound = displayStyle => {
    document.getElementById('error-for-not-result').style.display = displayStyle;
}


//functon for show and hide spinner
const spinner = displayStyle => {
    document.querySelector('.loader').style.display = displayStyle;
}


//functon for clear previous meals data 
const clearMelaData = () => {
    document.getElementById('all-meals').textContent = '';
}


//meals data display to ui
const displayMealData = (meals) => {
    try {
        const mealsSection = document.getElementById('all-meals');
        mealsSection.textContent = '';
        let div;
        meals.forEach((meal) => {
            div = document.createElement('div');
            div.classList.add('meal');
            div.innerHTML = `<div class="meal-container">
                <div class="meal-image">
                    <img src="${meal.strMealThumb}" alt="Food Image">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                </div>
                <div class="meal-details">
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="meal-details-btn">
                    <button>Details</button>
                </div>
            </div>`;
            mealsSection.append(div);
        });
    } catch (err) {
        console.log(err.message);
    }

}