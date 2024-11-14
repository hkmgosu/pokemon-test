import React from "react";

interface PokemonCardProps {
  name: string;
  attackName: string;
  attackPower: number;
  sprite: string;
  player: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  attackName,
  attackPower,
  sprite,
  player,
}) => {
  return (
    <div className={`flex flex-row items-center w-full`}>
      {player === 2 && <img src={sprite} alt={name} className="w-64 h-64" />}
      <div className="border border-gray-300 p-4 m-4 rounded-lg flex flex-row justify-between items-center w-full">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p className="border border-gray-300 p-4 text-xs rounded-full">
          {attackName}: {attackPower}
        </p>
      </div>
      {player === 1 && <img src={sprite} alt={name} className="w-64 h-64" />}
    </div>
  );
};

export default PokemonCard;
