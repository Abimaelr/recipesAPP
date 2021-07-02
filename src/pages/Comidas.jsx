import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardsDeReceitas from '../components/CardsDeReceitas';
import AppReceitasContext from '../context/AppReceitasContext';

const MAX = 12;

function Comidas() {
  const { fetchAPI } = useContext(AppReceitasContext);
  const { meals } = fetchAPI;

  return (
    <section>
      <Container>
        <Header />
        {meals && <CardsDeReceitas receitas={ meals.slice(0, MAX) } />}
        <Footer />
      </Container>
    </section>
  );
}

export default Comidas;
