import React, { useState } from 'react';
import PokemonGrid from './pokemon-grid'
import TopBar from '../components/TopBar';
import Pokemon from '../components/Pokemon';

function Home() {
    const [search, setSearch] = useState<string | null>(null);

  return (
    <div className="App">
        <TopBar onChange={(value) => {
            if(value) {setSearch(value);}
            else {setSearch(null);}
        }}/>
        {
            search && <Pokemon id={search}/>
        }
        {
            !search && <PokemonGrid />
        }
        
    </div>
  );
}

export default Home;