import { Star, User } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  gender: "male" | "female";
}

export const ProTestimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "AWS Solutions Architect",
      content: "The premium content helped me pass my AWS certification exam. The unlimited practice was a game-changer!",
      gender: "female"
    },
    {
      name: "Mike Chen",
      role: "DevOps Engineer",
      content: "Offline learning is perfect for my commute. I've completed 3 courses during my daily train rides.",
      gender: "male"
    },
    {
      name: "Emily Davis",
      role: "Full Stack Developer",
      content: "The progress insights helped me identify my weak areas and focus my learning effectively.",
      gender: "female"
    }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">What Our Pro Users Say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${testimonial.gender === 'female' ? 'bg-pink-100 dark:bg-pink-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                  <User className={`w-5 h-5 ${testimonial.gender === 'female' ? 'text-pink-600 dark:text-pink-400' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
            <div className="flex items-center mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};