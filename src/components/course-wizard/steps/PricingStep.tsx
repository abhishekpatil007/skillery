"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCourseWizardStore } from "@/store/courseWizardStore";
import { pricingSchema, PricingFormData } from "@/lib/validations/course-wizard";
import { 
  DollarSign, 
  Percent, 
  Eye, 
  EyeOff,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingStep() {
  const { data, updateData, validateStep, currentStep } = useCourseWizardStore();
  const [showDiscount, setShowDiscount] = useState(false);

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<PricingFormData>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      price: data.price,
      originalPrice: data.originalPrice,
      discountPercentage: data.discountPercentage,
      visibility: data.visibility,
      isSubmitted: data.isSubmitted
    },
    mode: 'onChange'
  });

  // Watch individual fields to avoid infinite re-renders
  const price = watch('price');
  const originalPrice = watch('originalPrice');
  const discountPercentage = watch('discountPercentage');
  const visibility = watch('visibility');
  const isSubmitted = watch('isSubmitted');

  // Memoize the update function to prevent infinite loops
  const updateStoreData = useCallback((updates: Partial<PricingFormData>) => {
    updateData({
      price: updates.price || 0,
      originalPrice: updates.originalPrice,
      discountPercentage: updates.discountPercentage,
      visibility: updates.visibility || 'draft',
      isSubmitted: updates.isSubmitted || false
    });
  }, [updateData]);

  // Update store when form values change
  useEffect(() => {
    updateStoreData({
      price,
      originalPrice,
      discountPercentage,
      visibility,
      isSubmitted
    });
  }, [price, originalPrice, discountPercentage, visibility, isSubmitted, updateStoreData]);

  // Validate step when form becomes valid
  useEffect(() => {
    if (isValid) {
      validateStep(currentStep);
    }
  }, [isValid, validateStep, currentStep]);

  const calculateDiscount = () => {
    if (data.originalPrice && data.price) {
      const discount = ((data.originalPrice - data.price) / data.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const calculateSavings = () => {
    if (data.originalPrice && data.price) {
      return data.originalPrice - data.price;
    }
    return 0;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isStepValid = data.price > 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Publishing</h2>
        <p className="text-gray-600">
          Set your course price and choose when to make it available to students.
        </p>
      </div>

      <form className="space-y-8">
        {/* Pricing Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Pricing</h3>
          
          <div className="space-y-6">
            {/* Course Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Course Price *
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="999"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className={cn(
                    "pl-10",
                    errors.price && "border-red-500 focus:border-red-500"
                  )}
                />
              </div>
              {errors.price && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.price.message}</span>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Set your course price. You can always change this later.
              </p>
            </div>

            {/* Discount Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Offer a Discount</Label>
                <p className="text-xs text-gray-500">Create urgency with a limited-time offer</p>
              </div>
              <Switch
                checked={showDiscount}
                onCheckedChange={setShowDiscount}
              />
            </div>

            {/* Discount Fields */}
            {showDiscount && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice" className="text-sm font-medium">
                      Original Price
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="originalPrice"
                        type="number"
                        placeholder="0"
                        min="0"
                        max="999"
                        step="0.01"
                        {...register('originalPrice', { valueAsNumber: true })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountPercentage" className="text-sm font-medium">
                      Discount Percentage
                    </Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="discountPercentage"
                        type="number"
                        placeholder="0"
                        min="0"
                        max="100"
                        {...register('discountPercentage', { valueAsNumber: true })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Discount Preview */}
                {data.originalPrice && data.price && data.originalPrice > data.price && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {calculateDiscount()}% off! Students save {formatCurrency(calculateSavings())}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Publishing Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Course Visibility</Label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="draft"
                    checked={data.visibility === 'draft'}
                    onChange={(e) => setValue('visibility', e.target.value as 'draft' | 'published')}
                    className="text-brand-600 focus:ring-brand-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Save as Draft</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Keep your course private while you work on it
                    </p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="published"
                    checked={data.visibility === 'published'}
                    onChange={(e) => setValue('visibility', e.target.value as 'draft' | 'published')}
                    className="text-brand-600 focus:ring-brand-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Publish Course</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Make your course available to students immediately
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Pricing Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Research similar courses to set competitive pricing</li>
                <li>• Consider offering discounts for early enrollment</li>
                <li>• You can always adjust pricing after publishing</li>
                <li>• Higher prices often signal higher quality content</li>
                <li>• Consider your target audience&apos;s budget</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Validation Message */}
        {!isStepValid && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Please set a course price to continue
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
