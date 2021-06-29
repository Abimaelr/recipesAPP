import React, { useState, useEffect } from 'react';

const FIVE = 5; // number of categories to render
const TWELVE = 12;

function MainPageFood() {
  const [categories, setCategories] = useState([]);
  const [foodRecipes, setFoodRecipes] = useState([]);

  useEffect(() => {
    const getCatergories = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setCategories(meals.slice(0, FIVE));
    };

    const getRecipes = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setFoodRecipes(meals.slice(0, TWELVE));
    };

    getCatergories();
    getRecipes();
  }, []);

  return (
    <main>
      <section>
        {categories.map((el, idx) => (
          <button
            type="button"
            key={ idx }
          >
            {el.strCategory}
          </button>
        ))}
      </section>

      <section>
        {foodRecipes.map(({ strMealThumb, strMeal }, idx) => (
          <div key={ idx } data-testid={ `${idx}-recipe-card` }>
            <img
              src={ strMealThumb }
              alt="Foto do prato"
              data-testid={ `${idx}-card-img` }
            />
            <span data-testid={ `${idx}-card-name` }>{strMeal}</span>
          </div>
        ))}

      </section>
    </main>
  );
}

export default MainPageFood;
