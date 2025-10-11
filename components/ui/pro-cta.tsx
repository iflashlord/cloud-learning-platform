interface ProCTAProps {
  onStartTrial: () => void;
  onViewPlans: () => void;
}

export const ProCTA = ({ onStartTrial, onViewPlans }: ProCTAProps) => {
  return (
    <div className="text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Learning?</h2>
      <p className="text-xl text-orange-100 mb-6">Join thousands of professionals who have advanced their careers with Pro.</p>
      <button 
        onClick={onStartTrial}
        className="bg-white text-orange-600 py-4 px-8 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors mr-4"
      >
        Start 7-Day Free Trial
      </button>
      <button 
        onClick={onViewPlans}
        className="border-2 border-white text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors"
      >
        View All Plans
      </button>
      <p className="text-sm text-orange-100 mt-4">No credit card required • Cancel anytime</p>
    </div>
  );
};