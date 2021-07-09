import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import Card from '../components/Card';
import VideoPlayer from '../components/VideoPlayer';
import { saveFavoriteRecipe } from '../storage/localStorage';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import { getDataById, getRandomData } from '../services/apiRequest';

const SIX = 6;

export default function Details() {
  const { path } = useRouteMatch();
  const { id } = useParams();

  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';

  const recDomain = path.includes('/comidas')
    ? 'thecocktaildb' : 'themealdb';
  const recFirstKey = path.includes('/comidas')
    ? 'drinks' : 'meals';

  const history = useHistory();

  const [singleContent, setSingleContent] = useState([]);
  const [ingredientsList, setIngridientsList] = useState([]);
  const [recomendations, setRecomentation] = useState([]);

  const imgSrc = path.includes('/comidas') ? 'strMealThumb' : 'strDrinkThumb';
  const title = path.includes('/comidas') ? 'strMeal' : 'strDrink';

  useEffect(() => {
    async function getRecipeDetails() {
      getDataById(domain, id).then((res) => {
        setSingleContent(res[firstKey] || []);

        const list = Object.entries(res[firstKey][0]).filter((el) => (
          (el[0].includes('Ingredient')
          || el[0].includes('Measure')) && el[1]) && el[1] !== ' ');

        setIngridientsList(list);
      });

      getRandomData(recDomain).then((res) => setRecomentation(res[recFirstKey]
        .filter((_e, index) => index < SIX)));
    }
    getRecipeDetails();
  }, [id, domain, firstKey, recDomain, recFirstKey]);

  function handleFavorite() {
    saveFavoriteRecipe(id, path, singleContent[0])(title, imgSrc);
  }

  function handleRecipeInProgress() {
    history.push(`${path}/in-progress`);
  }

  if (!singleContent[0]) return <h1>Loading...</h1>;
  return (
    <>
      { singleContent.length > 0
      && (
        <>
          <img
            data-testid="recipe-photo"
            src={ singleContent[0][imgSrc] }
            alt={ singleContent[0][title] }
            width="200px"
          />
          <div className="recipe-heading-container">
            <div className="info-heading">
              <h3 data-testid="recipe-title">{singleContent[0][title]}</h3>
              <p data-testid="recipe-category">
                {
                  firstKey === 'drinks'
                    ? singleContent[0].strAlcoholic
                    : singleContent[0].strCategory
                }
              </p>
            </div>
            <Button>
              <img data-testid="share-btn" src={ shareIcon } alt="" />
            </Button>
            <Button onClick={ handleFavorite }>
              <img data-testid="favorite-btn" src={ blackHeartIcon } alt="" />
            </Button>
          </div>
          <div className="ingredients-container">
            <h4>
              Ingredients
            </h4>
            {ingredientsList.map((el, i, arr) => (
              <div key={ i }>
                <p
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  <span>
                    {el[0].includes('Ingredient') && el[1]}
                  </span>
                  {arr.filter((elt) => elt[0] === (`strMeasure${i + 1}`))
                    .map((result) => (
                      <span
                        key={ result }
                      >
                        { ` - ${result[1]}` }
                      </span>
                    ))}
                </p>
              </div>
            ))}
          </div>
          <div className="instructions-video-container">
            <p data-testid="instructions">
              {singleContent[0].strInstructions}
            </p>
            { path.includes('/comidas') && (
              <VideoPlayer
                testID="video"
                videoLink={ singleContent[0].strYoutube }
                recipeTitle={ singleContent[0][title] }
              />
            ) }
          </div>
        </>
      )}
      <div className="recomendations-container">
        { recomendations.map((item, i) => (
          <Card
            key={ i }
            mealOrDrink={ item }
            index={ i }
            testId="recomendation"
          />
        ))}
      </div>

      <Button
        onClick={ handleRecipeInProgress }
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </Button>
    </>
  );
}
