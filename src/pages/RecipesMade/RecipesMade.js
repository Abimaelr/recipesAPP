import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import './RecipesMade.css';

function RecipesMade() {
  const [filter, setFilter] = useState('all');
  localStorage.setItem('doneRecipes', JSON.stringify([
    {
      id: 52771,
      type: 'comidas',
      area: '',
      category: 'Italian - Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: 178319,
      type: 'bebidas',
      area: '',
      category: 'Alcoholic',
      alcoholicOrNot: 'alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '10/06/2019',
      tags: [],
    },
  ]));

  const cardsRecipesDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const filted = doneRecipes.filter(({ type }) => type === filter || filter === 'all');

    return filted.map(({ image, category, name, doneDate, tags, type, id }, index) => (
      <div className="card" key={ index }>
        <Link to={ `/${type}/${id}` } className="link-img">
          <img
            src={ image }
            data-testid={ `${index}-horizontal-image` }
            alt="card recipe done"
          />
        </Link>

        <h6 data-testid={ `${index}-horizontal-top-text` }>{category}</h6>
        <Link to={ `/${type}/${id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
        </Link>

        <h5 data-testid={ `${index}-horizontal-done-date` }>
          {`Data de preparo: ${doneDate}`}
        </h5>
        {tags.map((tag) => (
          <span
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </span>
        ))}
        <button
          type="button"
          onClick={ () => {
            copy(`/${type}/${id}`);
          } }
        >
          <img
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
      </div>
    ));
  };

  return (
    <div id="page-drinks">
      <div>
        <Header title="Receitas Feitas" haveSrc={ false } />

        <div className="menu-box">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('all') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilter('comidas') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('bebidas') }
          >
            Drinks
          </button>
        </div>

        <div className="cards-recipes-done">

          {cardsRecipesDone()}

        </div>
      </div>
    </div>
  );
}

export default RecipesMade;
