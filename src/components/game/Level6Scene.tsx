
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, CheckCircle, X, Clock, Zap, Crown, RefreshCw } from 'lucide-react';

interface Level6SceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const softwareOptions = [
  {
    id: 'mars-mission',
    name: 'Mars Mission Control',
    icon: '🚀',
    description: 'Interplanetary spacecraft control',
    correctModel: 'waterfall',
    reasoning: 'Mars missions require flawless planning as communication delays make real-time fixes impossible'
  },
  {
    id: 'brain-interface',
    name: 'Brain-Computer Interface',
    icon: '🧠',
    description: 'Neural implant control system',
    correctModel: 'vmodel',
    reasoning: 'Brain interfaces require extensive validation and testing for human safety and precision'
  },
  {
    id: 'global-climate',
    name: 'Climate Control AI',
    icon: '🌍',
    description: 'Planetary weather management',
    correctModel: 'spiral',
    reasoning: 'Climate systems involve enormous risks and require careful analysis of complex interactions'
  },
  {
    id: 'fusion-reactor',
    name: 'Fusion Reactor Control',
    icon: '⚡',
    description: 'Nuclear fusion power plant',
    correctModel: 'vmodel',
    reasoning: 'Fusion reactors require rigorous testing and validation for safety and operational precision'
  },
  {
    id: 'time-machine',
    name: 'Time Travel Coordinator',
    icon: '⏰',
    description: 'Temporal displacement system',
    correctModel: 'spiral',
    reasoning: 'Time travel involves unknown risks and paradoxes requiring extensive risk analysis'
  },
  {
    id: 'ai-singularity',
    name: 'AGI Safety Monitor',
    icon: '🤖',
    description: 'Artificial General Intelligence oversight',
    correctModel: 'spiral',
    reasoning: 'AGI development involves existential risks requiring continuous risk assessment and mitigation'
  },
  {
    id: 'quantum-internet',
    name: 'Quantum Internet Hub',
    icon: '🌐',
    description: 'Quantum communication network',
    correctModel: 'iterative',
    reasoning: 'Quantum networks need gradual deployment and iterative refinement of quantum protocols'
  },
  {
    id: 'dimensional-portal',
    name: 'Dimensional Gateway',
    icon: '🌀',
    description: 'Interdimensional travel system',
    correctModel: 'spiral',
    reasoning: 'Dimensional travel involves unknown risks and requires extensive risk analysis and safety protocols'
  },
  {
    id: 'consciousness-backup',
    name: 'Mind Upload System',
    icon: '💾',
    description: 'Human consciousness transfer',
    correctModel: 'vmodel',
    reasoning: 'Mind transfer requires extensive validation to ensure consciousness integrity and human identity'
  },
  {
    id: 'galactic-defense',
    name: 'Galactic Defense Grid',
    icon: '🛡️',
    description: 'Solar system protection array',
    correctModel: 'waterfall',
    reasoning: 'Galactic defense requires comprehensive planning and cannot afford any system failures'
  },
  {
    id: 'reality-engine',
    name: 'Reality Simulation Engine',
    icon: '🎭',
    description: 'Universe simulation platform',
    correctModel: 'agile',
    reasoning: 'Reality engines need rapid iteration and adaptation based on complex simulation requirements'
  },
  {
    id: 'evolution-accelerator',
    name: 'Evolution Controller',
    icon: '🧬',
    description: 'Species development system',
    correctModel: 'spiral',
    reasoning: 'Evolution control involves massive biological risks requiring careful analysis and ethical considerations'
  },
  {
    id: 'multiverse-navigator',
    name: 'Multiverse Explorer',
    icon: '∞',
    description: 'Parallel universe travel',
    correctModel: 'spiral',
    reasoning: 'Multiverse exploration involves infinite unknown risks requiring extensive analysis'
  },
  {
    id: 'god-mode-os',
    name: 'Omnipotent OS',
    icon: '👑',
    description: 'Universal control system',
    correctModel: 'waterfall',
    reasoning: 'Universal control systems require perfect planning as omnipotent errors could destroy reality'
  },
  {
    id: 'destiny-weaver',
    name: 'Fate Management System',
    icon: '🎲',
    description: 'Probability manipulation engine',
    correctModel: 'spiral',
    reasoning: 'Fate manipulation involves catastrophic risks to causality requiring continuous risk assessment'
  }
];

