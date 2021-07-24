import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './DetailsPage.css';
import RecommendedFood from './RecommendedFood';

function AllTagsFromDetailsDrinks(drinks) {
  console.log(drinks);
  const [star, setStar] = useState(false);
  const listIngredients = Object.keys(drinks.drinks[0])
    .filter((drink) => drink.includes('Ingredient'));
  const ingredients = [];
  const drinksKeys = Object.keys(drinks.drinks[0]);
  for (let j = 0; j < drinksKeys.length; j += 1) {
    for (let i = 0; i < listIngredients.length; i += 1) {
      if (drinksKeys[j] === listIngredients[i]) {
        ingredients.push(drinks.drinks[0][drinksKeys[j]]);
      }
    }
  }
  const ingredientsFinal = ingredients.filter((ing) => ing !== null);

  const listMeasures = Object.keys(drinks.drinks[0])
    .filter((drink) => drink.includes('Measure'));
  const measures = [];
  const measure = Object.keys(drinks.drinks[0]);
  for (let j = 0; j < measure.length; j += 1) {
    for (let i = 0; i < listMeasures.length; i += 1) {
      if (measure[j] === listMeasures[i]) {
        measures.push(drinks.drinks[0][measure[j]]);
      }
    }
  }
  const measuresFinal = measures.filter((ing) => ing !== ' ');

  //   // const INDEX_NUMBER = 3;
  //   // const urlVideo = drinks[0].strVideo.split('/');
  //   // urlVideo.splice(urlVideo.indexOf(INDEX_NUMBER), 1);
  //   // // urlVideo.forEach((u) => u.inclued)
  //   // const urlVideo2 = drinks[0].strVideo.split('/');
  //   // const partUrl = urlVideo2[3].split('?');
  //   // const partUrl2 = partUrl[1].split('=');
  //   // partUrl2.shift();
  //   // console.log(partUrl2);

  //   // partUrl[0] = 'embed';
  //   // urlVideo.push(partUrl[0]);
  //   // urlVideo.push(partUrl2);
  //   // fullUrl = `${urlVideo[0]}//${urlVideo[2]}/${urlVideo[3]}/${urlVideo[4]}`;

  // Para resolver essa problema do clipboard usei como referência o Link: https://blog.erikfigueiredo.com.br/area-de-transferencia-copiar-e-colar-com-javascript-dica-rapida/.

  const link = window.location.href;
  const handleFavorited = () => {
    // const newTag = document.createElement('input');

    // document.body.appendChild(newTag);
    // newTag.value = link;
    // newTag.select();
    // document.execCommand('copy');
    // document.body.removeChild(newTag);
    navigator.clipboard.writeText(link);
    // alert('Link copiado!');
    const alerta = document.createElement('p');
    document.querySelector('.section-geral').appendChild(alerta);
    alerta.innerText = 'Link copiado!';
  };

  const changeHeart = () => {
    setStar(!star);
  };
  const favorites = [];
  const verifyFavorited = () => {
    const getAllFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favorites.push(drinks.drinks[0].idDrink);
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([...getAllFavorites, ...favorites]));
  };

  return (
    <section className="section-geral">
      <img
        src={ drinks.drinks[0].strDrinkThumb }
        alt={ drinks.drinks[0].strDrink }
        width="250px"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ drinks.drinks[0] && drinks.drinks[0].strDrink }</p>
      <button type="button" onClick={ handleFavorited }>
        <img src={ shareIcon } alt="Share" data-testid="share-btn" />
      </button>
      <button type="button" onClick={ () => { verifyFavorited(); changeHeart(); } }>
        <img
          src={ star === false ? whiteHeartIcon : blackHeartIcon }
          alt="Share"
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{ drinks.drinks[0].strAlcoholic }</p>
      <h3>Ingredientes</h3>
      <ul>
        { ingredientsFinal
          .map((ing, i) => ((
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              { ing }
              {' '}
              -
              { ' ' }
              { measuresFinal.map((mea, ind) => i === ind && (mea)) }
            </li>
          ))) }
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ drinks.drinks[0].strInstructions }</p>
      <h3>Recomendadas</h3>
      <RecommendedFood />
    </section>);
}

AllTagsFromDetailsDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default AllTagsFromDetailsDrinks;
