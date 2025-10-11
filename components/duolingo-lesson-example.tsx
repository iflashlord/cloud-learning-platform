import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Heart, Star, Volume2, Lightbulb } from 'lucide-react';

interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface LessonState {
  currentQuestion: number;
  status: 'none' | 'correct' | 'wrong' | 'completed';
  selectedAnswer: number | null;
  score: number;
  attempts: number;
  showExplanation: boolean;
}

const sampleQuestions: LessonQuestion[] = [
  {
    id: '1',
    question: 'Which AWS service is used for object storage?',
    options: ['EC2', 'S3', 'RDS', 'Lambda'],
    correctAnswer: 1,
    explanation: 'Amazon S3 (Simple Storage Service) is AWS\'s object storage service that offers industry-leading scalability, data availability, security, and performance.'
  },
  {
    id: '2', 
    question: 'What does EC2 stand for?',
    options: ['Elastic Container Cloud', 'Elastic Compute Cloud', 'Enhanced Cloud Computing', 'Enterprise Cloud Center'],
    correctAnswer: 1,
    explanation: 'EC2 stands for Elastic Compute Cloud, which provides scalable computing capacity in the Amazon Web Services cloud.'
  },
  {
    id: '3',
    question: 'Which service is used for serverless computing?',
    options: ['S3', 'EC2', 'Lambda', 'VPC'],
    correctAnswer: 2,
    explanation: 'AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume.'
  }
];

