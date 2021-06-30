import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDrinkByCategory, getDrinkCategories, getDrinkRecipes } from '../services';
import '../main.css';

const FIVE = 5; // number of categories to render
const TWELVE = 12; // number of recipes to render

function MainDrink({ history }) {
  const [categories, setCategories] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredBy, setFilteredBy] = useState('');

  // fetch API
  useEffect(() => {
    const getCatergories = async () => {
      const drinks = await getDrinkCategories();
      setCategories(drinks.slice(0, FIVE));
    };

    const getRecipes = async () => {
      const drinks = await getDrinkRecipes();
      setDrinkRecipes(drinks.slice(0, TWELVE));
    };

    getCatergories();
    getRecipes();
  }, []);

  // filter results by category button
  const filterByCategory = async (category) => {
    if (filteredBy !== category) {
      setFilteredBy(category);
      const drinks = await getDrinkByCategory(category);
      setShowFiltered(true);
      setFilteredRecipes(drinks.slice(0, TWELVE));
    } else {
      setShowFiltered(false);
      setFilteredBy('');
    }
  };

  const recipesToRender = showFiltered ? filteredRecipes : drinkRecipes;

  return (
    <main>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setShowFiltered(false) }
        >
          All
        </button>
        {categories.map((el, idx) => (
          <button
            type="button"
            key={ idx }
            data-testid={ `${el.strCategory}-category-filter` }
            onClick={ () => { filterByCategory(el.strCategory); } }
          >
            {el.strCategory}
          </button>
        ))}
      </section>
      <section>
        {recipesToRender.map(({ strDrinkThumb, strDrink, idDrink }, idx) => (
          <section
            key={ idx }
            data-testid={ `${idx}-recipe-card` }
            onClick={ () => history.push(`/bebidas/${idDrink}`) }
            onKeyDown={ () => history.push(`/bebidas/${idDrink}`) }
            role="button"
            tabIndex={ 0 }
          >
            <img
              src={ strDrinkThumb }
              alt={ `Imagem do prato ${strDrink}` }
              data-testid={ `${idx}-card-img` }
            />
            <span data-testid={ `${idx}-card-name` }>{strDrink}</span>
          </section>
        ))}
      </section>
    </main>
  );
}

MainDrink.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default MainDrink;
