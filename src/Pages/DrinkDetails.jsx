/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { copy } from 'fs-extra';
import { setProgressItem } from '../services/services';
import { GetRecipesDetails, getDrinks } from '../redux/actions';
import Details from '../Components/Details';
import CarroselComidas from '../Components/CarroselComidas';
// import BeverageAPI from '../services/BeverageRecipesAPI';
// import MealRecipesAPI from '../services/MealRecipesAPI';
// import Share from '../images/shareIcon.svg';
// import FavoriteWhite from '../images/whiteHeartIcon.svg';
// import FavoriteBlack from '../images/blackHeartIcon.svg';
import '../styles/Card.css';
import DrinkApi from '../services/BeverageRecipesAPI';
import MealAPI from '../services/MealRecipesAPI';

const DrinkDetails = (props) => {
  const { match: { params: { id } } } = props;
  const [item, setItem] = useState({});
  // const [visible, setVisible] = useState('hidden');
  // const [favoriteBtn, setFavoriteBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const inProgressItems = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const inProgressItemsIDs = Object.keys(inProgressItems.cocktails || {});
  const {
    setDrinkDetails,
    drink,
    redirect,
  } = props;
  async function resultDrink() {
    const listRecomendations = await MealAPI.getByDefault();
    await DrinkApi.getDrinkById(id);
    setItem({ listRecomendations });
  }

  useEffect(() => {
    // DrinkApi.getDrinkById(id)
    //   .then((res) => localStorage.setItem('itemDetails', JSON.stringify(res[0])));
    if (loading) {
      setDrinkDetails(id)
        .then(() => resultDrink()
          .then(() => setLoading(false)));
    }
  }, []);

  // function checkBtnReceita() {
  //   const getReceitaStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  //   getReceitaStorage.forEach((receita) => {
  //     if (receita === id) {
  //       setVisible('');
  //     }
  //   });
  // }

  // function iniciarReceita() {
  //   const valueStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  //   localStorage.setItem('doneRecipes', JSON.stringify([...valueStorage, id]));
  //   checkBtnReceita();
  // }

  // function favoriteChanger() {
  //   setFavoriteBtn(!favoriteBtn);
  // }

  // function Checker() {
  //   console.log(drink[0]);
  // }

  // const copy = require('clipboard-copy')

  return !redirect ? <h3>Loading</h3>
    : (
      <div className="card-details">
        { (drink || []).map((drinkItem, index) => (
          <React.Fragment key={ index }>
            <Details id={ id } item={ drinkItem } type="Drink" />
            <CarroselComidas recomendations={ item.listRecomendations || [] } />
            <Link to={ `/bebidas/${id}/in-progress` }>
              <button
                className="start"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => setProgressItem(id, 'cocktails') }
              >
                {inProgressItemsIDs.includes(id)
                  ? 'Continuar Receita' : 'Iniciar Receita'}
              </button>
            </Link>
          </React.Fragment>

        ))}
      </div>
    );
};

DrinkDetails.propTypes = {
  id: PropTypes.any,
  drinkById: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  drink: state.details.item,
  redirect: state.details.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  setDrinkDetails: (value) => dispatch(GetRecipesDetails(value, DrinkApi.getDrinkById)),
  getDrinkId: (value, callback) => dispatch(getDrinks(value, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetails);
