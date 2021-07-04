import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipes }) => recipes.map((recipe, index) => {
  const { strMealThumb, strMeal, idMeal } = recipe;
  const { strDrinkThumb, strDrink, idDrink } = recipe;
  return (
    <div
      key={ strMeal || strDrink }
      className="cards"
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ `/comidas/${idMeal || idDrink}` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
        />
        <div className="container">
          <p data-testid={ `${index}-card-name` }>{strMeal || strDrink}</p>
        </div>
      </Link>
    </div>
  );
});

RecipeCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeCard;
