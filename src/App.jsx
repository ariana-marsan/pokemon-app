import  Header  from './components/Header';
import  SideNav  from './components/SideNav';
import  PokeCard  from './components/PokeCard';
import './App.css';
import { useState } from 'react';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);


  return (
    <>
    <Header />
    <div className='container'>
    <SideNav selectedPokemon={selectedPokemon} setSelectedPokemon={selectedPokemon} />
    <PokeCard selectedPokemon={selectedPokemon} />
    </div>
    </>
  );
}

export default App;
