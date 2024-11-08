///<reference types="../@types/jquery"/>

let rowData = document.querySelector('#rowData')
let search_li = document.querySelector('.search')
let categories_li = document.querySelector('.categories')
let area_li = document.querySelector('.area')
let ingredients_li = document.querySelector('.ingredients')
let contact_li = document.querySelector('.contact')
let nameInput = document.querySelector('#nameInput')
let emailInput = document.querySelector('#emailInput')
let phoneInput = document.querySelector('#phoneInput')
let ageInput = document.querySelector('#ageInput')
let passwordInput = document.querySelector('#passwordInput')
let repasswordInput = document.querySelector('#repasswordInput')
let innerLoadingScreen = $('.innerLoadingScreen')



$(document).ready(() => {
    searchByName("").then(function () {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function openNav() {
    $('.side-nav').animate({ left: 0 }, 500)

    $('.open-close-icon').removeClass('fa-align-justify');
    $(".open-close-icon").addClass("fa-x");

    for (let i = 0; i < 5; i++) {
        $(".nav-links li").eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
}

function closeNav() {
    let sideInnerLeft = $(".side-nav .side-inner-left").outerWidth()
    $(".side-nav").animate({
        left: -sideInnerLeft
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".nav-links li").animate({
        top: 300
    }, 500)
}

closeNav()

$(".side-nav .open-close-icon").on('click', () => {
    if ($(".side-nav").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})

$(search_li).on('click', function () {
    showSearchInput()
    closeNav()
})
// let searchName = $('#searchName')
// searchName.on('keyup',function(){
//     searchByName(searchName.value)
// })
// let searchLetter = $('#searchLetter')
// searchLetter.on('keyUp',function(){
//     searchByFirstLetter(searchLetter.value)
// })
function showSearchInput() {
    searchContainer.innerHTML = `
     <div class="container w-75">
            <div class="row">
                <div class="col-md-6">
                    <input id='searchName' onkeyup="searchByName(this.value)" type="text" placeholder="Search By Name" class="form-control bg-transparent text-white">
                </div>
                <div class="col-md-6">
                    <input id='searchLetter' onkeyup="searchByFirstLetter(this.value)" type="text" maxlength="1" placeholder="Search By First Letter" class="form-control bg-transparent text-white">
                </div>
            </div>
        </div>`
    rowData.innerHTML = ""
}

async function searchByName(mealName) {
    closeNav()
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300)
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    let response = await data.json()
    if (response.meals) {
        displayMeals(response.meals)
    }
    else {
        displayMeals([])
    }
    innerLoadingScreen.fadeOut(300)

}
async function searchByFirstLetter(firstLetter) {
    closeNav()
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300)
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    let response = await data.json()
    if (response.meals) {
        displayMeals(response.meals)
    }
    else {
        displayMeals([])
    }
    innerLoadingScreen.fadeOut(300)

}

function displayMeals(meal) {
    let cartona = '';
    for (let i = 0; i < meal.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${meal[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartona
}

$(categories_li).on('click', function () {
    getCategories()
    closeNav()
})

async function getCategories() {
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300);
    searchContainer.innerHTML = "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let response = await data.json()
    displayCategories(response.categories)
    innerLoadingScreen.fadeOut(300)
}

async function displayCategories(categories) {
    let cartona = '';
    for (let i = 0; i < categories.length; i++) {
        cartona += `
         <div class="col-md-3">
                <div onclick="getCategoryMeals('${categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${categories[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${categories[i].strCategory}</h3>
                        <p>${categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartona
}

$(area_li).on('click', function () {
    getArea()
    closeNav()
})


async function getArea() {
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300);
    searchContainer.innerHTML = "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response = await data.json()
    displayArea(response.meals)
    innerLoadingScreen.fadeOut(300)
}

async function displayArea(area) {
    let cartona = '';
    for (let i = 0; i < area.length; i++) {
        cartona += `
         <div class="col-md-3">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>  
        `
    }
    rowData.innerHTML = cartona
}

$(ingredients_li).on('click', function () {
    getIngredients()
    closeNav()
})

async function getIngredients() {
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300);
    searchContainer.innerHTML = "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let response = await data.json()
    displayIngredients(response.meals.slice(0, 20))
    innerLoadingScreen.fadeOut(300)
}

function displayIngredients(ingredients) {
    let cartona = ''
    for (let i = 0; i < ingredients.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${ingredients[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredients[i].strIngredient}</h3>
                        <p>${ingredients[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartona
}

$(contact_li).on('click', function () {
    showContacts()
    closeNav()
})
let submitButton;
function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="validateRegex(this)" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="validateRegex(this)" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="validateRegex(this)" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="validateRegex(this)" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="validateRegex(this)" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitButton" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>`
    submitButton = $('#submitButton')
}

function validateRegex(ele) {
    let regex = {
        nameInput: /^[a-zA-Z ]+$/,
        emailInput: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ageInput: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        phoneInput: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        passwordInput: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,

    }
    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid')
        ele.classList.add('is-valid')
        document.getElementById('submitButton').removeAttribute('disabled')
        document.getElementsByClassName('alert').replace('d-none','d-block')
    }


    else {
    ele.classList.remove('is-valid')
    ele.classList.add('is-invalid')
    document.getElementById('submitButton').setAttribute('disabled')
    document.getElementsByClassName('alert').replace('d-block','d-none')
}
}

async function getCategoryMeals(category) {
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300)
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let response = await data.json()
    displayMeals(response.meals.slice(0, 20))
    innerLoadingScreen.fadeOut(300)
}

async function getAreaMeals(area) {
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300)
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response = await data.json()
    displayMeals(response.meals.slice(0, 20))
    innerLoadingScreen.fadeOut(300)
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300)
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let response = await data.json()
    displayMeals(response.meals.slice(0, 20))
    innerLoadingScreen.fadeOut(300)
}

async function getMealDetails(mealID) {
    closeNav()
    rowData.innerHTML = ''
    innerLoadingScreen.fadeIn(300)
    searchContainer.innerHTML = "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let response = await data.json()
    displayMealDetails(response.meals[0])
    innerLoadingScreen.fadeOut(300)
}

function displayMealDetails(meal) {
    searchContainer.innerHTML = '';

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    // if (meal.strTags) {
    //     meal.strTags.split(",")
    // }
    // else {
    //     meal.strTags = []
    // }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartona
}

