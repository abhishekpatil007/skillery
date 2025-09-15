"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourseWizardStore } from "@/store/courseWizardStore";
import { basicsSchema, BasicsFormData } from "@/lib/validations/course-wizard";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/types/course-wizard";
import { Plus, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function BasicsStep() {
  const { data, updateData, validateStep, currentStep } = useCourseWizardStore();
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<BasicsFormData>({
    resolver: zodResolver(basicsSchema),
    defaultValues: {
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      level: data.level,
      language: data.language,
      primaryTopicTags: data.primaryTopicTags
    },
    mode: 'onChange'
  });

  // Watch individual fields to avoid infinite re-renders
  const title = watch('title');
  const subtitle = watch('subtitle');
  const category = watch('category');
  const level = watch('level');
  const language = watch('language');
  const primaryTopicTags = watch('primaryTopicTags');

  // Memoize the update function to prevent infinite loops
  const updateStoreData = useCallback((updates: Partial<BasicsFormData>) => {
    updateData({
      title: updates.title || '',
      subtitle: updates.subtitle || '',
      category: updates.category || '',
      level: updates.level || 'All Levels',
      language: updates.language || 'English',
      primaryTopicTags: updates.primaryTopicTags || []
    });
  }, [updateData]);

  // Update store when form values change
  useEffect(() => {
    updateStoreData({
      title,
      subtitle,
      category,
      level,
      language,
      primaryTopicTags
    });
  }, [title, subtitle, category, level, language, primaryTopicTags, updateStoreData]);

  // Validate step when form becomes valid
  useEffect(() => {
    if (isValid) {
      validateStep(currentStep);
    }
  }, [isValid, validateStep, currentStep]);

  const handleAddTag = () => {
    if (tagInput.trim() && !data.primaryTopicTags.includes(tagInput.trim())) {
      const newTags = [...data.primaryTopicTags, tagInput.trim()];
      setValue('primaryTopicTags', newTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = data.primaryTopicTags.filter(tag => tag !== tagToRemove);
    setValue('primaryTopicTags', newTags);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Basics</h2>
        <p className="text-gray-600">
          Let&apos;s start with the fundamental information about your course.
        </p>
      </div>

      <form className="space-y-6">
        {/* Course Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Course Title *
          </Label>
          <Input
            id="title"
            placeholder="e.g., The Complete Web Development Bootcamp 2024"
            {...register('title')}
            className={cn(
              errors.title && "border-red-500 focus:border-red-500"
            )}
          />
          {errors.title && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.title.message}</span>
            </div>
          )}
          <p className="text-xs text-gray-500">
            Choose a clear, descriptive title that tells students what they&apos;ll learn
          </p>
        </div>

        {/* Course Subtitle */}
        <div className="space-y-2">
          <Label htmlFor="subtitle" className="text-sm font-medium">
            Course Subtitle *
          </Label>
          <Textarea
            id="subtitle"
            placeholder="e.g., Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more!"
            rows={3}
            {...register('subtitle')}
            className={cn(
              errors.subtitle && "border-red-500 focus:border-red-500"
            )}
          />
          {errors.subtitle && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.subtitle.message}</span>
            </div>
          )}
          <p className="text-xs text-gray-500">
            A compelling subtitle that explains the value and outcomes of your course
          </p>
        </div>

        {/* Category and Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category *
            </Label>
            <Select
              value={data.category}
              onValueChange={(value) => setValue('category', value)}
            >
              <SelectTrigger className={cn(
                errors.category && "border-red-500 focus:border-red-500"
              )}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.category.message}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="level" className="text-sm font-medium">
              Course Level *
            </Label>
            <Select
              value={data.level}
              onValueChange={(value) => setValue('level', value as 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels')}
            >
              <SelectTrigger className={cn(
                errors.level && "border-red-500 focus:border-red-500"
              )}>
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.level && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.level.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label htmlFor="language" className="text-sm font-medium">
            Language *
          </Label>
          <Input
            id="language"
            placeholder="e.g., English"
            {...register('language')}
            className={cn(
              errors.language && "border-red-500 focus:border-red-500"
            )}
          />
          {errors.language && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.language.message}</span>
            </div>
          )}
        </div>

        {/* Primary Topic Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags" className="text-sm font-medium">
            Primary Topic Tags *
          </Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="e.g., JavaScript, React, Web Development"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput.trim() || data.primaryTopicTags.includes(tagInput.trim())}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {data.primaryTopicTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {data.primaryTopicTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          
          {errors.primaryTopicTags && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.primaryTopicTags.message}</span>
            </div>
          )}
          <p className="text-xs text-gray-500">
            Add 1-10 topic tags to help students find your course
          </p>
        </div>
      </form>
    </div>
  );
}
