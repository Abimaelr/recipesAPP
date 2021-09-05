import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Provider from './context/ContextForm';
import DrinkExplore from './pages/DrinkExplore';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodProcess from './pages/FoodProcess';
import DrinkProcess from './pages/DrinkProcess';
import Explore from './pages/Explore';
import FoodExplore from './pages/FoodExplore';
import DrinkRecipes from './pages/DrinkRecipes';
import ExploreFoodIngredient from './pages/ExploreFoodIngredient';
import ExploreDrinkIngredient from './pages/ExploreDrinkIngredient';
import FoodByCountry from './pages/FoodByCountry';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import StarRecipes from './pages/StarRecipes';
import FoodRecipes from './pages/FoodRecipes';
import Credits from './pages/Credits';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/recipesAPP/" component={ Login } />
          <Route exact path="/recipesAPP/comidas" component={ FoodRecipes } />
          <Route exact path="/recipesAPP/bebidas" component={ DrinkRecipes } />
          <Route exact path="/recipesAPP/comidas/:id" component={ FoodDetails } />
          <Route exact path="/recipesAPP/bebidas/:id" component={ DrinkDetails } />
          <Route exact path="/recipesAPP/comidas/:id/in-progress" component={ FoodProcess } />
          <Route exact path="/recipesAPP/bebidas/:id/in-progress" component={ DrinkProcess } />
          <Route exact path="/recipesAPP/explorar" component={ Explore } />
          <Route exact path="/recipesAPP/explorar/comidas" component={ FoodExplore } />
          <Route exact path="/recipesAPP/explorar/bebidas" component={ DrinkExplore } />
          <Route
            exact
            path="/recipesAPP/explorar/comidas/ingredientes"
            component={ ExploreFoodIngredient }
          />
          <Route
            exact
            path="/recipesAPP/explorar/bebidas/ingredientes"
            component={ ExploreDrinkIngredient }
          />
          <Route exact path="/recipesAPP/explorar/comidas/area" component={ FoodByCountry } />
          <Route exact path="/recipesAPP/perfil" component={ Profile } />
          <Route exact path="/recipesAPP/receitas-feitas" component={ DoneRecipes } />
          <Route exact path="/recipesAPP/receitas-favoritas" component={ StarRecipes } />
          <Route exact path="/recipesAPP/credits" component={ Credits } />
          <Route component={ NotFound } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
