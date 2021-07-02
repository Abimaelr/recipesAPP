import React, { useState, useContext } from 'react';
import { fetchIngredientes, fetchNome, fetchFirstLetter } from '../Service/foodApi';

import RecipesContext from '../Context/RecipesContext';

function Lupa() {
  const { setResponseApiLupa } = useContext(RecipesContext);
  const [valuesSearch, setValuesSearch] = useState({});

  const handleChange = ({ target: { value, name, checked, type } }) => {
    const valueFiltered = (type === 'checkbox' ? checked : value);
    setValuesSearch({ ...valuesSearch, [name]: valueFiltered });
  };

  const getApi = () => {
    console.log('a');
    const input = valuesSearch.search;

    switch (valuesSearch.searchRadio) {
    case 'Ingredientes':

      return fetchIngredientes(input).then((result) => setResponseApiLupa(result));
    case 'Nome':
      return fetchNome(input).then((result) => setResponseApiLupa(result));
    case 'Primeira letra':
      return (input.length !== 1) ? alert('Sua busca deve conter somente 1 (um) caracter')
        : fetchFirstLetter(input).then((result) => setResponseApiLupa(result));
    default:
      break;
    }
  };

  return (
    <form>
      <label htmlFor="idSearch">
        <input
          id="idSearch"
          name="search"
          data-testid="search-input"
          placeholder="Buscar receitas"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio1">
        Ingredientes
        <input
          name="searchRadio"
          value="Ingredientes"
          type="radio"
          id="idRadio1"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio2">
        Nome
        <input
          name="searchRadio"
          value="Nome"
          type="radio"
          id="idRadio2"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio3">
        Primeira letra
        <input
          name="searchRadio"
          value="Primeira letra"
          type="radio"
          id="idRadio3"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => getApi() }
      >
        Buscar
      </button>
    </form>
  );
}
export default Lupa;
