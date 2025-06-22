
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  currentScene: string;
  setCurrentScene: (scene: string) => void;
  gameData: any;
  setGameData: (data: any) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentScene, setCurrentScene] = useState('welcome');
  const [gameData, setGameData] = useState({
    selectedSoftware: '',
    selectedModel: '',
    level: 1,
    score: 0,
    modelsLearned: []
  });

  return (
    <GameContext.Provider value={{ currentScene, setCurrentScene, gameData, setGameData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
