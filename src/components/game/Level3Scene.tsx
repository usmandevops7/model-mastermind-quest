
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, CheckCircle, X, Clock, Zap } from 'lucide-react';

interface Level3SceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const softwareOptions = [
  {
    id: 'hospital',
    name: 'Hospital Management',
    icon: '🏥',
    description: 'Critical patient care system',
    correctModel: 'spiral',
    reasoning: 'Hospital systems have high risks and need careful risk analysis at each phase'
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    icon: '🤖',
    description: 'Intelligent conversation system',
    correctModel: 'agile',
    reasoning: 'AI systems need continuous learning and adaptation through user feedback'
  },
  {
    id: 'government',
    name: 'Government Portal',
    icon: '🏛️',
    description: 'Public service platform',
    correctModel: 'waterfall',
    reasoning: 'Government systems need strict compliance, documentation, and fixed procedures'
  }
];

const allModels = [
  { id: 'waterfall', name: 'Waterfall', emoji: '🧓', color: 'from-blue-500 to-blue-700' },
  { id: 'agile', name: 'Agile', emoji: '👟', color: 'from-green-500 to-green-700' },
  { id: 'iterative', name: 'Iterative', emoji: '🔁', color: 'from-purple-500 to-purple-700' },
  { id: 'spiral', name: 'Spiral', emoji: '🌀', color: 'from-orange-500 to-orange-700' },
  { id: 'vmodel', name: 'V-Model', emoji: '🧪', color: 'from-pink-500 to-pink-700' }
];

const Level3Scene: React.FC<Level3SceneProps> = ({ onNext, onBack, gameData, updateGameData }) => {
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (selectedSoftware && !showResult) {
      setTimerActive(true);
      setTimeLeft(15);
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
      // Auto-select a random wrong answer if time runs out
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
      const timeBonus = timeLeft * 10;
      const speedBonus = attempts === 0 ? 200 : 100;
      updateGameData({ 
        level3Complete: true, 
        score: gameData.score + speedBonus + timeBonus,
        gameComplete: true
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedModel(null);
    setShowResult(false);
    setTimeLeft(15);
    setTimerActive(true);
  };

  const currentSoftware = softwareOptions.find(s => s.id === selectedSoftware);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-red-100 via-pink-100 to-purple-100">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Level indicator */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-gray-700">Final Level!</span>
        </div>
      </div>

      {/* Timer */}
      {selectedSoftware && timerActive && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`bg-white/90 rounded-lg p-4 shadow-lg border-2 ${timeLeft <= 5 ? 'border-red-500 animate-pulse' : 'border-blue-500'}`}>
            <div className="flex items-center space-x-2">
              <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-500' : 'text-blue-500'}`} />
              <span className={`font-bold text-lg ${timeLeft <= 5 ? 'text-red-500' : 'text-blue-500'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Classroom header */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <div className="bg-red-600 h-3 w-96 rounded-full"></div>
        <div className="bg-gray-900 h-24 w-96 mt-2 rounded-lg shadow-lg flex items-center justify-center">
          <h2 className="text-white text-xl font-bold">🔥 FINAL TEST - Master Level!</h2>
        </div>
      </div>

      <div className="flex items-center justify-center h-full pt-40">
        <div className="max-w-5xl mx-auto px-8">
          {/* Teacher instruction */}
          <div className="text-center mb-8">
            <div className="bg-white/90 rounded-xl p-6 shadow-lg border-2 border-red-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2 text-red-500" />
                Ultimate Challenge!
              </h3>
              <p className="text-gray-600">
                {!selectedSoftware && "These are the most critical systems! Choose wisely and quickly!"}
                {selectedSoftware && timerActive && "⏰ Time is ticking! Choose the best model fast!"}
                {showResult && isCorrect && "🏆 MASTER LEVEL ACHIEVED! You're now an SDLC expert!"}
                {showResult && !isCorrect && "So close! These critical systems need perfect choices."}
              </p>
            </div>
          </div>

          {/* Software selection */}
          {!selectedSoftware && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center">
                <span className="text-red-500 mr-2">🚨</span>
                Choose a Critical System:
                <span className="text-red-500 ml-2">🚨</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {softwareOptions.map((software) => (
                  <button
                    key={software.id}
                    onClick={() => handleSoftwareSelect(software.id)}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center border-2 border-red-300 hover:border-red-500"
                  >
                    <div className="text-6xl mb-4">{software.icon}</div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{software.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{software.description}</p>
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
            <div className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center border-4 border-red-400">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Critical Mission:</h3>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-4xl">{currentSoftware?.icon}</span>
                  <div>
                    <h4 className="text-2xl font-bold text-red-600">{currentSoftware?.name}</h4>
                    <p className="text-gray-600">{currentSoftware?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Model selection */}
          {selectedSoftware && !showResult && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                ⚡ Quick! Choose the Perfect Model:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {allModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={`bg-gradient-to-br ${model.color} text-white rounded-xl p-4 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center border-2 border-white/30`}
                  >
                    <div className="text-4xl mb-2">{model.emoji}</div>
                    <h4 className="text-sm font-bold">{model.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result display */}
          {showResult && (
            <div className="text-center">
              <div className={`bg-white rounded-xl p-8 shadow-lg ${isCorrect ? 'border-4 border-green-400' : 'border-4 border-red-400'}`}>
                <div className="text-8xl mb-4 animate-bounce">
                  {isCorrect ? '🏆' : '💥'}
                </div>
                <h3 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'SDLC MASTER!' : 'System Failure!'}
                </h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 font-medium">
                    {currentSoftware?.reasoning}
                  </p>
                </div>
                
                {isCorrect && (
                  <div className="bg-green-100 rounded-lg p-4 mb-6">
                    <p className="text-green-700 font-bold">
                      🎉 Congratulations! You've mastered all SDLC models and can make expert decisions for any software project!
                    </p>
                  </div>
                )}
                
                {isCorrect ? (
                  <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl transform transition-all duration-300 hover:scale-110 animate-pulse"
                  >
                    <CheckCircle className="inline-block w-6 h-6 mr-2" />
                    Victory Celebration!
                  </button>
                ) : (
                  <button
                    onClick={handleTryAgain}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transform transition-all duration-300 hover:scale-110"
                  >
                    <X className="inline-block w-5 h-5 mr-2" />
                    Try Again - Quick!
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Level3Scene;
