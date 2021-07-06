import React from 'react';

import Header from '../components/Header';

function Done() {
  return (
    <main>
      <Header title="Receitas Feitas" showSearchIcon={ false } />
      <p>ReceitasFeitas</p>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    </main>
  );
}

export default Done;
