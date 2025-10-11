import { 
  Infinity, 
  BookOpen, 
  Zap, 
  Trophy, 
  Shield, 
  Clock,
  LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor?: string;
  iconTextColor?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  iconBgColor = "bg-gray-100", 
  iconTextColor = "text-gray-600" 
}: FeatureCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-gray-100 dark:border-gray-700">
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", iconBgColor)}>
        <Icon className={cn("w-6 h-6", iconTextColor)} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export const ProFeatures = () => {
  const features = [
    {
      icon: Infinity,
      title: "Unlimited Hearts",
      description: "Never run out of hearts. Learn without interruptions and practice as much as you want.",
      iconBgColor: statusStyles.success.bg,
      iconTextColor: statusStyles.success.text
    },
    {
      icon: BookOpen,
      title: "Premium Content",
      description: "Access exclusive lessons, advanced topics, and real-world projects not available in free plan.",
      iconBgColor: "bg-blue-100",
      iconTextColor: "text-blue-600"
    },
    {
      icon: Zap,
      title: "Progress Insights",
      description: "Detailed analytics, learning streaks, and personalized recommendations to optimize your learning.",
      iconBgColor: "bg-purple-100",
      iconTextColor: "text-purple-600"
    },
    {
      icon: Trophy,
      title: "Achievement Badges",
      description: "Earn special badges, certificates, and showcase your achievements to employers.",
      iconBgColor: "bg-yellow-100",
      iconTextColor: "text-yellow-600"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Get faster response times and dedicated support from our learning experts.",
      iconBgColor: "bg-red-100",
      iconTextColor: "text-red-600"
    },
    {
      icon: Clock,
      title: "Offline Learning",
      description: "Download lessons and practice offline. Perfect for learning on the go without internet.",
      iconBgColor: "bg-indigo-100",
      iconTextColor: "text-indigo-600"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          iconBgColor={feature.iconBgColor}
          iconTextColor={feature.iconTextColor}
        />
      ))}
    </div>
  );
};