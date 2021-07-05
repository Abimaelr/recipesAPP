import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import fetchAPI from '../services/apiRequest';

const TWELVE = 12;
const FIVE = 5;
export default function MainPage() {
  const { path } = useRouteMatch();
  const searchId = path === '/comidas' ? 'idMeal' : 'idDrink';
  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';

  const { searchResult, limit, setLimit } = useContext(RecipesContext);
  const [isLoading, setLoader] = useState(true);
  const [dataResult, setDataResult] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [renderer, setRenderer] = useState([]);

  // Source: https://dev.to/otamnitram/react-useeffect-cleanup-how-and-when-to-use-it-2hbm

  useEffect(() => {
    let mounted = true;
    async function getInitialStatePopulated() {
      const URL = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
      const resolved = await fetchAPI(URL);
      if (mounted) {
        setDataResult(resolved[firstKey]);
        setLoader(false);
      }
    }
    getInitialStatePopulated();

    setRenderer(dataResult.filter((_e, index) => index < limit));
    if (searchResult && searchResult.length > 1) {
      setRenderer(searchResult.filter((_e, index) => index < limit));
      setLoader(false);
    }
    return function cleanup() {
      mounted = false;
    };
  }, [limit, firstKey, dataResult, searchResult, domain]);

  useEffect(() => {
    async function getListPopulated() {
      setLoader(true);
      const URL = `https://www.${domain}.com/api/json/v1/1/list.php?c=list`;
      const list = await fetchAPI(URL);
      setCategoriesList(list[firstKey].filter((_e, index) => index < FIVE));
    }
    getListPopulated();
  }, [domain, firstKey]);

  function handleMoreCards() {
    setLimit(limit + TWELVE);
  }

  return (
    <>
      <Header />
      {categoriesList.map((category) => (
        <Button
          data-testid={ `${category.strCategory}-category-filter` }
          key={ category.strCategory }
        >
          {category.strCategory}
        </Button>))}
      {isLoading
        ? <p>Loading...</p>
        : renderer.map((item, i) => (
          <Link key={ item[searchId] } to={ `${path}/${item[searchId]}` }>
            <Card mealOrDrink={ item } index={ i } />
          </Link>))}
      <button type="button" onClick={ handleMoreCards }>More Recipes</button>
      <Footer />
    </>
  );
}
