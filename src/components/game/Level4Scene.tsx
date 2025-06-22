
import React, { useState } from 'react';
import { ArrowLeft, Star, CheckCircle, X, AlertTriangle, RefreshCw } from 'lucide-react';

interface Level4SceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const softwareOptions = [
  {
    id: 'blockchain',
    name: 'Blockchain Platform',
    icon: '⛓️',
    description: 'Cryptocurrency trading platform',
    correctModel: 'spiral',
    reasoning: 'Blockchain systems have high security risks and need iterative risk assessment'
  },
  {
    id: 'healthcare',
    name: 'Healthcare Records',
    icon: '🏥',
    description: 'Patient management system',
    correctModel: 'vmodel',
    reasoning: 'Healthcare systems require extensive testing and validation for patient safety'
  },
  {
    id: 'streaming',
    name: 'Video Streaming',
    icon: '🎬',
    description: 'On-demand video platform',
    correctModel: 'agile',
    reasoning: 'Streaming platforms need rapid feature updates and user feedback integration'
  },
  {
    id: 'fintech',
    name: 'Digital Wallet',
    icon: '💳',
    description: 'Mobile payment solution',
    correctModel: 'spiral',
    reasoning: 'Financial apps require careful risk analysis for security and compliance'
  },
  {
    id: 'iot',
    name: 'IoT Dashboard',
    icon: '🌐',
    description: 'Smart device monitoring',
    correctModel: 'iterative',
    reasoning: 'IoT systems benefit from incremental development and device integration testing'
  },
  {
    id: 'ai-platform',
    name: 'AI Analytics',
    icon: '🤖',
    description: 'Machine learning platform',
    correctModel: 'agile',
    reasoning: 'AI platforms need continuous learning and adaptation through user feedback'
  },
  {
    id: 'crm',
    name: 'CRM System',
    icon: '👥',
    description: 'Customer relationship management',
    correctModel: 'iterative',
    reasoning: 'CRM systems need gradual feature rollout and user workflow refinement'
  },
  {
    id: 'travel',
    name: 'Travel Booking',
    icon: '✈️',
    description: 'Flight and hotel booking',
    correctModel: 'agile',
    reasoning: 'Travel platforms need quick adaptation to market changes and user preferences'
  },
  {
    id: 'logistics',
    name: 'Supply Chain',
    icon: '📦',
    description: 'Inventory and shipping tracker',
    correctModel: 'waterfall',
    reasoning: 'Supply chain systems need comprehensive planning and integration with existing systems'
  },
  {
    id: 'education',
    name: 'Learning Management',
    icon: '📚',
    description: 'Online course platform',
    correctModel: 'iterative',
    reasoning: 'Educational platforms benefit from gradual content rollout and user feedback'
  }
];

const allModels = [
  { id: 'waterfall', name: 'Waterfall', emoji: '🧓', color: 'from-blue-500 to-blue-700' },
  { id: 'agile', name: 'Agile', emoji: '👟', color: 'from-green-500 to-green-700' },
  { id: 'iterative', name: 'Iterative', emoji: '🔁', color: 'from-purple-500 to-purple-700' },
  { id: 'spiral', name: 'Spiral', emoji: '🌀', color: 'from-orange-500 to-orange-700' },
  { id: 'vmodel', name: 'V-Model', emoji: '🧪', color: 'from-pink-500 to-pink-700' }
];

const Level4Scene: React.FC<Level4SceneProps> = ({ onNext, onBack, gameData, updateGameData }) => {
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
        level4Complete: true, 
        score: gameData.score + (attempts === 0 ? 200 : 100),
        completedLevels: [...(gameData.completedLevels || []), 4]
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
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 overflow-auto">
      {/* Fixed header */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 p-3 md:p-4">
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
              <span className="font-bold text-gray-700 text-sm md:text-base">Level 4 of 6</span>
            </div>
          </div>

          {showResult && !isCorrect && (
            <button
              onClick={handleRestart}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>

        {/* Level header */}
        <div className="flex flex-col items-center mt-4 space-y-2">
          <div className="bg-purple-600 h-2 md:h-3 w-full max-w-md rounded-full"></div>
          <div className="bg-gray-800 h-12 md:h-16 w-full max-w-md rounded-lg shadow-lg flex items-center justify-center px-4">
            <h2 className="text-white text-base md:text-xl font-bold text-center">Level 4: Advanced Systems</h2>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="px-3 md:px-6 pb-8 max-w-7xl mx-auto">
        {/* Teacher instruction */}
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-white/90 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xl md:text-2xl">👨‍💻</span>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Complex Technology Systems!</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {!selectedSoftware && "Choose from 10 advanced software projects. Each has unique technical challenges!"}
              {selectedSoftware && !showResult && "Consider the technical complexity and requirements carefully!"}
              {showResult && isCorrect && "Outstanding! You understand complex system requirements!"}
              {showResult && !isCorrect && "Think about the specific technical challenges of this system."}
            </p>
          </div>
        </div>

        {/* Software selection */}
        {!selectedSoftware && (
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800">Choose an Advanced Project:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {softwareOptions.map((software) => (
                <button
                  key={software.id}
                  onClick={() => handleSoftwareSelect(software.id)}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center border-2 border-purple-200 hover:border-purple-400"
                >
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">{software.icon}</div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{software.name}</h4>
                  <p className="text-gray-600 text-xs md:text-sm mb-3">{software.description}</p>
                  <div className="bg-purple-100 rounded-lg p-2">
                    <span className="text-xs text-purple-700 font-medium">💻 Advanced System</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected software display */}
        {selectedSoftware && (
          <div className="mb-6 md:mb-8">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg text-center border-2 border-purple-300">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Selected Advanced Project:</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <span className="text-3xl md:text-4xl">{currentSoftware?.icon}</span>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl md:text-2xl font-bold text-purple-600">{currentSoftware?.name}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{currentSoftware?.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Model selection */}
        {selectedSoftware && !showResult && (
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800">Choose the Best SDLC Model:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {allModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model.id)}
                  className={`bg-gradient-to-br ${model.color} text-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center`}
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
              <div className="text-6xl md:text-8xl mb-4 md:mb-6">
                {isCorrect ? '🎉' : '🤔'}
              </div>
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Excellent Analysis!' : 'Not Quite Right'}
              </h3>
              <div className="bg-gray-100 rounded-lg p-4 md:p-6 mb-6">
                <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                  {currentSoftware?.reasoning}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                {isCorrect ? (
                  <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-lg md:text-xl shadow-xl transform transition-all duration-300 hover:scale-110"
                  >
                    <CheckCircle className="inline-block w-5 h-5 md:w-6 md:h-6 mr-2" />
                    Continue to Level 5
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
                      New Project
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

export default Level4Scene;
