
import React from 'react';
import { GraduationCap, Play, BookOpen } from 'lucide-react';

interface WelcomeSceneProps {
  onNext: () => void;
}

const WelcomeScene: React.FC<WelcomeSceneProps> = ({ onNext }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center text-white px-8">
        {/* Main title with animation */}
        <div className="mb-8 animate-fade-in">
          <GraduationCap className="w-24 h-24 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
            SDLC Master Quest
          </h1>
          <p className="text-2xl mb-2 opacity-90">Master Software Development Models</p>
          <p className="text-lg opacity-80">An Interactive Learning Adventure</p>
        </div>

        {/* Teacher character */}
        <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
            <span className="text-4xl">👨‍🏫</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto border border-white/30">
            <p className="text-lg font-medium">Professor Code</p>
            <p className="text-sm opacity-90">"Ready to become an SDLC expert? Let's learn together!"</p>
          </div>
        </div>

        {/* Game features */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Learn 5 Models</h3>
              <p className="text-sm opacity-80">Meet animated SDLC characters</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl block mb-2">🎯</span>
              <h3 className="font-semibold mb-1">3 Levels</h3>
              <p className="text-sm opacity-80">Progressive difficulty challenges</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl block mb-2">🏆</span>
              <h3 className="font-semibold mb-1">Master Quest</h3>
              <p className="text-sm opacity-80">Become an SDLC expert</p>
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onNext}
          className="group bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl animate-pulse"
        >
          <Play className="inline-block w-6 h-6 mr-2 group-hover:animate-spin" />
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default WelcomeScene;