const allModels = [
  { id: 'waterfall', name: 'Waterfall', emoji: '🧓', color: 'from-blue-500 to-blue-700' },
  { id: 'agile', name: 'Agile', emoji: '👟', color: 'from-green-500 to-green-700' },
  { id: 'iterative', name: 'Iterative', emoji: '🔁', color: 'from-purple-500 to-purple-700' },
  { id: 'spiral', name: 'Spiral', emoji: '🌀', color: 'from-orange-500 to-orange-700' },
  { id: 'vmodel', name: 'V-Model', emoji: '🧪', color: 'from-pink-500 to-pink-700' }
];

const Level6Scene: React.FC<Level6SceneProps> = ({ onNext, onBack, gameData, updateGameData }) => {
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (selectedSoftware && !showResult) {
      setTimerActive(true);
      setTimeLeft(20);
    }
  }, [selectedSoftware]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      const software = softwareOptions.find(s => s.id === selectedSoftware);
      const wrongModels = allModels.filter(m => m.id !== software?.correctModel);
      const randomWrong = wrongModels[Math.floor(Math.random() * wrongModels.length)];
      handleModelSelect(randomWrong.id);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, selectedSoftware]);

  const handleSoftwareSelect = (softwareId: string) => {
    setSelectedSoftware(softwareId);
    setSelectedModel(null);
    setShowResult(false);
    setAttempts(0);
  };

  const handleModelSelect = (modelId: string) => {
    if (!selectedSoftware) return;
    
    setTimerActive(false);
    setSelectedModel(modelId);
    const software = softwareOptions.find(s => s.id === selectedSoftware);
    const correct = software?.correctModel === modelId;
    
    setIsCorrect(correct);
    setShowResult(true);
    setAttempts(prev => prev + 1);
    
    if (correct) {
      const timeBonus = timeLeft * 15;
      const speedBonus = attempts === 0 ? 300 : 150;
      updateGameData({ 
        level6Complete: true, 
        score: gameData.score + speedBonus + timeBonus,
        gameComplete: true,
        completedLevels: [...(gameData.completedLevels || []), 6]
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedModel(null);
    setShowResult(false);
    setTimeLeft(20);
    setTimerActive(true);
  };

  const handleRestart = () => {
    setSelectedSoftware(null);
    setSelectedModel(null);
    setShowResult(false);
    setAttempts(0);
    setTimeLeft(20);
    setTimerActive(false);
  };

  const currentSoftware = softwareOptions.find(s => s.id === selectedSoftware);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-red-200 overflow-auto">
      {/* Fixed header */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-purple-200 via-pink-200 to-red-200 p-3 md:p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="bg-white/90 hover:bg-white text-gray-700 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="bg-white/90 rounded-lg p-2 md:p-3 shadow-lg border-2 border-gold-400">
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
              <span className="font-bold text-gray-700 text-sm md:text-base">FINAL LEVEL!</span>
            </div>
          </div>

          {showResult && !isCorrect && (
            <button
              onClick={handleRestart}
              className="bg-purple-500 hover:bg-purple-600 text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>

        {/* Timer */}
        {selectedSoftware && timerActive && (
          <div className="flex justify-center mt-4">
            <div className={`bg-white/90 rounded-lg p-3 md:p-4 shadow-lg border-2 ${timeLeft <= 5 ? 'border-red-500 animate-pulse' : 'border-purple-500'}`}>
              <div className="flex items-center space-x-2">
                <Clock className={`w-4 h-4 md:w-5 md:h-5 ${timeLeft <= 5 ? 'text-red-500' : 'text-purple-500'}`} />
                <span className={`font-bold text-lg md:text-xl ${timeLeft <= 5 ? 'text-red-500' : 'text-purple-500'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Level header */}
        <div className="flex flex-col items-center mt-4 space-y-2">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 h-2 md:h-3 w-full max-w-md rounded-full animate-pulse"></div>
          <div className="bg-gradient-to-r from-gray-900 to-black h-12 md:h-16 w-full max-w-md rounded-lg shadow-lg flex items-center justify-center px-4 border-2 border-yellow-400">
            <h2 className="text-white text-base md:text-xl font-bold text-center flex items-center">
              <Crown className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
              ULTIMATE MASTER LEVEL
              <Crown className="w-4 h-4 md:w-5 md:h-5 ml-2 text-yellow-400" />
            </h2>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="px-3 md:px-6 pb-8 max-w-7xl mx-auto">
        {/* Teacher instruction */}
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-white/90 rounded-xl p-4 md:p-6 shadow-lg border-4 border-purple-400">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xl md:text-2xl">👑</span>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-500" />
              GODLIKE SYSTEMS CHALLENGE!
              <Zap className="w-4 h-4 md:w-5 md:h-5 ml-2 text-purple-500" />
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {!selectedSoftware && "The fate of reality itself depends on your choices! 15 impossible systems await!"}
              {selectedSoftware && timerActive && "⏰ Time is running out! The universe depends on you!"}
              {showResult && isCorrect && "🏆 LEGENDARY! You are the ultimate SDLC master of all realities!"}
              {showResult && !isCorrect && "Even gods make mistakes. These systems control existence itself."}
            </p>
          </div>
        </div>

        {/* Software selection */}
        {!selectedSoftware && (
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800 flex items-center justify-center">
              <span className="text-purple-500 mr-2">⚡</span>
              Choose Your Ultimate Challenge:
              <span className="text-purple-500 ml-2">⚡</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
              {softwareOptions.map((software) => (
                <button
                  key={software.id}
                  onClick={() => handleSoftwareSelect(software.id)}
                  className="bg-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center border-2 border-purple-400 hover:border-pink-500 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50"
                >
                  <div className="text-3xl md:text-5xl mb-2 md:mb-3">{software.icon}</div>
                  <h4 className="text-sm md:text-lg font-bold text-gray-800 mb-1 md:mb-2 leading-tight">{software.name}</h4>
                  <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 leading-tight">{software.description}</p>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-1 md:p-2">
                    <span className="text-xs text-purple-700 font-bold flex items-center justify-center">
                      <Crown className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                      GODLIKE
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected software display */}
        {selectedSoftware && (
          <div className="mb-6 md:mb-8">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg text-center border-4 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center justify-center">
                <Crown className="w-5 h-5 mr-2 text-purple-500" />
                ULTIMATE CHALLENGE:
                <Crown className="w-5 h-5 ml-2 text-purple-500" />
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <span className="text-4xl md:text-5xl animate-pulse">{currentSoftware?.icon}</span>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{currentSoftware?.name}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{currentSoftware?.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Model selection */}
        {selectedSoftware && !showResult && (
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800">
              ⚡ Choose Wisely - Reality Depends On It:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {allModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model.id)}
                  className={`bg-gradient-to-br ${model.color} text-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center border-4 border-white/50 hover:border-white/80 hover:animate-pulse`}
                >
                  <div className="text-3xl md:text-4xl mb-2">{model.emoji}</div>
                  <h4 className="text-sm md:text-base font-bold">{model.name}</h4>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result display */}
        {showResult && (
          <div className="text-center">
            <div className={`bg-white rounded-xl p-6 md:p-8 shadow-lg ${isCorrect ? 'border-4 border-green-400 bg-gradient-to-br from-green-50 to-blue-50' : 'border-4 border-red-400 bg-gradient-to-br from-red-50 to-orange-50'}`}>
              <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce">
                {isCorrect ? '👑' : '💥'}
              </div>
              <h3 className={`text-2xl md:text-4xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'LEGENDARY MASTER!' : 'REALITY COLLAPSED!'}
              </h3>
              <div className="bg-gray-100 rounded-lg p-4 md:p-6 mb-6">
                <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                  {currentSoftware?.reasoning}
                </p>
              </div>
              
              {isCorrect && (
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 md:p-6 mb-6 border-2 border-green-400">
                  <p className="text-green-700 font-bold text-sm md:text-base mb-2">
                    🏆 CONGRATULATIONS! 🏆
                  </p>
                  <p className="text-green-600 text-sm md:text-base">
                    You have achieved the impossible! You are now the ultimate SDLC master capable of handling any software project in any reality, dimension, or universe!
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                {isCorrect ? (
                  <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-4 md:py-5 px-8 md:px-10 rounded-full text-xl md:text-2xl shadow-xl transform transition-all duration-300 hover:scale-110 animate-pulse border-4 border-yellow-400"
                  >
                    <Crown className="inline-block w-6 h-6 md:w-8 md:h-8 mr-2" />
                    VICTORY CELEBRATION!
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleTryAgain}
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-full text-base md:text-lg shadow-xl transform transition-all duration-300 hover:scale-110"
                    >
                      <X className="inline-block w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Save Reality
                    </button>
                    <button
                      onClick={handleRestart}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full text-base md:text-lg shadow-xl transform transition-all duration-300 hover:scale-110"
                    >
                      <RefreshCw className="inline-block w-4 h-4 md:w-5 md:h-5 mr-2" />
                      New Challenge
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level6Scene;
