import  Header  from './components/Header';
import  SideNav  from './components/SideNav';
import  PokeCard  from './components/PokeCard';
import './App.css';
import { useState } from 'react';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  function hanldeToogleMenu(){
    setShowSideMenu(!showSideMenu);
  }


  return (
    <>
    <Header 
    hanldeToogleMenu={hanldeToogleMenu}/>
    <div className='container'>

    <SideNav 
    selectedPokemon={selectedPokemon} 
    setSelectedPokemon={setSelectedPokemon} 
    hanldeToogleMenu={hanldeToogleMenu} 
    showSideMenu={showSideMenu}/>
    <PokeCard 
    selectedPokemon={selectedPokemon} />
    
    </div>
    <footer></footer>
    </>
  );
}

export default App;
