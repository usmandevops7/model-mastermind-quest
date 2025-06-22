
import React, { useState } from 'react';
import { ArrowLeft, Star, CheckCircle, X, Info } from 'lucide-react';

interface Level1SceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const softwareProjects = [
  {
    id: 'banking',
    name: 'Digital Banking Platform',
    icon: '🏦',
    category: 'Financial Services',
    description: 'Secure online banking with transaction processing',
    requirements: 'High security, regulatory compliance, stable requirements',
    correctModel: 'waterfall',
    reasoning: 'Banking systems require strict regulatory compliance, extensive documentation, and stable requirements. The sequential nature of Waterfall ensures thorough security reviews and audit trails.'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Website',
    icon: '🛒',
    category: 'Retail',
    description: 'Online shopping platform with product catalog',
    requirements: 'Frequent updates, user feedback driven, evolving features',
    correctModel: 'agile',
    reasoning: 'E-commerce platforms need rapid feature updates, continuous user feedback integration, and quick response to market changes. Agile provides the flexibility needed.'
  },
  {
    id: 'social',
    name: 'Social Media App',
    icon: '📱',
    category: 'Social Platform',
    description: 'Mobile social networking application',
    requirements: 'Fast iteration, user engagement focus, trending features',
    correctModel: 'agile',
    reasoning: 'Social media apps require rapid development cycles, constant feature experimentation, and quick adaptation to user behavior trends.'
  },
  {
    id: 'inventory',
    name: 'Inventory Management',
    icon: '📦',
    category: 'Enterprise',
    description: 'Warehouse and stock management system',
    requirements: 'Gradual rollout, process refinement, multiple locations',
    correctModel: 'iterative',
    reasoning: 'Inventory systems benefit from iterative implementation across different locations, allowing for process refinement and gradual feature enhancement.'
  }
];

const modelOptions = [
  { id: 'waterfall', name: 'Waterfall', emoji: '🧓', color: 'from-blue-500 to-blue-700', description: 'Sequential & Structured' },
  { id: 'agile', name: 'Agile', emoji: '👟', color: 'from-green-500 to-green-700', description: 'Flexible & Fast' },
  { id: 'iterative', name: 'Iterative', emoji: '🔁', color: 'from-purple-500 to-purple-700', description: 'Cyclical Improvement' }
];

const Level1Scene: React.FC<Level1SceneProps> = ({ onNext, onBack, gameData, updateGameData }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    setSelectedModel(null);
    setShowResult(false);
    setAttempts(0);
  };

  const handleModelSelect = (modelId: string) => {
    if (!selectedProject) return;
    
    setSelectedModel(modelId);
    const project = softwareProjects.find(p => p.id === selectedProject);
    const correct = project?.correctModel === modelId;
    
    setIsCorrect(correct);
    setShowResult(true);
    setAttempts(prev => prev + 1);
    
    if (correct) {
      updateGameData({ 
        level1Complete: true, 
        score: gameData.score + (attempts === 0 ? 100 : 50),
        selectedProject: project?.name,
        selectedModel: modelOptions.find(m => m.id === modelId)?.name
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedModel(null);
    setShowResult(false);
  };

  const currentProject = softwareProjects.find(p => p.id === selectedProject);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Practice Challenge - Level 1</h2>
            <p className="text-lg opacity-90">Match projects with the right SDLC model</p>
          </div>

          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">Level 1 of 3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-8 px-8 h-full overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Project selection */}
          {!selectedProject && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="bg-white/90 rounded-2xl p-6 shadow-lg max-w-3xl mx-auto">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👨‍🏫</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Choose Your First Project</h3>
                  <p className="text-gray-600">
                    Select a software project below. Consider its requirements, complexity, and constraints to choose the best SDLC model.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {softwareProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectSelect(project.id)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-left border-2 border-transparent hover:border-blue-300"
                  >
                    <div className="text-6xl mb-4 text-center">{project.icon}</div>
                    <div className="mb-3">
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium">Key Requirements:</p>
                      <p className="text-xs text-gray-700">{project.requirements}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected project display */}
          {selectedProject && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Selected Project</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Change Project
                  </button>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="text-6xl">{currentProject?.icon}</div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {currentProject?.category}
                      </span>
                    </div>
                    <h4 className="text-3xl font-bold text-blue-600 mb-3">{currentProject?.name}</h4>
                    <p className="text-gray-700 mb-4">{currentProject?.description}</p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Project Requirements:</p>
                          <p className="text-sm text-blue-700">{currentProject?.requirements}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Model selection */}
          {selectedProject && !showResult && (
            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose the Best SDLC Model</h3>
                <p className="text-gray-600">Consider the project requirements and select the most suitable development approach</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {modelOptions.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={`bg-gradient-to-br ${model.color} text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-center`}
                  >
                    <div className="text-6xl mb-4">{model.emoji}</div>
                    <h4 className="text-2xl font-bold mb-2">{model.name}</h4>
                    <p className="text-sm opacity-90">{model.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result display */}
          {showResult && (
            <div className="text-center">
              <div className={`bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto ${isCorrect ? 'border-4 border-green-400' : 'border-4 border-red-400'}`}>
                <div className="text-8xl mb-6">
                  {isCorrect ? '🎉' : '🤔'}
                </div>
                <h3 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'Excellent Choice!' : 'Not Quite Right'}
                </h3>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                  <h4 className="font-bold text-gray-800 mb-3">Why this model fits:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {currentProject?.reasoning}
                  </p>
                </div>
                
                {isCorrect ? (
                  <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl transform transition-all duration-300 hover:scale-110"
                  >
                    <CheckCircle className="inline-block w-6 h-6 mr-2" />
                    Continue to Level 2
                  </button>
                ) : (
                  <button
                    onClick={handleTryAgain}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl transform transition-all duration-300 hover:scale-110"
                  >
                    <X className="inline-block w-6 h-6 mr-2" />
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
