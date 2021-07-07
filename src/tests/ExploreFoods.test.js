import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipesProvider from '../context/RecipesProvider';
import ExploreFoods from '../pages/ExploreFoods';
import renderWithRouter from '../renderWithRouter';

describe('Checks ExploreFoods Foods Page', () => {
  it('Cheks if the page has a profile button', () => {
    renderWithRouter(
      <RecipesProvider>
        <ExploreFoods />
      </RecipesProvider>,
    );

    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
  });

  it('Checks if the page has a title', () => {
    renderWithRouter(
      <RecipesProvider>
        <ExploreFoods />
      </RecipesProvider>,
    );

    const titlePage = screen.getByTestId('page-title');
    expect(titlePage.innerHTML).toBe('Explorar Comidas');
  });

  it('Checks if the page has three buttons and redirect to respectively pages', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <ExploreFoods />
      </RecipesProvider>,
    );

    const ingredientsButton = screen.getByRole('button', {
      name: /por ingredientes/i,
    });

    expect(ingredientsButton).toBeInTheDocument();

    userEvent.click(ingredientsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');

    const localRecipesButton = screen.getByRole('button', {
      name: /por local de origem/i,
    });

    expect(localRecipesButton).toBeInTheDocument();

    userEvent.click(localRecipesButton);

    const { pathname: pathname2 } = history.location;
    expect(pathname2).toBe('/explorar/comidas/area');
  });

  it('Check if the page has a footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <ExploreFoods />
      </RecipesProvider>,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
