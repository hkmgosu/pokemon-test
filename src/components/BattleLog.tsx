import React from "react";

interface BattleLogProps {
  log: string;
}

const BattleLog: React.FC<BattleLogProps> = ({ log }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg mt-4 w-full">
      <h2 className="text-lg font-bold">Battle Log</h2>
      <p>{log}</p>
    </div>
  );
};

export default BattleLog;
