
import React, { useState } from 'react';
import { ArrowLeft, Star, CheckCircle, X, Zap, RefreshCw } from 'lucide-react';

interface Level5SceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const softwareOptions = [
  {
    id: 'autonomous',
    name: 'Autonomous Vehicle',
    icon: '🚗',
    description: 'Self-driving car software',
    correctModel: 'vmodel',
    reasoning: 'Autonomous vehicles require extensive testing and verification for safety-critical systems'
  },
  {
    id: 'spacecraft',
    name: 'Spacecraft Control',
    icon: '🚀',
    description: 'Mission control software',
    correctModel: 'waterfall',
    reasoning: 'Space missions need comprehensive planning, documentation, and cannot afford failures'
  },
  {
    id: 'trading',
    name: 'Trading Platform',
    icon: '📈',
    description: 'High-frequency trading system',
    correctModel: 'spiral',
    reasoning: 'Trading systems have high financial risks and need careful risk assessment'
  },
  {
    id: 'social-vr',
    name: 'VR Social Platform',
    icon: '🥽',
    description: 'Virtual reality social space',
    correctModel: 'agile',
    reasoning: 'VR platforms need rapid iteration based on user experience and emerging technologies'
  },
  {
    id: 'nuclear',
    name: 'Nuclear Plant Monitor',
    icon: '⚛️',
    description: 'Nuclear facility monitoring',
    correctModel: 'vmodel',
    reasoning: 'Nuclear systems require rigorous testing and validation for safety compliance'
  },
  {
    id: 'quantum',
    name: 'Quantum Computing',
    icon: '🔬',
    description: 'Quantum algorithm platform',
    correctModel: 'spiral',
    reasoning: 'Quantum computing involves high technical risks and experimental approaches'
  },
  {
    id: 'biometric',
    name: 'Biometric Security',
    icon: '🔐',
    description: 'Fingerprint and face recognition',
    correctModel: 'vmodel',
    reasoning: 'Biometric systems need extensive testing for accuracy and security validation'
  },
  {
    id: 'drone',
    name: 'Drone Fleet Manager',
    icon: '🛸',
    description: 'Multiple drone coordination',
    correctModel: 'iterative',
    reasoning: 'Drone systems benefit from gradual feature rollout and flight testing iterations'
  },
  {
    id: 'satellite',
    name: 'Satellite Network',
    icon: '🛰️',
    description: 'Global communication satellites',
    correctModel: 'waterfall',
    reasoning: 'Satellite systems require comprehensive planning as hardware changes are impossible once deployed'
  },
  {
    id: 'ar-surgery',
    name: 'AR Surgery Assistant',
    icon: '🏥',
    description: 'Augmented reality for surgeons',
    correctModel: 'vmodel',
    reasoning: 'Medical AR systems require extensive validation and testing for patient safety'
  },
  {
    id: 'crypto-exchange',
    name: 'Crypto Exchange',
    icon: '₿',
    description: 'Cryptocurrency trading platform',
    correctModel: 'spiral',
    reasoning: 'Crypto exchanges face high security and regulatory risks requiring careful analysis'
  },
  {
    id: 'smart-city',
    name: 'Smart City Hub',
    icon: '🏙️',
    description: 'Urban infrastructure management',
    correctModel: 'iterative',
    reasoning: 'Smart city systems need gradual integration across different city departments'
  }
];

const allModels = [
  { id: 'waterfall', name: 'Waterfall', emoji: '🧓', color: 'from-blue-500 to-blue-700' },
  { id: 'agile', name: 'Agile', emoji: '👟', color: 'from-green-500 to-green-700' },
  { id: 'iterative', name: 'Iterative', emoji: '🔁', color: 'from-purple-500 to-purple-700' },
  { id: 'spiral', name: 'Spiral', emoji: '🌀', color: 'from-orange-500 to-orange-700' },
  { id: 'vmodel', name: 'V-Model', emoji: '🧪', color: 'from-pink-500 to-pink-700' }
];

