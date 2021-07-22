import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { animationScreen, transition } from '../animations';
import Header from '../components/header';
import ButtonCategories from '../components/ButtonCategories';
import Cards from '../components/cards';
import Footer from '../components/footer';
import {
  fetchApiDrinkCategories,
  fetchDrinksRecipes,
  fetchFilterDrinkByCategories,
  getSearchBarResponse,
} from '../action/index';
import '../css/bebidas.css';

class Bebidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const { dispatchDrinks, apiDrinkCategories, drinks, hasSearchBar } = this.props;
    hasSearchBar(true);
    if (drinks.length === 0) {
      dispatchDrinks();
    }
    apiDrinkCategories();
  }

  componentDidUpdate() {
    const { drinks } = this.props;
    if (drinks.length === 1) {
      this.updateState();
    }
  }

  componentWillUnmount() {
    this.setState({ isRedirect: false });
  }

  updateState() {
    this.setState({ isRedirect: true });
  }

  render() {
    const { isRedirect } = this.state;
    const {
      drinks,
      location,
      drinksCategories,
      drinkByCategories,
      dispatchDrinks,
      match,
    } = this.props;
    return (
      <motion.section
        className="food-wrap"
        initial="out"
        animate="end"
        exit="out"
        variants={ animationScreen }
        transition={ transition }
      >
        <Header location={ location } />
        <main className="drink-main">
          <ButtonCategories
            btnClass="btn-filterDrinks-cards"
            getCategories={ drinksCategories }
            filter={ drinkByCategories }
            filterAll={ dispatchDrinks }
          />
          <section className="cards-content">
            {
              drinks.map((drink, index) => (
                <Cards
                  url={ match.path }
                  id={ drink.idDrink }
                  key={ index }
                  img={ drink.strDrinkThumb }
                  title={ drink.strDrink }
                  index={ index }
                />
              ))
            }
          </section>
          { isRedirect === true && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />}
        </main>
        <Footer />
      </motion.section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchDrinks: () => dispatch(fetchDrinksRecipes()),
  apiDrinkCategories: () => dispatch(fetchApiDrinkCategories()),
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
  drinkByCategories: (category) => dispatch(fetchFilterDrinkByCategories(category)),
});

const mapStateToProps = (state) => ({
  drinks: state.drinkCategories.drinks,
  drinksCategories: state.drinkCategories.allDrinkCategories,
});

Bebidas.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape).isRequired,
  drinksCategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
  apiDrinkCategories: PropTypes.func.isRequired,
  location: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  hasSearchBar: PropTypes.func.isRequired,
  drinkByCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);
