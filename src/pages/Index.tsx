
import React, { useState, useEffect } from 'react';
import WelcomeScene from '../components/game/WelcomeScene';
import LearnModelsScene from '../components/game/LearnModelsScene';
import Level1Scene from '../components/game/Level1Scene';
import Level2Scene from '../components/game/Level2Scene';
import Level3Scene from '../components/game/Level3Scene';
import VictoryScene from '../components/game/VictoryScene';
import { GameProvider } from '../contexts/GameContext';

const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
        <GameScenes />
      </div>
    </GameProvider>
  );
};

const GameScenes = () => {
  const [currentScene, setCurrentScene] = useState('welcome');
  const [gameData, setGameData] = useState({
    selectedSoftware: '',
    selectedModel: '',
    level: 1,
    score: 0,
    modelsLearned: []
  });

  const navigateToScene = (scene: string) => {
    setCurrentScene(scene);
  };

  const updateGameData = (data: any) => {
    setGameData(prev => ({ ...prev, ...data }));
  };

  const renderScene = () => {
    switch (currentScene) {
      case 'welcome':
        return <WelcomeScene onNext={() => navigateToScene('learn')} />;
      case 'learn':
        return (
          <LearnModelsScene 
            onNext={() => navigateToScene('level1')} 
            onBack={() => navigateToScene('welcome')}
            gameData={gameData}
            updateGameData={updateGameData}
          />
        );
      case 'level1':
        return (
          <Level1Scene 
            onNext={() => navigateToScene('level2')} 
            onBack={() => navigateToScene('learn')}
            gameData={gameData}
            updateGameData={updateGameData}
          />
        );
      case 'level2':
        return (
          <Level2Scene 
            onNext={() => navigateToScene('level3')} 
            onBack={() => navigateToScene('level1')}
            gameData={gameData}
            updateGameData={updateGameData}
          />
        );
      case 'level3':
        return (
          <Level3Scene 
            onNext={() => navigateToScene('victory')} 
            onBack={() => navigateToScene('level2')}
            gameData={gameData}
            updateGameData={updateGameData}
          />
        );
      case 'victory':
        return (
          <VictoryScene 
            onReplay={() => navigateToScene('welcome')}
            onLearnAgain={() => navigateToScene('learn')}
            gameData={gameData}
          />
        );
      default:
        return <WelcomeScene onNext={() => navigateToScene('learn')} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/5 to-pink-900/10" />
      {renderScene()}
    </div>
  );
};

export default Index;
