import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();
  return (
    <Container>
      <Header profile name="Explorar" />
      <Container>
        <Container>
          <Button
            data-testid="explore-food"
            variant="outline-secondary"
            size="lg"
            onClick={ () => history.push('/explorar/comidas') }
          >
            Explorar Comidas
          </Button>
        </Container>
        <Container>
          <Button
            data-testid="explore-drinks"
            variant="outline-secondary"
            size="lg"
            onClick={ () => history.push('/explorar/bebidas') }
          >
            Explorar Bebidas
          </Button>
        </Container>
      </Container>
      <Footer />
    </Container>
  );
}

export default Explore;
