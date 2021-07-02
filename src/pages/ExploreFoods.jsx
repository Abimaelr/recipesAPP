import React, { useContext } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import { fetchRandomRecipe } from '../services/RecipesServices';

import '../styles/ExploreFoods.css';

function ExploreFoods() {
  const { setRandomRecipe } = useContext(RecipesContext);

  const history = useHistory();

  async function redirectToFoodDetails() {
    const meal = await fetchRandomRecipe();
    const randomRecipe = meal.meals;

    setRandomRecipe(randomRecipe);

    const { idMeal } = randomRecipe[0];

    history.push(`/comidas/${idMeal}`);
  }

  return (
    <Container>
      <Header profile name="Explorar Comidas" />
      <ButtonGroup className="buttons-explore-foods">
        <Button
          data-testid="explore-by-ingredient"
          variant="outline-secondary"
          size="lg"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </Button>

        <Button
          data-testid="explore-by-area"
          variant="outline-secondary"
          size="lg"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </Button>

        <Button
          data-testid="explore-surprise"
          variant="outline-secondary"
          size="lg"
          onClick={ () => redirectToFoodDetails() }
        >
          Me Surpreenda!
        </Button>

      </ButtonGroup>
      <Footer />
    </Container>
  );
}

export default ExploreFoods;
