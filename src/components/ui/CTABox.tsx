import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CTABoxProps {
  title: string;
  description?: string;
  primaryButton: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  variant?: "default" | "brand" | "accent";
}

export function CTABox({
  title,
  description,
  primaryButton,
  className,
  variant = "default"
}: CTABoxProps) {
  const variants = {
    default: "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-lg",
    brand: "bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 border-brand-300 shadow-2xl shadow-brand-500/20",
    accent: "bg-gradient-to-br from-accent-50 via-accent-100 to-accent-200 border-accent-300 shadow-2xl shadow-accent-500/20"
  };

  return (
    <div className={cn(
      "relative rounded-3xl overflow-hidden",
      variants[variant],
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8 items-center p-12">
        {/* Left Column - Content */}
        <div className="relative z-10 text-left">
          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg">
              {description}
            </p>
          )}
          
          {/* Button */}
          <Button
            size="lg"
            className="px-8 py-3 text-lg font-semibold rounded-xl bg-white text-blue-600 hover:bg-gray-100 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={primaryButton.onClick}
          >
            {primaryButton.text}
          </Button>
        </div>

        {/* Right Column - Dashboard Mockup */}
        <div className="relative z-10 hidden lg:block">
          <div className="relative">
            {/* Browser Window Frame */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Browser Header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1 mx-4">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-600 font-semibold text-sm">🎯 Skillery</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Ready to keep learning?</h3>
                    <p className="text-gray-600 text-sm">Pick up where you left off</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">You're on fire, Levi!</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="text-orange-500">🔥</div>
                      <span className="font-semibold text-gray-900">3 day streak</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Resume Last Course
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                    Explore New Courses
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-xs text-gray-500">Courses Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">2</div>
                    <div className="text-xs text-gray-500">Certificates Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">18.5</div>
                    <div className="text-xs text-gray-500">Hours Learned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-xs text-gray-500">Day Streak</div>
                  </div>
                </div>

                {/* Continue Learning Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Continue Learning</h4>
                    <button className="text-blue-600 text-sm">See All</button>
                  </div>
                  
                  {/* Course Progress Card */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">🐍</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">Mastering Python Basics</h5>
                        <p className="text-sm text-gray-500">12 Lectures • 8 Modules</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-blue-600 font-medium">75%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Resume Course
                      </button>
                    </div>
                  </div>
                </div>

                {/* For You Section */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">For You</h4>
                    <button className="text-blue-600 text-sm">See All</button>
                  </div>
                  
                  {/* Recommendation Card */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">⚛️</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">Advanced React Development</h5>
                        <p className="text-sm text-gray-500">Based on your Python progress</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
