import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipeById } from '../services/requests';
import { renderIngredients } from '../utils';
import Carousel from '../components/Carousel';

const Drink = ({ match }) => {
  const history = useHistory();
  const {
    params: { id },
  } = match;
  const [drink, setDrink] = useState({});

  useEffect(() => {
    recipeById(id).then(setDrink);
  }, [id, setDrink]);

  console.log(drink);
  return (
    <div>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <ul>
        Ingredientes:
        {renderIngredients(drink)}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/bebidas/${drink.idDrink}/in-progress`) }
      >
        Iniciar Receita
      </button>
      <br />
      <Carousel />
      <Link to="/bebidas"><button type="button">Voltar</button></Link>
    </div>
  );
};

Drink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Drink;
