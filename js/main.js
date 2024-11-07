"use strict";
var rowData = document.querySelector(".row-data");
var rowCategory = document.querySelector(".row-category");
var rowArea = document.querySelector(".row-area")
var rowIngredients = document.querySelector(".row-ingredients")
var data = null;
var categoriesData = null;
var areaData = null;
var ingredientsData = null;
var subCategoriesData = null;
var subAreaData = null;
var subIngredientsData = null;
var singleMeal = null;


let searchSection = document.getElementById("search");
let firstSection = document.getElementById("home");
let secondSection = document.getElementById("instructions");
let thirdSection = document.getElementById("categories");
let fourthSection = document.getElementById("area");
let fifthSection = document.getElementById("ingredients");
let sixthSection = document.getElementById("ContactUs");
let mainPage = document.getElementById("main-page");
let loading = document.getElementById("loading");
let searchMeals = null;
//Functions

async function getMeal(type,name) {
    mainPage.className += ' d-none';
    loading.classList.remove('d-none');
  var response = null;
  if (type == "main") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    data = await response.json();
    displayMeals(data.meals);

  } else if (type == "categories") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    categoriesData = await response.json();
    displayCategories(categoriesData.categories);
    

  }
  else if (type == "subCategory") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
    );
    subCategoriesData = await response.json();
    console.log(subCategoriesData);
    displayMeals(subCategoriesData.meals)
  }
  else if (type == "area") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    areaData = await response.json();
    displayArea(areaData.meals)
  }
  else if (type == "subArea") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
    );
    subAreaData = await response.json();
    console.log(subAreaData);
    displayMeals(subAreaData.meals)

  }
  else if (type == "ingredients") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    ingredientsData = await response.json();
    displayIngredients(ingredientsData.meals)
  }
  else if (type == "subIngredients") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
    );
    subIngredientsData = await response.json();
    console.log(subIngredientsData);
    displayMeals(subIngredientsData.meals)

  }
  
    setTimeout(()=>{
        loading.className += ' d-none';
        mainPage.classList.remove('d-none');
      },1000)
 
 
      if (isShown == true) {
        $(".side-bar").animate({ left: "-256.562px" }, 700);
        $(".bar i").removeClass("fa-x").addClass("fa-2x fa-align-justify");
        isShown = false;
      } else {
        $(".side-bar").animate({ left: "0px" }, 700);
        $(".bar i").removeClass("fa-2x fa-align-justify").addClass("fa-2x fa-x");
        isShown = true;
      }
}

getMeal('main','');

//Meals-function

function displayMeals(data) {
    thirdSection.className += ' d-none';
    secondSection.className += ' d-none';
    fourthSection.className += ' d-none';
    fifthSection.className += ' d-none';
    firstSection.classList.remove('d-none');
    rowData.innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    rowData.innerHTML += ` <div class="col-12 col-md-3">
                                     <div class="inner position-relative overflow-hidden" onclick="getSingleMeal(${data[i].idMeal})">
                                           <img src="${data[i].strMealThumb}" alt="${data[i].strMeal}" class="w-100 rounded-2">
                                           <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                                           <h4>${data[i].strMeal}</h4>
                                           </div>
                                     </div>
                                </div>`;
  }
}

async function getSingleMeal(id) {
    secondSection.innerHTML = '';
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  singleMeal = await response.json();
  console.log(singleMeal.meals[0]);
  if (singleMeal.meals[0]) {
    firstSection.className += " d-none";
    console.log(firstSection.className);
    secondSection.classList.remove("d-none");
    secondSection.innerHTML = ` <div class="container">
                    <div class="row py-5 g-4">
                        <div class="col-12 col-md-4">
                            <img class="w-100 rounded-3" src="${singleMeal.meals[0].strMealThumb}" alt="">
                            <h2 class="text-white">${singleMeal.meals[0].strMeal}</h2>
                        </div>
                        <div class="col-md-8 text-white">
                            <h2>Instructions</h2>
                            <p>${singleMeal.meals[0].strInstructions}</p>
                            <h3><span class="fw-bolder">Area : </span>${singleMeal.meals[0].strArea}</h3>
                            <h3><span class="fw-bolder">Category : </span>${singleMeal.meals[0].strCategory}</h3>
                            <h3>Recipes :</h3>
                            <ul class="list-unstyled d-flex g-3 flex-wrap">
                                <li class="alert alert-info m-2 p-1">${singleMeal.meals[0].strMeasure1} ${singleMeal.meals[0].strIngredient1}</li><li class="alert alert-info m-2 p-1">${singleMeal.meals[0].strMeasure2} ${singleMeal.meals[0].strIngredient2}</li><li class="alert alert-info m-2 p-1">${singleMeal.meals[0].strMeasure3} ${singleMeal.meals[0].strIngredient3}</li><li class="alert alert-info m-2 p-1">${singleMeal.meals[0].strMeasure4} ${singleMeal.meals[0].strIngredient4}</li><li class="alert alert-info m-2 p-1">${singleMeal.meals[0].strMeasure5} ${singleMeal.meals[0].strIngredient5}</li><li class="alert alert-info m-2 p-1">${singleMeal.meals[0].strMeasure6} ${singleMeal.meals[0].strIngredient6}</li><li class="alert alert-info m-2 p-1">${singleMeal.meals[0].strMeasure7} ${singleMeal.meals[0].strIngredient7}</li>
                            </ul>
                            <h3>Tags :</h3>
                            <br>
                            <a target="_blank" href="${singleMeal.meals[0].strSource}" class="btn btn-success">Source</a>
                            <a target="_blank" href="${singleMeal.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
                        </div>
                    </div>
                </div>`;
  }
}