const Level5Scene: React.FC<Level5SceneProps> = ({ onNext, onBack, gameData, updateGameData }) => {
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSoftwareSelect = (softwareId: string) => {
    setSelectedSoftware(softwareId);
    setSelectedModel(null);
    setShowResult(false);
    setAttempts(0);
  };

  const handleModelSelect = (modelId: string) => {
    if (!selectedSoftware) return;
    
    setSelectedModel(modelId);
    const software = softwareOptions.find(s => s.id === selectedSoftware);
    const correct = software?.correctModel === modelId;
    
    setIsCorrect(correct);
    setShowResult(true);
    setAttempts(prev => prev + 1);
    
    if (correct) {
      updateGameData({ 
        level5Complete: true, 
        score: gameData.score + (attempts === 0 ? 250 : 125),
        completedLevels: [...(gameData.completedLevels || []), 5]
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedModel(null);
    setShowResult(false);
  };

  const handleRestart = () => {
    setSelectedSoftware(null);
    setSelectedModel(null);
    setShowResult(false);
    setAttempts(0);
  };

  const currentSoftware = softwareOptions.find(s => s.id === selectedSoftware);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 overflow-auto">
      {/* Fixed header */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 p-3 md:p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="bg-white/90 hover:bg-white text-gray-700 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="bg-white/90 rounded-lg p-2 md:p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              <span className="font-bold text-gray-700 text-sm md:text-base">Level 5 of 6</span>
            </div>
          </div>

          {showResult && !isCorrect && (
            <button
              onClick={handleRestart}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>

        {/* Level header */}
        <div className="flex flex-col items-center mt-4 space-y-2">
          <div className="bg-red-600 h-2 md:h-3 w-full max-w-md rounded-full"></div>
          <div className="bg-gray-900 h-12 md:h-16 w-full max-w-md rounded-lg shadow-lg flex items-center justify-center px-4">
            <h2 className="text-white text-base md:text-xl font-bold text-center flex items-center">
              <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
              Level 5: Critical Systems
            </h2>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="px-3 md:px-6 pb-8 max-w-7xl mx-auto">
        {/* Teacher instruction */}
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-white/90 rounded-xl p-4 md:p-6 shadow-lg border-2 border-red-200">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xl md:text-2xl">🎯</span>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-500" />
              Mission-Critical Systems!
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {!selectedSoftware && "These are high-stakes systems where failure is not an option. Choose from 12 critical projects!"}
              {selectedSoftware && !showResult && "Lives and millions of dollars depend on your choice. Think carefully!"}
              {showResult && isCorrect && "Perfect! You understand mission-critical system requirements!"}
              {showResult && !isCorrect && "Critical systems require the utmost precision in methodology selection."}
            </p>
          </div>
        </div>

        {/* Software selection */}
        {!selectedSoftware && (
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800 flex items-center justify-center">
              <span className="text-red-500 mr-2">⚠️</span>
              Choose a Critical System:
              <span className="text-red-500 ml-2">⚠️</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {softwareOptions.map((software) => (
                <button
                  key={software.id}
                  onClick={() => handleSoftwareSelect(software.id)}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center border-2 border-red-300 hover:border-red-500"
                >
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">{software.icon}</div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight">{software.name}</h4>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 leading-tight">{software.description}</p>
                  <div className="bg-red-100 rounded-lg p-2">
                    <span className="text-xs text-red-700 font-bold flex items-center justify-center">
                      <Zap className="w-3 h-3 mr-1" />
                      CRITICAL SYSTEM
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
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg text-center border-4 border-red-400">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2 text-red-500" />
                Critical Mission:
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <span className="text-3xl md:text-4xl">{currentSoftware?.icon}</span>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl md:text-2xl font-bold text-red-600">{currentSoftware?.name}</h4>
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
              🎯 Choose the Perfect Model:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {allModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model.id)}
                  className={`bg-gradient-to-br ${model.color} text-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center border-2 border-white/30 hover:border-white/60`}
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
            <div className={`bg-white rounded-xl p-6 md:p-8 shadow-lg ${isCorrect ? 'border-4 border-green-400' : 'border-4 border-red-400'}`}>
              <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce">
                {isCorrect ? '🏆' : '💥'}
              </div>
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Mission Success!' : 'System Failure!'}
              </h3>
              <div className="bg-gray-100 rounded-lg p-4 md:p-6 mb-6">
                <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                  {currentSoftware?.reasoning}
                </p>
              </div>
              
              {isCorrect && (
                <div className="bg-green-100 rounded-lg p-4 mb-6">
                  <p className="text-green-700 font-bold text-sm md:text-base">
                    🎉 Outstanding! You're ready for the ultimate challenge!
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                {isCorrect ? (
                  <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-lg md:text-xl shadow-xl transform transition-all duration-300 hover:scale-110 animate-pulse"
                  >
                    <CheckCircle className="inline-block w-5 h-5 md:w-6 md:h-6 mr-2" />
                    Final Level!
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleTryAgain}
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-full text-base md:text-lg shadow-xl transform transition-all duration-300 hover:scale-110"
                    >
                      <X className="inline-block w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Try Again
                    </button>
                    <button
                      onClick={handleRestart}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full text-base md:text-lg shadow-xl transform transition-all duration-300 hover:scale-110"
                    >
                      <RefreshCw className="inline-block w-4 h-4 md:w-5 md:h-5 mr-2" />
                      New Mission
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

export default Level5Scene;