export const DuolingoLessonExample: React.FC = () => {
  const [lessonState, setLessonState] = useState<LessonState>({
    currentQuestion: 0,
    status: 'none',
    selectedAnswer: null,
    score: 0,
    attempts: 0,
    showExplanation: false
  });

  const currentQuestion = sampleQuestions[lessonState.currentQuestion];
  const isLastQuestion = lessonState.currentQuestion === sampleQuestions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (lessonState.status === 'none') {
      setLessonState(prev => ({ ...prev, selectedAnswer: answerIndex }));
    }
  };

  const handleCheck = () => {
    if (lessonState.selectedAnswer === null) return;

    const isCorrect = lessonState.selectedAnswer === currentQuestion.correctAnswer;
    
    setLessonState(prev => ({
      ...prev,
      status: isCorrect ? 'correct' : 'wrong',
      score: isCorrect ? prev.score + 1 : prev.score,
      attempts: prev.attempts + 1,
      showExplanation: isCorrect
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setLessonState(prev => ({ ...prev, status: 'completed' }));
    } else {
      setLessonState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        status: 'none',
        selectedAnswer: null,
        showExplanation: false
      }));
    }
  };

  const handleRetry = () => {
    setLessonState(prev => ({
      ...prev,
      status: 'none',
      selectedAnswer: null,
      showExplanation: false
    }));
  };

  const handleContinue = () => {
    // In a real app, this would navigate to the next lesson
    setLessonState({
      currentQuestion: 0,
      status: 'none',
      selectedAnswer: null,
      score: 0,
      attempts: 0,
      showExplanation: false
    });
  };

  const getFooterContent = () => {
    switch (lessonState.status) {
      case 'correct':
        return {
          message: 'Excellent work!',
          button: {
            variant: 'success' as const,
            text: isLastQuestion ? 'FINISH' : 'NEXT',
            icon: <CheckCircle className="w-5 h-5" />,
            onClick: handleNext,
            animate: true
          },
          bgClass: 'bg-green-50 border-green-200',
          textClass: 'text-green-600'
        };
      case 'wrong':
        return {
          message: 'Not quite right. Try again!',
          button: {
            variant: 'danger' as const,
            text: 'RETRY',
            icon: <XCircle className="w-5 h-5" />,
            onClick: handleRetry,
            animate: true
          },
          bgClass: 'bg-red-50 border-red-200',
          textClass: 'text-red-600'
        };
      case 'completed':
        return {
          message: 'Lesson Complete! Great job!',
          button: {
            variant: 'info' as const,
            text: 'CONTINUE LEARNING',
            icon: <ArrowRight className="w-5 h-5" />,
            onClick: handleContinue,
            animate: false
          },
          bgClass: 'bg-blue-50 border-blue-200',
          textClass: 'text-blue-600'
        };
      default:
        return {
          message: 'Select your answer and check!',
          button: {
            variant: 'primary' as const,
            text: 'CHECK',
            icon: null,
            onClick: handleCheck,
            animate: false
          },
          bgClass: 'bg-gray-50 border-gray-200',
          textClass: 'text-gray-600'
        };
    }
  };

  const footerContent = getFooterContent();

  if (lessonState.status === 'completed') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 text-center shadow-lg border-2 border-blue-200">
          <div className="mb-8">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Star className="w-10 h-10 text-yellow-800" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-black text-gray-800 mb-4">Lesson Complete!</h1>
            <p className="text-xl text-gray-600 mb-6">
              You scored {lessonState.score} out of {sampleQuestions.length} questions correct!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{lessonState.score}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{lessonState.attempts}</div>
              <div className="text-sm text-gray-600">Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.round((lessonState.score / sampleQuestions.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" leftIcon={<Heart className="w-5 h-5" />}>
              PRACTICE AGAIN
            </Button>
            <Button variant="info" rightIcon={<ArrowRight className="w-5 h-5" />}>
              NEXT LESSON
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Question {lessonState.currentQuestion + 1} of {sampleQuestions.length}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            Score: {lessonState.score}/{lessonState.currentQuestion + (lessonState.status === 'correct' ? 1 : 0)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ 
              width: `${((lessonState.currentQuestion + (lessonState.status === 'correct' ? 1 : 0)) / sampleQuestions.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
        <div className="flex items-start space-x-4 mb-6">
          <Button variant="ghost" size="sm" className="p-2">
            <Volume2 className="w-5 h-5 text-blue-500" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            {currentQuestion.question}
          </h2>
        </div>
        
        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = lessonState.selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const isWrong = lessonState.status === 'wrong' && isSelected && !isCorrect;
            const shouldHighlight = lessonState.status !== 'none' && isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={lessonState.status !== 'none'}
                className={`
                  p-4 rounded-xl border-2 text-left font-semibold transition-all duration-200
                  ${lessonState.status === 'none' 
                    ? 'hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]' 
                    : 'cursor-default'
                  }
                  ${isSelected && lessonState.status === 'none' 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                  }
                  ${shouldHighlight 
                    ? 'bg-green-50 border-green-300 text-green-700' 
                    : ''
                  }
                  ${isWrong 
                    ? 'bg-red-50 border-red-300 text-red-700' 
                    : ''
                  }
                `}
              >
                <span className="flex items-center">
                  <span className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 text-sm font-bold
                    ${isSelected && lessonState.status === 'none' 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'border-gray-300 text-gray-500'
                    }
                    ${shouldHighlight 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : ''
                    }
                    ${isWrong 
                      ? 'bg-red-500 border-red-500 text-white' 
                      : ''
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {lessonState.showExplanation && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h3 className="flex items-center gap-2 font-bold text-blue-800 mb-2">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span>Explanation</span>
            </h3>
            <p className="text-blue-700">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`
        rounded-2xl p-6 border-2 transition-all duration-300 shadow-lg
        ${footerContent.bgClass}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {footerContent.message && (
              <span className={`font-bold text-lg ${footerContent.textClass}`}>
                {footerContent.message}
              </span>
            )}
            
            <Button
              variant={footerContent.button.variant}
              onClick={footerContent.button.onClick}
              disabled={lessonState.status === 'none' && lessonState.selectedAnswer === null}
              className="min-w-[120px] font-extrabold tracking-wide ml-auto"
              size="lg"
              leftIcon={footerContent.button.icon}
              animateSuccess={footerContent.button.animate && lessonState.status === 'correct'}
              animateError={footerContent.button.animate && lessonState.status === 'wrong'}
            >
              {footerContent.button.text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuolingoLessonExample;
