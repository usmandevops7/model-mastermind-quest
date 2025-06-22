
import React, { useEffect, useState } from 'react';
import { RotateCcw, BookOpen, Trophy, Star, Medal, Target } from 'lucide-react';

interface VictorySceneProps {
  onReplay: () => void;
  onLearnAgain: () => void;
  gameData: any;
}

const VictoryScene: React.FC<VictorySceneProps> = ({ onReplay, onLearnAgain, gameData }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  useEffect(() => {
    // Show achievement after a delay
    setTimeout(() => {
      setAchievementUnlocked(true);
    }, 1000);

    // Hide confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, []);

  const totalScore = gameData.score || 0;
  const getScoreRating = (score: number) => {
    if (score >= 400) return { rating: 'LEGENDARY', color: 'text-purple-600', emoji: '👑' };
    if (score >= 300) return { rating: 'EXPERT', color: 'text-blue-600', emoji: '🏆' };
    if (score >= 200) return { rating: 'ADVANCED', color: 'text-green-600', emoji: '🥇' };
    return { rating: 'COMPLETE', color: 'text-orange-600', emoji: '🎯' };
  };

  const scoreInfo = getScoreRating(totalScore);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {showConfetti && (
          <>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
            {[...Array(30)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute text-white animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${12 + Math.random() * 20}px`
                }}
              >
                ⭐
              </div>
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full text-white px-8">
        <div className="text-center max-w-4xl">
          {/* Main victory message */}
          <div className="mb-8 animate-fade-in">
            <div className="text-8xl mb-6 animate-bounce">🏆</div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              SDLC MASTER!
            </h1>
            <p className="text-2xl mb-4 opacity-90">You've Conquered Software Development Models!</p>
            <div className="flex items-center justify-center space-x-2 text-xl">
              <span>Final Score:</span>
              <span className={`font-bold text-3xl ${scoreInfo.color} bg-white/20 px-4 py-2 rounded-full`}>
                {scoreInfo.emoji} {totalScore} - {scoreInfo.rating}
              </span>
            </div>
          </div>

          {/* Achievement banner */}
          {achievementUnlocked && (
            <div className="mb-8 animate-scale-in bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <Medal className="w-8 h-8 mr-2 text-yellow-300" />
                <h2 className="text-2xl font-bold">Achievement Unlocked!</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <h3 className="font-bold mb-1">Model Master</h3>
                  <p className="text-sm opacity-80">Learned all 5 SDLC models</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Target className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <h3 className="font-bold mb-1">Perfect Matcher</h3>
                  <p className="text-sm opacity-80">Made expert project decisions</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Star className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <h3 className="font-bold mb-1">Speed Demon</h3>
                  <p className="text-sm opacity-80">Completed under pressure</p>
                </div>
              </div>
            </div>
          )}

          {/* Professor's final message */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                  <span className="text-3xl">👨‍🏫</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Professor Code's Final Words:</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                "Outstanding work! You've mastered the art of choosing the right SDLC model for any project. 
                Whether it's a critical hospital system needing spiral development, or a dynamic chat app 
                requiring agile methodology, you now have the expertise to make the perfect choice. 
                Go forth and build amazing software!"
              </p>
            </div>
          </div>

          {/* Fun stats */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm opacity-80">Models Learned</div>
                <div className="text-xl font-bold">5/5</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-sm opacity-80">Levels Completed</div>
                <div className="text-xl font-bold">3/3</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-sm opacity-80">Projects Mastered</div>
                <div className="text-xl font-bold">9</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm opacity-80">Expert Status</div>
                <div className="text-xl font-bold">✅</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={onReplay}
              className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform transition-all duration-300 hover:scale-110"
            >
              <RotateCcw className="inline-block w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Play Again
            </button>
            
            <button
              onClick={onLearnAgain}
              className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform transition-all duration-300 hover:scale-110"
            >
              <BookOpen className="inline-block w-5 h-5 mr-2 group-hover:animate-pulse" />
              Review Models
            </button>
          </div>

          {/* Social sharing prompt */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '2s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-sm opacity-80 mb-2">🎉 Share your achievement!</p>
              <p className="text-xs opacity-70">
                "I just mastered all 5 SDLC models and became an expert at matching projects with development methodologies! 🏆 #SDLCMaster #SoftwareEngineering"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryScene;
