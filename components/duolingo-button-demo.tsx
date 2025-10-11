import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Heart, Trophy, Star } from 'lucide-react';

interface QuestionState {
  status: 'none' | 'correct' | 'wrong' | 'completed';
  attempts: number;
}

export const DuolingoButtonDemo: React.FC = () => {
  const [questionState, setQuestionState] = useState<QuestionState>({
    status: 'none',
    attempts: 0
  });
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const [animateError, setAnimateError] = useState(false);

  const handleCheck = () => {
    // Simulate random correct/incorrect for demo
    const isCorrect = Math.random() > 0.4; // 60% chance of being correct
    
    if (isCorrect) {
      setQuestionState(prev => ({ ...prev, status: 'correct' }));
      setAnimateSuccess(true);
      setTimeout(() => setAnimateSuccess(false), 600);
    } else {
      setQuestionState(prev => ({ 
        status: 'wrong', 
        attempts: prev.attempts + 1 
      }));
      setAnimateError(true);
      setTimeout(() => setAnimateError(false), 500);
    }
  };

  const handleNext = () => {
    if (questionState.status === 'correct') {
      setQuestionState({ status: 'completed', attempts: 0 });
    }
  };

  const handleRetry = () => {
    setQuestionState(prev => ({ ...prev, status: 'none' }));
  };

  const handleContinue = () => {
    // Reset to new question
    setQuestionState({ status: 'none', attempts: 0 });
  };

  const getButtonProps = () => {
    switch (questionState.status) {
      case 'correct':
        return {
          variant: 'success' as const,
          children: 'NEXT',
          onClick: handleNext,
          animateSuccess: animateSuccess,
          leftIcon: <CheckCircle className="w-5 h-5" />
        };
      case 'wrong':
        return {
          variant: 'danger' as const,
          children: 'RETRY',
          onClick: handleRetry,
          animateError: animateError,
          leftIcon: <XCircle className="w-5 h-5" />
        };
      case 'completed':
        return {
          variant: 'info' as const,
          children: 'CONTINUE',
          onClick: handleContinue,
          rightIcon: <ArrowRight className="w-5 h-5" />
        };
      default:
        return {
          variant: 'primary' as const,
          children: 'CHECK',
          onClick: handleCheck
        };
    }
  };

  const getStatusMessage = () => {
    switch (questionState.status) {
      case 'correct':
        return {
          message: 'Nicely done!',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <CheckCircle className="w-6 h-6 text-green-600" />
        };
      case 'wrong':
        return {
          message: questionState.attempts > 2 ? 'Keep trying!' : 'Try again.',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: <XCircle className="w-6 h-6 text-red-600" />
        };
      case 'completed':
        return {
          message: 'Lesson completed!',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: <Trophy className="w-6 h-6 text-blue-600" />
        };
      default:
        return null;
    }
  };

  const statusInfo = getStatusMessage();
  const buttonProps = getButtonProps();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            What is the capital of France?
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <span className="font-semibold">London</span>
            </button>
            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <span className="font-semibold">Berlin</span>
            </button>
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <span className="font-semibold text-blue-700">Paris</span>
            </button>
            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <span className="font-semibold">Madrid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {statusInfo && (
        <div className={`
          ${statusInfo.bgColor} ${statusInfo.borderColor} 
          rounded-2xl p-6 border-2 flex items-center space-x-4
          transform transition-all duration-300 ease-out
        `}>
          {statusInfo.icon}
          <span className={`font-bold text-lg ${statusInfo.color}`}>
            {statusInfo.message}
          </span>
          {questionState.status === 'wrong' && questionState.attempts > 0 && (
            <div className="ml-auto flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">
                Attempts: {questionState.attempts}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Footer with Button */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
        <div className="flex items-center justify-between">
          {questionState.status === 'completed' && (
            <Button variant="secondary" leftIcon={<Heart className="w-5 h-5" />}>
              Practice again
            </Button>
          )}
          
          <Button 
            {...buttonProps}
            className="ml-auto min-w-[140px] font-extrabold tracking-wide"
            size="lg"
          />
        </div>
      </div>

      {/* Demo Controls */}
      <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
        <h3 className="font-bold text-gray-700 mb-4">Demo Controls</h3>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setQuestionState({ status: 'none', attempts: 0 })}
          >
            Reset
          </Button>
          <Button 
            variant="success" 
            size="sm"
            onClick={() => {
              setQuestionState({ status: 'correct', attempts: 0 });
              setAnimateSuccess(true);
              setTimeout(() => setAnimateSuccess(false), 600);
            }}
          >
            Force Correct
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => {
              setQuestionState(prev => ({ status: 'wrong', attempts: prev.attempts + 1 }));
              setAnimateError(true);
              setTimeout(() => setAnimateError(false), 500);
            }}
          >
            Force Wrong
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DuolingoButtonDemo;
