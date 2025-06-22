
import React, { useState } from 'react';
import { ArrowLeft, Star, CheckCircle, X } from 'lucide-react';

interface Level1SceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const softwareOptions = [
  {
    id: 'banking',
    name: 'Banking System',
    icon: '🏦',
    description: 'Secure financial transactions',
    correctModel: 'waterfall',
    reasoning: 'Banking needs strict security and fixed requirements'
  },
  {
    id: 'grocery',
    name: 'Grocery App',
    icon: '🛒',
    description: 'Online shopping platform',
    correctModel: 'agile',
    reasoning: 'Grocery apps need frequent updates and user feedback'
  },
  {
    id: 'chat',
    name: 'Chat Application',
    icon: '💬',
    description: 'Real-time messaging',
    correctModel: 'agile',
    reasoning: 'Chat apps require rapid development and user feedback'
  }
];

const modelOptions = [
  { id: 'waterfall', name: 'Waterfall', emoji: '🧓', color: 'from-blue-500 to-blue-700' },
  { id: 'agile', name: 'Agile', emoji: '👟', color: 'from-green-500 to-green-700' },
  { id: 'iterative', name: 'Iterative', emoji: '🔁', color: 'from-purple-500 to-purple-700' }
];

const Level1Scene: React.FC<Level1SceneProps> = ({ onNext, onBack, gameData, updateGameData }) => {
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSoftwareSelect = (softwareId: string) => {
    setSelectedSoftware(softwareId);
    setSelectedModel(null);
    setShowResult(false);
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
        level1Complete: true, 
        score: gameData.score + (attempts === 0 ? 100 : 50),
        selectedSoftware: software?.name,
        selectedModel: modelOptions.find(m => m.id === modelId)?.name
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedModel(null);
    setShowResult(false);
  };

  const currentSoftware = softwareOptions.find(s => s.id === selectedSoftware);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      {/* Classroom background */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-800 h-3 w-96 rounded-full"></div>
          <div className="bg-gray-800 h-24 w-96 mt-2 rounded-lg shadow-lg flex items-center justify-center">
            <h2 className="text-white text-xl font-bold">Level 1: Basic Matching</h2>
          </div>
        </div>
      </div>

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
          <span className="font-bold text-gray-700">Level 1 of 3</span>
        </div>
      </div>

      <div className="flex items-center justify-center h-full pt-32">
        <div className="max-w-4xl mx-auto px-8">
          {/* Teacher instruction */}
          <div className="text-center mb-8">
            <div className="bg-white/90 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Choose the Best Model!</h3>
              <p className="text-gray-600">
                {!selectedSoftware && "First, pick a software project below, then choose the best SDLC model for it."}
                {selectedSoftware && !showResult && "Now choose the best SDLC model for this project."}
                {showResult && isCorrect && "Excellent choice! Ready for the next level?"}
                {showResult && !isCorrect && "Not quite right. Think about the project requirements and try again!"}
              </p>
            </div>
          </div>

          {/* Software selection */}
          {!selectedSoftware && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Choose a Software Project:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {softwareOptions.map((software) => (
                  <button
                    key={software.id}
                    onClick={() => handleSoftwareSelect(software.id)}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center"
                  >
                    <div className="text-6xl mb-4">{software.icon}</div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{software.name}</h4>
                    <p className="text-gray-600 text-sm">{software.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected software display */}
          {selectedSoftware && (
            <div className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Selected Project:</h3>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-4xl">{currentSoftware?.icon}</span>
                  <div>
                    <h4 className="text-2xl font-bold text-blue-600">{currentSoftware?.name}</h4>
                    <p className="text-gray-600">{currentSoftware?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Model selection */}
          {selectedSoftware && !showResult && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Choose the Best SDLC Model:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {modelOptions.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={`bg-gradient-to-br ${model.color} text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center`}
                  >
                    <div className="text-6xl mb-4">{model.emoji}</div>
                    <h4 className="text-xl font-bold">{model.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result display */}
          {showResult && (
            <div className="text-center">
              <div className={`bg-white rounded-xl p-8 shadow-lg ${isCorrect ? 'border-4 border-green-400' : 'border-4 border-red-400'}`}>
                <div className="text-8xl mb-4">
                  {isCorrect ? '🎉' : '😅'}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'Correct!' : 'Not Quite Right'}
                </h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 font-medium">
                    {currentSoftware?.reasoning}
                  </p>
                </div>
                
                {isCorrect ? (
                  <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transform transition-all duration-300 hover:scale-110"
                  >
                    <CheckCircle className="inline-block w-5 h-5 mr-2" />
                    Next Level
                  </button>
                ) : (
                  <button
                    onClick={handleTryAgain}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transform transition-all duration-300 hover:scale-110"
                  >
                    <X className="inline-block w-5 h-5 mr-2" />
                    Try Again
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

export default Level1Scene;
