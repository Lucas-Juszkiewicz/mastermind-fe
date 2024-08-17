import { createContext, ReactNode, useContext, useState } from 'react'
interface GameInProgressContext {
    setGameData: Function;
    gameData: GameData | null;
  }
  export const GameInProgressContext = createContext<GameInProgressContext | undefined>(undefined);

  interface GameData {
    id: number;
    userId: number;
    startTime: string;
    finishTime: string;
    round: number;
    response: number[];
    sequenceJson: string;
    sequence: number[];
    guesses: number[][];
    guessesJson: string;
    previousResponses: number[][];
    previousGuesses: number[][];
    finalMessage: string;
  }

export const GameDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gameData, setGameData] = useState<GameData | null>(null);
  return (
    <GameInProgressContext.Provider value={{ gameData, setGameData }}>
    {children}
  </GameInProgressContext.Provider>
  )
}

export const useGameData = () => {
    const context = useContext(GameInProgressContext);
    if (!context) {
      throw new Error('GameInProgressContext problem');
    }
    return context;
  };
