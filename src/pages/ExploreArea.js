import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import { getAreasList, getRecipeByArea, getRandomData } from '../services/apiRequest';

function ExploreArea() {
  const { limit } = useContext(RecipesContext);
  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [renderer, setRenderer] = useState([]);

  useEffect(() => {
    function getDataArea() {
      getAreasList().then(({ meals }) => setAreaList([{ strArea: 'All' }].concat(meals)));
    }
    getDataArea();
  }, []);

  useEffect(() => {
    function getFilteredArea() {
      getRecipeByArea(selectedArea)
        .then(({ meals }) => setRenderer(meals.filter((_e, index) => index < limit)));
    }
    if (selectedArea !== 'All') getFilteredArea();
  }, [limit, selectedArea]);

  useEffect(() => {
    function getDataAll() {
      getRandomData('themealdb')
        .then(({ meals }) => setRenderer(meals.filter((_e, index) => index < limit)));
    }
    if (selectedArea === 'All') getDataAll();
  }, [limit, selectedArea]);

  function handleAreaSelect({ target: { value } }) {
    setSelectedArea(value);
  }

  return (
    <>
      <Header />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleAreaSelect }
      >
        {areaList
          .map(({ strArea }) => (
            <option
              data-testid={ `${strArea}-option` }
              value={ strArea }
              key={ strArea }
            >
              {strArea}
            </option>))}
      </select>
      {renderer && renderer.map((item, i) => (
        <Link key={ i } to={ `/comidas/${item.idMeal}` }>
          <Card mealOrDrink={ item } index={ i } testId="recipe" />
        </Link>))}
      <Footer />
    </>
  );
}
// concerta caquinha no github

export default ExploreArea;
