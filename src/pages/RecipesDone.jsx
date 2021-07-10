import React, { useState } from 'react';
import { copyEachLink } from '../services/functions';

import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function RecipesDone() {
  const [isCopied, setIsCopied] = useState([]);
  const rawDestructuredStorage = localStorage.getItem('doneRecipes');
  const destructuredStorage = JSON.parse(rawDestructuredStorage);
  let AlcoholicAreaCategory;
  const checkAlcoholicOrNot = () => (
    destructuredStorage.map((each, index) => {
      if (each.alcoholicOrNot.length > 0) {
        AlcoholicAreaCategory = each.alcoholicOrNot;
      } else {
        AlcoholicAreaCategory = `${each.area} - ${each.category}`;
      }
      return (
        <section key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt="horizontal"
            src={ each.image }
            width="200px"
          />
          <h1
            data-testid={ `${index}-horizontal-top-text` }
          >
            {AlcoholicAreaCategory}
          </h1>
          <h1 data-testid={ `${index}-horizontal-name` }>{each.name}</h1>
          <p data-testid={ `${index}-horizontal-done-date` }>{each.doneDate}</p>
          <button
            type="button"
            onClick={ () => setIsCopied(
              copyEachLink(`/${each.type}s/${each.id}`, index),
            ) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
            {isCopied[index] ? <p>Link copiado!</p> : null }
          </button>
          <div data-testid={ `${index}-Pasta-horizontal-tag` }>{each.tags[0]}</div>
          <div data-testid={ `${index}-Curry-horizontal-tag` }>{each.tags[1]}</div>
        </section>
      );
    }));
  return (
    <>
      <Header title="Receitas Feitas" />
      <button data-testid="filter-by-all-btn" type="button">Todas</button>
      <button data-testid="filter-by-food-btn" type="button">Comidas</button>
      <button data-testid="filter-by-drink-btn" type="button">Bebidas</button>
      {checkAlcoholicOrNot()}
    </>
  );
}

export default RecipesDone;
