import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { apiRequestMeal, apiRequestDrink } from '../services/helpers/apiServises';

const RecipeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [radioValue, setValueRadio] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    async function setDataRecipes() {
      const NUMBER_RENDER = 12;

      if (pathname === '/comidas') {
        const response = await apiRequestMeal(radioValue, inputValue) || [];
        setData(response.slice(0, NUMBER_RENDER));
      }
      if (pathname === '/bebidas') {
        const response = await apiRequestDrink(radioValue, inputValue) || [];
        setData(response.slice(0, NUMBER_RENDER));
      }
    }
    if (pathname) {
      setDataRecipes();
    }
  }, [radioValue, inputValue, pathname]);

  const objContext = {
    data,
    setData,
    setValueRadio,
    setInputValue,
    setPathname,
    inputValue,
    radioValue,
  };

  return (
    <Context.Provider value={ objContext }>
      {children}
    </Context.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeProvider;
