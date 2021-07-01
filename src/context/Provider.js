import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

const checkOption = ({ inputSearch, option, food }) => {
  let query;
  let db;
  switch (option) {
  case 'ingredient':
    query = `filter.php?i=${inputSearch}`;
    break;
  case 'name':
    query = `search.php?s=${inputSearch}`;
    break;
  case 'firstLetter':
    query = `search.php?f=${inputSearch}`;
    break;
  default:
    return false;
  }

  if (food) db = 'themealdb';
  if (!food) db = 'thecocktaildb';

  return `https://www.${db}.com/api/json/v1/1/${query}`;
};

const Provider = ({ children }) => {
  const [searchOp, setSearchOp] = useState({});
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    const endPoint = checkOption(searchOp);
    fetch(endPoint)
      .then((res) => res.json())
      .then(setRecipes);
  }, [searchOp]);

  // const notFound = () => {
  //   const { meals, drinks } = recipes;
  //   if (!drinks.length || !meals.length) {
  //     global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //   }
  const value = {
    setSearchOp,
    recipes,
  };

  return (
    <GlobalContext.Provider value={ value }>
      { children }
    </GlobalContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
