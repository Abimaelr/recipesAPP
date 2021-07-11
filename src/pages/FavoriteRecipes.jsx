import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import Header from '../components/Header';
import BodyFavoriteRecipes from '../components/BodyFavoriteRecipes';

export default function FavoriteRecipes({ history }) {
  const [whatIsActivated, setWhatIsActivated] = useState(0);
  const rawDestructuredStorage = localStorage.getItem('favoriteRecipes');
  const destructuredStorage = JSON.parse(rawDestructuredStorage);
  const attStateFilter = (selected) => {
    setWhatIsActivated(selected);
  };
  const renderFilteredList = () => {
    let filteredList = [];
    if (whatIsActivated === 0) {
      filteredList = destructuredStorage;
    }
    if (whatIsActivated === 1) {
      filteredList = destructuredStorage
        .filter((eachOne) => eachOne.type === 'comida');
    }
    if (whatIsActivated === 2) {
      filteredList = destructuredStorage
        .filter((eachOne) => eachOne.type === 'bebida');
    }
    return (filteredList
      .map((each, index) => (
        <BodyFavoriteRecipes
          key={ index }
          index={ index }
          history={ history }
          each={ each }
        />
      )));
  };
  return (
    <article>
      <Header title="Receitas Favoritas" />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => attStateFilter(0) }
        type="button"
      >
        Todas
      </button>
      <button
        data-testid="filter-by-food-btn"
        onClick={ () => attStateFilter(1) }
        type="button"
      >
        Comidas
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => attStateFilter(2) }
        type="button"
      >
        Bebidas
      </button>
      {destructuredStorage ? renderFilteredList() : null}
    </article>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
