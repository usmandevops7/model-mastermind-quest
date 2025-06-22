
import React, { useState } from 'react';
import { ArrowLeft, Star, CheckCircle, X, AlertTriangle } from 'lucide-react';

interface Level2SceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const softwareOptions = [
  {
    id: 'erp',
    name: 'ERP System',
    icon: '🏢',
    description: 'Enterprise Resource Planning',
    correctModel: 'waterfall',
    reasoning: 'ERP systems need comprehensive planning and fixed requirements'
  },
  {
    id: 'billing',
    name: 'Billing App',
    icon: '💰',
    description: 'Invoice and payment system',
    correctModel: 'iterative',
    reasoning: 'Billing apps benefit from iterative improvements and testing'
  },
  {
    id: 'exam',
    name: 'Exam Portal',
    icon: '📝',
    description: 'Online examination platform',
    correctModel: 'vmodel',
    reasoning: 'Exam portals require extensive testing and verification'
  }
];

const allModels = [
  { id: 'waterfall', name: 'Waterfall', emoji: '🧓', color: 'from-blue-500 to-blue-700' },
  { id: 'agile', name: 'Agile', emoji: '👟', color: 'from-green-500 to-green-700' },
  { id: 'iterative', name: 'Iterative', emoji: '🔁', color: 'from-purple-500 to-purple-700' },
  { id: 'spiral', name: 'Spiral', emoji: '🌀', color: 'from-orange-500 to-orange-700' },
  { id: 'vmodel', name: 'V-Model', emoji: '🧪', color: 'from-pink-500 to-pink-700' }
];

const criticComments = {
  erp: {
    agile: "Hmm... Agile for ERP? What about fixed requirements and extensive documentation?",
    iterative: "ERP systems are huge! Can iterative handle all those enterprise features?",
    spiral: "Spiral might work, but is risk analysis the main concern for ERP?",
    vmodel: "V-Model has testing, but ERP needs more comprehensive planning first."
  },
  billing: {
    waterfall: "Waterfall for billing? What if payment methods change frequently?",
    agile: "Agile could work, but billing needs structured testing cycles.",
    spiral: "Is risk the main concern for a billing system?",
    vmodel: "V-Model is good for testing, but billing needs continuous improvements."
  },
  exam: {
    waterfall: "Waterfall might be too rigid for exam systems that need updates.",
    agile: "Agile is flexible, but exam systems need rigorous testing validation.",
    iterative: "Iterative improvements are good, but what about comprehensive testing?",
    spiral: "Spiral handles risks, but exam systems need more focus on verification."
  }
};

const Level2Scene: React.FC<Level2SceneProps> = ({ onNext, onBack, gameData, updateGameData }) => {
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showCriticComment, setShowCriticComment] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSoftwareSelect = (softwareId: string) => {
    setSelectedSoftware(softwareId);
    setSelectedModel(null);
    setShowCriticComment(false);
    setShowResult(false);
  };

  const handleModelSelect = (modelId: string) => {
    if (!selectedSoftware) return;
    
    setSelectedModel(modelId);
    const software = softwareOptions.find(s => s.id === selectedSoftware);
    const correct = software?.correctModel === modelId;
    
    setIsCorrect(correct);
    
    if (!correct) {
      setShowCriticComment(true);
      setTimeout(() => {
        setShowResult(true);
      }, 3000);
    } else {
      setShowResult(true);
      updateGameData({ 
        level2Complete: true, 
        score: gameData.score + (attempts === 0 ? 150 : 75)
      });
    }
    
    setAttempts(prev => prev + 1);
  };

  const handleTryAgain = () => {
    setSelectedModel(null);
    setShowCriticComment(false);
    setShowResult(false);
  };

  const currentSoftware = softwareOptions.find(s => s.id === selectedSoftware);
  const currentModel = allModels.find(m => m.id === selectedModel);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
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
          <span className="font-bold text-gray-700">Level 2 of 3</span>
        </div>
      </div>

      {/* Classroom header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-green-800 h-3 w-96 rounded-full"></div>
        <div className="bg-gray-800 h-24 w-96 mt-2 rounded-lg shadow-lg flex items-center justify-center">
          <h2 className="text-white text-xl font-bold">Level 2: Be Careful!</h2>
        </div>
      </div>

      <div className="flex items-center justify-center h-full pt-32">
        <div className="max-w-5xl mx-auto px-8">
          {/* Teacher instruction */}
          <div className="text-center mb-8">
            <div className="bg-white/90 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">More Complex Choices!</h3>
              <p className="text-gray-600">
                {!selectedSoftware && "These projects are trickier. Think carefully about their specific needs!"}
                {selectedSoftware && !showResult && "All 5 models are available now. Choose wisely!"}
                {showResult && isCorrect && "Perfect analysis! You're becoming an expert!"}
                {showResult && !isCorrect && "The critic had a point. Consider the project's specific requirements!"}
              </p>
            </div>
          </div>

          {/* Software selection */}
          {!selectedSoftware && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Choose a Complex Project:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {softwareOptions.map((software) => (
                  <button
                    key={software.id}
                    onClick={() => handleSoftwareSelect(software.id)}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center border-2 border-orange-200"
                  >
                    <div className="text-6xl mb-4">{software.icon}</div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{software.name}</h4>
                    <p className="text-gray-600 text-sm">{software.description}</p>
                    <div className="mt-3 bg-orange-100 rounded-lg p-2">
                      <span className="text-xs text-orange-700 font-medium">🔥 Complex Project</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected software display */}
          {selectedSoftware && (
            <div className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-orange-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Selected Complex Project:</h3>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-4xl">{currentSoftware?.icon}</span>
                  <div>
                    <h4 className="text-2xl font-bold text-orange-600">{currentSoftware?.name}</h4>
                    <p className="text-gray-600">{currentSoftware?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Model selection */}
          {selectedSoftware && !showCriticComment && !showResult && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Choose from ALL 5 Models:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {allModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={`bg-gradient-to-br ${model.color} text-white rounded-xl p-4 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center`}
                  >
                    <div className="text-4xl mb-2">{model.emoji}</div>
                    <h4 className="text-sm font-bold">{model.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Critic comment */}
          {showCriticComment && (
            <div className="mb-8 animate-fade-in">
              <div className="bg-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤔</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Critic's Challenge
                    </h4>
                    <p className="text-red-700">
                      {selectedSoftware && selectedModel && 
                        criticComments[selectedSoftware as keyof typeof criticComments]?.[selectedModel as keyof typeof criticComments.erp]
                      }
                    </p>
                  </div>
                </div>
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
                  {isCorrect ? 'Excellent Analysis!' : 'The Critic Was Right'}
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
                    Final Level!
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

export default Level2Scene;
