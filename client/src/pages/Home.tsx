import React, { useEffect, useState } from 'react';
import PokemonGrid from './pokemon-grid'
import TopBar from '../components/TopBar';
import Pokemon from '../components/Pokemon';

function Home() {
    const [search, setSearch] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null >( localStorage.getItem('userUIID'));

    useEffect(() => {
        if(!userId) {
            const uiid = "ID"+ new Date().getTime();
            localStorage.setItem('userUIID', uiid);
            setUserId(uiid);
        }
    }, []);

    return (
        <div className="App">
            <TopBar onChange={(value) => {
                if (value) { setSearch(value); }
                else { setSearch(null); }
            }} userId={userId || ""}/>
            {
                search && <Pokemon id={search} />
            }
            {
                !search && <PokemonGrid />
            }

        </div>
    );
}

export default Home;