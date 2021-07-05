import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialFoods from '../Hooks/fetchInicialFoods';

function Comidas() {
  const DOZE = 12;
  Comidas.displayName = 'Comidas';
  const { data } = useContext(ContextRecipes);
  useFetchInicialFoods();

  const dataAux = { ...data };
  const { meals } = dataAux;
  console.log(meals);

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => (
    <div>
      {meals === null ? alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        : meals && meals.slice(0, DOZE).map((food, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
          </div>))}
    </div>);

  return (
    <div>
      <Header title={ Comidas.displayName } />
      <h1>Comidas</h1>
      <div>
        {!data.meals ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;
