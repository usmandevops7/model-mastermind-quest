
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, ArrowRight, BookOpen, Users, Shield, Repeat, TestTube } from 'lucide-react';

interface LearnModelsSceneProps {
  onNext: () => void;
  onBack: () => void;
  gameData: any;
  updateGameData: (data: any) => void;
}

const sdlcModels = [
  {
    id: 'waterfall',
    name: 'Waterfall Model',
    emoji: '🧓',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-700',
    quote: 'Step-by-step — follow the plan carefully!',
    description: 'Linear sequential approach with distinct phases',
    keyPoints: [
      'Sequential phases: Requirements → Design → Implementation → Testing → Deployment',
      'Each phase must be completed before the next begins',
      'Extensive documentation at each stage',
      'Best for: Well-defined requirements, regulatory compliance'
    ],
    advantages: ['Clear structure', 'Easy to manage', 'Good documentation'],
    disadvantages: ['Inflexible to changes', 'Late testing', 'Customer feedback comes late'],
    useCases: ['Banking systems', 'Government projects', 'Medical software']
  },
  {
    id: 'agile',
    name: 'Agile Model',
    emoji: '👟',
    icon: <Users className="w-8 h-8" />,
    color: 'from-green-500 to-green-700',
    quote: 'We sprint, adapt, and deliver value quickly!',
    description: 'Iterative and incremental development approach',
    keyPoints: [
      'Short development cycles (sprints) of 1-4 weeks',
      'Continuous customer collaboration and feedback',
      'Working software over comprehensive documentation',
      'Best for: Evolving requirements, fast-paced projects'
    ],
    advantages: ['Quick delivery', 'Flexible to changes', 'Customer involvement'],
    disadvantages: ['Less documentation', 'Requires skilled team', 'Scope creep risk'],
    useCases: ['Web applications', 'Mobile apps', 'Startups']
  },
  {
    id: 'iterative',
    name: 'Iterative Model',
    emoji: '🔁',
    icon: <Repeat className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-700',
    quote: 'Build → Test → Improve → Repeat!',
    description: 'Cyclical development with continuous refinement',
    keyPoints: [
      'Development in repeated cycles (iterations)',
      'Each iteration produces a working version',
      'Gradual refinement and enhancement',
      'Best for: Large projects with evolving requirements'
    ],
    advantages: ['Early working software', 'Risk reduction', 'Better testing'],
    disadvantages: ['Complex management', 'Resource intensive', 'Architecture challenges'],
    useCases: ['Enterprise software', 'Complex systems', 'Research projects']
  },
  {
    id: 'spiral',
    name: 'Spiral Model',
    emoji: '🌀',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-700',
    quote: 'I analyze risks at every turn!',
    description: 'Risk-driven development with iterative approach',
    keyPoints: [
      'Four phases: Planning → Risk Analysis → Engineering → Evaluation',
      'Risk assessment at each spiral cycle',
      'Combines linear and iterative approaches',
      'Best for: High-risk, complex, expensive projects'
    ],
    advantages: ['Risk management', 'Flexible', 'Early prototyping'],
    disadvantages: ['Expensive', 'Complex', 'Requires risk expertise'],
    useCases: ['Mission-critical systems', 'Large-scale projects', 'New technology adoption']
  },
  {
    id: 'vmodel',
    name: 'V-Model',
    emoji: '🧪',
    icon: <TestTube className="w-8 h-8" />,
    color: 'from-pink-500 to-pink-700',
    quote: 'Every development step has a testing twin!',
    description: 'Verification and validation with parallel testing',
    keyPoints: [
      'V-shaped process: Development on left, Testing on right',
      'Each development phase has corresponding testing phase',
      'Testing activities start early in the lifecycle',
      'Best for: Systems requiring high reliability and safety'
    ],
    advantages: ['Early testing', 'High quality', 'Clear milestones'],
    disadvantages: ['Inflexible', 'No early prototypes', 'High risk for complex projects'],
    useCases: ['Medical devices', 'Automotive systems', 'Aerospace software']
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
  };

  const closeModal = () => {
    setSelectedModel(null);
  };

  const allModelsLearned = learnedModels.length === 5;
  const currentModel = sdlcModels.find(m => m.id === selectedModel);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-800 to-purple-800 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">SDLC Models Deep Dive</h2>
            <p className="text-lg opacity-90">Learn the core concepts and applications</p>
          </div>

          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">{learnedModels.length}/5 Learned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-32 pb-8 px-8 h-full overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Models grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {sdlcModels.map((model) => (
              <div key={model.id} className="relative">
                <button
                  onClick={() => handleModelClick(model.id)}
                  className={`w-full bg-gradient-to-br ${model.color} text-white rounded-3xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden ${
                    learnedModels.includes(model.id) ? 'ring-4 ring-green-400' : ''
                  }`}
                >
                  {learnedModels.includes(model.id) && (
                    <CheckCircle className="absolute top-3 right-3 w-8 h-8 text-green-400 bg-white rounded-full" />
                  )}
                  
                  <div className="text-7xl mb-4">{model.emoji}</div>
                  <div className="flex items-center justify-center mb-3">
                    {model.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{model.name}</h3>
                  <div className="bg-white/20 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium">"{model.quote}"</p>
                  </div>
                  <p className="text-xs opacity-90">{model.description}</p>
                </button>
              </div>
            ))}
          </div>

          {/* Professor guidance */}
          <div className="text-center mb-8">
            <div className="bg-white/90 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl">👨‍🏫</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Professor DevCycle</h3>
                  <p className="text-gray-600">
                    {learnedModels.length === 0 && "Click on each model to explore their concepts, advantages, and real-world applications!"}
                    {learnedModels.length > 0 && learnedModels.length < 5 && `Excellent progress! You've mastered ${learnedModels.length} model${learnedModels.length > 1 ? 's' : ''}. Continue exploring to unlock the practice challenges!`}
                    {learnedModels.length === 5 && "Outstanding! You've learned all five SDLC models. Now you're ready to apply this knowledge to real-world projects!"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Start practice button */}
          {allModelsLearned && (
            <div className="text-center animate-bounce">
              <button
                onClick={onNext}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl transform transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="inline-block w-8 h-8 mr-3" />
                Start Practice Challenges!
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Model detail modal */}
      {selectedModel && currentModel && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className={`bg-gradient-to-r ${currentModel.color} text-white p-8 rounded-t-3xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{currentModel.emoji}</div>
                  <div>
                    <h3 className="text-3xl font-bold">{currentModel.name}</h3>
                    <p className="text-xl opacity-90">"{currentModel.quote}"</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-8">
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Key Concepts</h4>
                <ul className="space-y-3">
                  {currentModel.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-700">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-green-700 mb-4">✅ Advantages</h4>
                  <ul className="space-y-2">
                    {currentModel.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-red-700 mb-4">⚠️ Challenges</h4>
                  <ul className="space-y-2">
                    {currentModel.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-5 h-5 text-red-500">⚠️</div>
                        <span className="text-gray-700">{disadvantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-purple-700 mb-4">🎯 Perfect For</h4>
                <div className="flex flex-wrap gap-3">
                  {currentModel.useCases.map((useCase, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnModelsScene;
