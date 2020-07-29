import React from 'react';
import Scientia from './pages/Scientia'
import Container from 'react-bootstrap/Container';

const App: React.FC = () => {
  return (
    <Container className="p-3">
      <Scientia/>
    </Container>
  );
};

export default App;