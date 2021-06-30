import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipesMealCard({ recipe, index }) {
  const { strMealThumb, strMeal, idMeal } = recipe;

  return (
    <Link to={ `/comidas/${idMeal}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{strMeal}</p>
      </div>
    </Link>
  );
}

export default RecipesMealCard;

RecipesMealCard.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
};
