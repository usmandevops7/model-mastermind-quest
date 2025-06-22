
import React from 'react';
import { GraduationCap, Play, BookOpen, Users, Code, Trophy } from 'lucide-react';

interface WelcomeSceneProps {
  onNext: () => void;
}

const WelcomeScene: React.FC<WelcomeSceneProps> = ({ onNext }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center text-white px-8 max-w-6xl py-8">
        {/* Main title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-20 h-20 mr-4 animate-pulse text-yellow-300" />
            <Code className="w-16 h-16 animate-pulse text-blue-300" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
            SDLC Academy
          </h1>
          <p className="text-xl md:text-3xl mb-4 opacity-90">Master Software Development Life Cycle Models</p>
          <p className="text-lg md:text-xl opacity-80">Interactive Learning • Real Projects • Professional Growth</p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <BookOpen className="w-10 h-10 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-xl font-bold mb-3">5 Core Models</h3>
            <p className="text-sm opacity-90">Deep dive into Waterfall, Agile, Iterative, Spiral, and V-Model with detailed explanations</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Users className="w-10 h-10 mx-auto mb-4 text-green-300" />
            <h3 className="text-xl font-bold mb-3">15+ Projects</h3>
            <p className="text-sm opacity-90">Banking, Healthcare, E-commerce, Gaming, and more real-world scenarios</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Trophy className="w-10 h-10 mx-auto mb-4 text-purple-300" />
            <h3 className="text-xl font-bold mb-3">Interactive Learning</h3>
            <p className="text-sm opacity-90">Hands-on decision making with detailed feedback and explanations</p>
          </div>
        </div>

        {/* Professor introduction */}
        <div className="mb-8 animate-scale-in" style={{ animationDelay: '1s' }}>
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
            <span className="text-5xl">👨‍🏫</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-white/30">
            <h3 className="text-xl font-bold mb-4 text-yellow-200">Professor DevCycle</h3>
            <p className="text-base mb-3">
              "Welcome to SDLC Academy! I'm here to guide you through the fascinating world of software development methodologies."
            </p>
            <p className="text-sm opacity-90">
              "You'll learn when to use each model, understand their strengths and weaknesses, and apply them to real-world projects. Ready to become an SDLC expert?"
            </p>
          </div>
        </div>

        {/* Learning path preview */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <h3 className="text-xl font-semibold mb-6 text-yellow-200">Your Learning Journey</h3>
          <div className="flex justify-center items-center space-x-2 md:space-x-4 text-xs md:text-sm overflow-x-auto">
            <div className="bg-blue-500/30 px-3 py-2 rounded-full whitespace-nowrap">1. Learn Models</div>
            <div className="text-xl">→</div>
            <div className="bg-green-500/30 px-3 py-2 rounded-full whitespace-nowrap">2. Practice Matching</div>
            <div className="text-xl">→</div>
            <div className="bg-purple-500/30 px-3 py-2 rounded-full whitespace-nowrap">3. Expert Challenges</div>
            <div className="text-xl">→</div>
            <div className="bg-yellow-500/30 px-3 py-2 rounded-full whitespace-nowrap">4. Certification</div>
          </div>
        </div>

        {/* Start button - Make it more prominent */}
        <div className="animate-fade-in" style={{ animationDelay: '2s' }}>
          <button
            onClick={onNext}
            className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-full text-xl md:text-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl animate-pulse border-2 border-white/20"
          >
            <Play className="inline-block w-6 h-6 md:w-8 md:h-8 mr-3 group-hover:animate-spin" />
            Begin Learning Journey
          </button>
          
          {/* Additional visual cue */}
          <div className="mt-4 animate-bounce">
            <p className="text-sm opacity-75">👆 Click to start your SDLC adventure!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScene;