// Categories-Function

function displayCategories(categoriesData) {
    firstSection.className += ' d-none';
    secondSection.className += ' d-none';
    rowIngredients.innerHTML ='';
    rowArea.innerHTML='';
    rowCategory.innerHTML='';
    rowData.innerHTML='';    thirdSection.classList.remove('d-none');
  for (var i = 0; i < categoriesData.length; i++) {
    rowCategory.innerHTML += `<div class="col-12 col-md-3">
                                     <div class="box position-relative overflow-hidden rounded-2" onclick="getMeal('subCategory','${categoriesData[i].strCategory}')">
                                         <img src="${categoriesData[i].strCategoryThumb}" alt="beef" class="w-100">
                                         <div class="meal-layer position-absolute text-center text-black p-2">
                                                <h3>${categoriesData[i].strCategory}</h3>
                                                <p>${categoriesData[i].strCategoryDescription}</p>
                                         </div>
                                     </div>
                                  </div>`;
  }
}

//Area-function

function displayArea(areaData) {
    firstSection.className += ' d-none';
    secondSection.className += ' d-none';
    thirdSection.className += 'd-none';
    rowIngredients.innerHTML ='';
    rowArea.innerHTML='';
    rowCategory.innerHTML='';
    rowData.innerHTML='';    fourthSection.classList.remove('d-none');
  for (var i = 0; i < areaData.length; i++) {
    rowArea.innerHTML += `<div class="col-12 col-md-3">
                            <div class="box rounded-2 text-center text-white"  onclick="getMeal('subArea','${areaData[i].strArea}')">
                                <i class="fa-solid fa-house-laptop fa-4x"></i>
                                <h3>${areaData[i].strArea}</h3>
                            </div>
                        </div>`
  }
}

//Ingredients-function

function displayIngredients(ingredientsData) {
    firstSection.className += ' d-none';
    secondSection.className += ' d-none';
    thirdSection.className += 'd-none';
    fourthSection.className +='d-none';
    rowIngredients.innerHTML ='';
    rowArea.innerHTML='';
    rowCategory.innerHTML='';
    rowData.innerHTML='';
    fifthSection.classList.remove('d-none');
  for (var i = 0; i < 20; i++) {
    rowIngredients.innerHTML += `<div class="col-12 col-md-3">
                            <div class="box rounded-2 text-center text-white" onclick="getMeal('subIngredients','${ingredientsData[i].strIngredient}')">
                                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                <h3>${ingredientsData[i].strIngredient}</h3>
                                <p>${ingredientsData[i].strDescription.slice(0,150)}</p>
                            </div>
                        </div>`
  }
}

//sideBar
const sideBarWidth = $(".side-bar").outerWidth();
$(".side-bar").css({ left: "-256.562px" });

let isShown = true;

$(".bar").on("click", function () {
  if (isShown == true) {
    $(".side-bar").animate({ left: "-256.562px" }, 700);
    $(".bar i").removeClass("fa-x").addClass("fa-2x fa-align-justify");
    isShown = false;
  } else {
    $(".side-bar").animate({ left: "0px" }, 700);
    $(".bar i").removeClass("fa-2x fa-align-justify").addClass("fa-2x fa-x");
    isShown = true;
  }
});

//reload-function

function reloadPage() {
    location.reload();
  }
  
//Search-function
function showSearch()
{
    firstSection.className += ' d-none';
    secondSection.className += ' d-none';
    thirdSection.className += ' d-none';
    fourthSection.className += ' d-none';
    fifthSection.className += ' d-none';
    sixthSection.className += ' d-none';

    searchSection.classList.remove('d-none');
}

//Search.filter
async function Search(){
    var value = document.getElementById("searchValue").value;
   var response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
      );
      searchMeals = await response.json();
      displayMeals(searchMeals.meals)
      console.log(searchMeals);
}
async function SearchFirstWord(){
    var value = document.getElementById("searchValueFirstWord").value;
   var response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
      );
      searchMeals = await response.json();
      displayMeals(searchMeals.meals)
      console.log(searchMeals);
}


//ContentUs-function
function coutentUs()
{
    firstSection.className += ' d-none';
    secondSection.className += ' d-none';
    thirdSection.className += ' d-none';
    fourthSection.className += ' d-none';
    fifthSection.className += ' d-none';

    sixthSection.classList.remove('d-none');
}

//Validation
var nameRegex= /^[A-za-z]{3,}$/;
var emailRegex= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var phoneRegex= /^01[0-2]\s\d{1,8}$/
var ageRegex= /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
var passwordRegex= /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/


function inputValidation(regex , element)
{
    if(regex.test(element.value)  == true){
        element.nextElementSibling.classList.replace("d-block" , "d-none")
        console.log("true")
        return true;
        
    }else{
        element.nextElementSibling.classList.replace("d-none" , "d-block")
        return false;
    }
}


