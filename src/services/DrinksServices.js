const API_URL_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const API_URL_NAME_AND_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';
const API_URL_ALL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_URL_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const API_URL_DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const API_URL_RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export async function fetchDrinksByIngredient(ingredient) {
  const request = await fetch(`${API_URL_INGREDIENT}${ingredient}`);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function fetchDrinksByName(name) {
  const request = await fetch(`${API_URL_NAME_AND_FIRST_LETTER}s=${name}`);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function fetchDrinksByFirstLetter(firstLetter) {
  const request = await fetch(`${API_URL_NAME_AND_FIRST_LETTER}f=${firstLetter}`);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function fetchAllDrinks() {
  const request = await fetch(API_URL_ALL_DRINKS);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function fetchCategoriesDrinks() {
  const request = await fetch(API_URL_CATEGORIES);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function fetchDrinksByCategory(category) {
  if (category !== 'All') {
    const request = await fetch(`${API_URL_DRINKS_BY_CATEGORY}${category}`);
    const response = await request.json();
    const { drinks } = response;
    return drinks;
  }
}

export async function fetchRandomDrink() {
  const request = await fetch(API_URL_RANDOM_DRINK);
  const response = await request.json();
  return response;
}
