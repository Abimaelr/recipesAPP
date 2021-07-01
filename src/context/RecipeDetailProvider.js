import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeDetailContext } from '.';
import {
  detailRecipeDrinks,
  detailRecipeMeal,
  recipesListRecomendationApi }
  from '../service/api';

export default function RecipeDetailProvider({ children }) {
  const NUM_SIX = 6;

  const { pathname } = useLocation();
  const [idDetail, setIdDetail] = useState('');
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [recipesRecomendation, setRecipesRecomendation] = useState([]);
  const [isRecomendation, setIsRecomendation] = useState(false);

  useEffect(() => {
    const requestDetail = async () => {
      if (pathname === `/bebidas/${idDetail}`) {
        const returnDetail = await detailRecipeDrinks(idDetail);
        setRecipeDetail(returnDetail);
      }
      if (pathname === `/comidas/${idDetail}`) {
        const returnDetail = await detailRecipeMeal(idDetail);
        setRecipeDetail(returnDetail);
      }
    };
    requestDetail();
  }, [idDetail]);

  // RECOMENDATIONS
  useEffect(() => {
    async function requestRecomendation() {
      const returnRecomendation = await recipesListRecomendationApi(pathname);
      const limitedCategories = returnRecomendation.slice(0, NUM_SIX);
      setRecipesRecomendation(limitedCategories);
    }
    if (isRecomendation) {
      requestRecomendation();
    }
  }, [isRecomendation]);

  return (
    <div>
      <RecipeDetailContext.Provider
        value={ {
          setIdDetail,
          recipeDetail,
          setRecipeDetail,
          setIsRecomendation,
          recipesRecomendation,
        } }
      >
        { children }
      </RecipeDetailContext.Provider>
    </div>
  );
}

RecipeDetailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
