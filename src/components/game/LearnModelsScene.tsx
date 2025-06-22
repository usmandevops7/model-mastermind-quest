
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface LearnModelsSceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const sdlcModels = [
  {
    id: 'waterfall',
    name: 'Waterfall',
    emoji: '🧓',
    color: 'from-blue-500 to-blue-700',
    quote: 'Step-by-step — follow the plan!',
    description: 'Linear sequential approach',
    animation: 'waterfall'
  },
  {
    id: 'agile',
    name: 'Agile',
    emoji: '👟',
    color: 'from-green-500 to-green-700',
    quote: 'We sprint and adapt!',
    description: 'Iterative and flexible',
    animation: 'sprint'
  },
  {
    id: 'iterative',
    name: 'Iterative',
    emoji: '🔁',
    color: 'from-purple-500 to-purple-700',
    quote: 'Build → Test → Improve!',
    description: 'Continuous improvement cycles',
    animation: 'cycle'
  },
  {
    id: 'spiral',
    name: 'Spiral',
    emoji: '🌀',
    color: 'from-orange-500 to-orange-700',
    quote: 'I love solving risky problems!',
    description: 'Risk-driven development',
    animation: 'spiral'
  },
  {
    id: 'vmodel',
    name: 'V-Model',
    emoji: '🧪',
    color: 'from-pink-500 to-pink-700',
    quote: 'Build and test side-by-side.',
    description: 'Verification and validation',
    animation: 'vshape'
  }
];

const LearnModelsScene: React.FC<LearnModelsSceneProps> = ({ onNext, onBack, gameData, updateGameData }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [learnedModels, setLearnedModels] = useState<string[]>([]);
  
  const handleModelClick = (modelId: string) => {
    setSelectedModel(modelId);
    if (!learnedModels.includes(modelId)) {
      const newLearned = [...learnedModels, modelId];
      setLearnedModels(newLearned);
      updateGameData({ modelsLearned: newLearned });
    }
    
    // Auto-close animation after 3 seconds
    setTimeout(() => {
      setSelectedModel(null);
    }, 3000);
  };

  const allModelsLearned = learnedModels.length === 5;

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Classroom background */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 w-full">
          <div className="bg-green-800 h-2 rounded-full"></div>
          <div className="bg-brown-600 h-32 mt-2 rounded-lg shadow-lg flex items-center justify-center">
            <h2 className="text-white text-2xl font-bold">Meet the SDLC Models!</h2>
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

      {/* Progress indicator */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Progress:</span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < learnedModels.length ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">{learnedModels.length}/5</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center h-full pt-40">
        <div className="max-w-6xl mx-auto px-8">
          {/* Models grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {sdlcModels.map((model) => (
              <div key={model.id} className="relative">
                <button
                  onClick={() => handleModelClick(model.id)}
                  className={`w-full bg-gradient-to-br ${model.color} text-white rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    learnedModels.includes(model.id) ? 'ring-4 ring-green-400' : ''
                  }`}
                >
                  {learnedModels.includes(model.id) && (
                    <CheckCircle className="absolute -top-2 -right-2 w-8 h-8 text-green-400 bg-white rounded-full" />
                  )}
                  
                  <div className="text-6xl mb-4">{model.emoji}</div>
                  <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                  <div className="bg-white/20 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium">"{model.quote}"</p>
                  </div>
                  <p className="text-xs opacity-90">{model.description}</p>
                </button>
              </div>
            ))}
          </div>

          {/* Teacher guidance */}
          <div className="text-center mb-8">
            <div className="bg-white/90 rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Professor Code Says:</h3>
              <p className="text-gray-600">
                {learnedModels.length === 0 && "Click on each model to learn how they work! Watch their unique animations."}
                {learnedModels.length > 0 && learnedModels.length < 5 && `Great! You've learned ${learnedModels.length} model${learnedModels.length > 1 ? 's' : ''}. Keep exploring!`}
                {learnedModels.length === 5 && "Excellent! You've met all the models. Ready for the challenge?"}
              </p>
            </div>
          </div>

          {/* Start game button */}
          {allModelsLearned && (
            <div className="text-center animate-bounce">
              <button
                onClick={onNext}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl transform transition-all duration-300 hover:scale-110"
              >
                🎯 Start the Challenge!
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Model animation modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="text-8xl mb-4 animate-bounce">
              {sdlcModels.find(m => m.id === selectedModel)?.emoji}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {sdlcModels.find(m => m.id === selectedModel)?.name} Model
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-gray-700 font-medium">
                "{sdlcModels.find(m => m.id === selectedModel)?.quote}"
              </p>
            </div>
            <div className="h-16 flex items-center justify-center mb-4">
              {selectedModel === 'waterfall' && (
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-blue-500 rounded animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              )}
              {selectedModel === 'agile' && (
                <div className="w-8 h-8 bg-green-500 rounded-full animate-ping" />
              )}
              {selectedModel === 'iterative' && (
                <div className="w-8 h-8 border-4 border-purple-500 rounded-full animate-spin" />
              )}
              {selectedModel === 'spiral' && (
                <div className="w-8 h-8 border-4 border-orange-500 rounded-full border-t-transparent animate-spin" />
              )}
              {selectedModel === 'vmodel' && (
                <div className="flex space-x-1">
                  <div className="w-2 h-8 bg-pink-500 animate-pulse" />
                  <div className="w-2 h-6 bg-pink-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-4 bg-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <div className="w-2 h-6 bg-pink-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <div className="w-2 h-8 bg-pink-500 animate-pulse" style={{ animationDelay: '0.8s' }} />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">Animation shows how this model works!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnModelsScene;
