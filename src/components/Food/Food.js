import React, { useState, useEffect } from 'react';
import requestMeal from '../../functions/requests';
import './Food.css';

function Food() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestMeal();
      setData(resolve);
      setLoading(false);
    }());
  }, []);

  function mapData(param) {
    const { meals } = param;
    const magicNumber = 12;
    return meals
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <div key={ index } className="card-meals-items">
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            alt={ `imagem de ${item}` }
          />
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
        </div>
      ));
  }

  return (
    <div className="card-meals">
      {
        loading
          ? 'Carregando...'
          : (mapData(data))
      }
    </div>
  );
}

export default Food;
