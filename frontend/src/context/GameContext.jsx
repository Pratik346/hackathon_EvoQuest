import { createContext, useState, useCallback } from "react";
import { getCharacter } from "../api/character.api";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [character, setCharacter] = useState(null);
  const [loadingCharacter, setLoadingCharacter] = useState(false);

  const refreshCharacter = useCallback(async () => {
    setLoadingCharacter(true);
    try {
      const res = await getCharacter();
      setCharacter(res.data);
    } finally {
      setLoadingCharacter(false);
    }
  }, []);

  return (
    <GameContext.Provider value={{ character, setCharacter, loadingCharacter, refreshCharacter }}>
      {children}
    </GameContext.Provider>
  );
}