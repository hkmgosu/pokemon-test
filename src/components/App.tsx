import React, { useCallback, useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import BattleLog from "./BattleLog";

interface Pokemon {
  id: number;
  name: string;
  moves: { move: { name: string }; power: number }[];
  sprite: string;
}

const App: React.FC = () => {
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  const [battleLog, setBattleLog] = useState<string>("...");

  const fetchPokemon = async (id: number): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    // Pick a random move
    const randomMoveIndex = Math.floor(Math.random() * data.moves.length);
    return {
      id: data.id,
      name: data.name,
      moves: [
        {
          move: { name: data.moves[randomMoveIndex].move.name },
          power: Math.floor(Math.random() * 100) + 1,
        },
      ],
      sprite: data.sprites.front_default,
    };
  };

  const selectRandomPokemon = useCallback(async () => {
    const id1 = Math.floor(Math.random() * 898) + 1; // There are 898 Pokémon
    const id2 = Math.floor(Math.random() * 898) + 1;

    const pokemonA = await fetchPokemon(id1);
    const pokemonB = await fetchPokemon(id2);

    setPokemon1(pokemonA);
    setPokemon2(pokemonB);
    setBattleLog("...");
  }, []);

  const startBattle = () => {
    if (pokemon1 && pokemon2) {
      const attack1 = pokemon1.moves[0].power;
      const attack2 = pokemon2.moves[0].power;

      if (attack1 > attack2) {
        setBattleLog(
          `${pokemon1.name} wins with an attack power of ${attack1}!`
        );
      } else if (attack2 > attack1) {
        setBattleLog(
          `${pokemon2.name} wins with an attack power of ${attack2}!`
        );
      } else {
        setBattleLog(`It's a tie! Both Pokémon dealt the same damage.`);
      }
    }
  };

  useEffect(() => {
    selectRandomPokemon();
  }, [selectRandomPokemon]);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Pokémon Battle</h1>
      <button
        onClick={selectRandomPokemon}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Select Random Pokémon
      </button>
      {pokemon1 && pokemon2 && (
        <div className="border border-gray-300 p-4 rounded-lg flex flex-col items-center mt-10 w-3/6">
          <PokemonCard
            player={1}
            attackName={pokemon1.moves[0].move.name}
            attackPower={pokemon1.moves[0].power}
            {...pokemon1}
          />
          <PokemonCard
            player={2}
            attackName={pokemon2.moves[0].move.name}
            attackPower={pokemon2.moves[0].power}
            {...pokemon2}
          />
        </div>
      )}
      {pokemon1 && pokemon2 && (
        <div className="flex flex-row w-3/6">
          <BattleLog log={battleLog} />
          <button
            onClick={startBattle}
            className="bg-green-500 text-white px-4 py-2 rounded ml-4 mt-4 hover:bg-green-600 w-2/6"
          >
            Start Battle!
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
