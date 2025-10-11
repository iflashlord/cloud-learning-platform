import { Check } from "lucide-react";

interface ComparisonItem {
  feature: string;
  free: boolean | string;
  pro: boolean | string;
}

export const ProComparison = () => {
  const comparisonData: ComparisonItem[] = [
    { feature: "Basic Courses", free: true, pro: true },
    { feature: "Hearts System", free: "5 hearts", pro: "Unlimited" },
    { feature: "Progress Tracking", free: "Basic", pro: "Advanced Analytics" },
    { feature: "Premium Courses", free: false, pro: true },
    { feature: "Offline Access", free: false, pro: true },
    { feature: "Achievement Badges", free: "Basic", pro: "Premium + Certificates" },
    { feature: "Priority Support", free: false, pro: true },
    { feature: "Learning Streaks", free: "Basic", pro: "Enhanced + Rewards" },
  ];

  const renderValue = (value: boolean | string, isPro: boolean = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className={`w-5 h-5 ${isPro ? 'text-orange-500' : 'text-green-500'}`} />
      ) : (
        <span className="text-gray-300 dark:text-gray-600">—</span>
      );
    }
    return (
      <span className={`text-sm ${isPro ? 'text-orange-600 dark:text-orange-400 font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-gray-100 dark:border-gray-700 overflow-hidden mb-12">
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Feature Comparison</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {comparisonData.map((item, index) => (
          <div key={index} className="px-6 py-4 flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-gray-100">{item.feature}</span>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Free</div>
                <div className="flex items-center justify-center">
                  {renderValue(item.free)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-orange-500 mb-1 font-medium">Pro</div>
                <div className="flex items-center justify-center">
                  {renderValue(item.pro, true)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};