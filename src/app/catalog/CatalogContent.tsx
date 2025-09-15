"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/ui/CourseCard";
import { Pagination } from "@/components/ui/Pagination";
import { FilterSection } from "@/components/ui/FilterSection";
import { FilterCheckbox } from "@/components/ui/FilterCheckbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  X,
  BookOpen
} from "lucide-react";
import { useCatalogStore } from "@/store/catalogStore";
import { Course } from "@/types/course";
import coursesData from "@/data/courses.json";

// Filter options
const categories = [
  "Web Development", "Data Science", "Design", "Cloud Computing", 
  "Programming", "AI/ML", "Marketing", "Cybersecurity", "Mobile Development",
  "Business", "Blockchain", "DevOps", "Finance", "CRM", "Software Architecture"
];

const levels = ["Beginner", "Intermediate", "Advanced"];
const priceOptions = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" }
];
const durationOptions = [
  { value: "0-5", label: "0-5 hours" },
  { value: "6-10", label: "6-10 hours" },
  { value: "11-20", label: "11-20 hours" },
  { value: "21-40", label: "21-40 hours" },
  { value: "40+", label: "40+ hours" }
];
const languages = ["English", "Spanish", "French", "German", "Portuguese"];
const features = [
  { value: "certificate", label: "Certificate" },
  { value: "quizzes", label: "Quizzes" },
  { value: "subtitles", label: "Subtitles" }
];

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const {
    searchQuery,
    categories: selectedCategories,
    levels: selectedLevels,
    price: selectedPrice,
    rating,
    duration: selectedDuration,
    language: selectedLanguage,
    features: selectedFeatures,
    currentPage,
    itemsPerPage,
    sortBy,
    viewMode,
    allCourses,
    filteredCourses,
    totalResults,
    isLoading,
    setSearchQuery,
    toggleCategory,
    toggleLevel,
    togglePrice,
    setRating,
    toggleDuration,
    toggleLanguage,
    toggleFeature,
    clearAllFilters,
    setCurrentPage,
    setSortBy,
    setViewMode,
    setCourses
  } = useCatalogStore();

  // Initialize courses data
  useEffect(() => {
    setCourses(coursesData as Course[]);
  }, [setCourses]);

  // Sync URL params on mount
  useEffect(() => {
    const query = searchParams.get('q') || '';
    if (query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [searchParams, searchQuery, setSearchQuery]);

  // Get paginated results
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  // Get filter counts
  const getCategoryCount = (category: string) => {
    return allCourses.filter(course => course.category === category).length;
  };

  const getLevelCount = (level: string) => {
    return allCourses.filter(course => course.level === level).length;
  };

  const getPriceCount = (price: string) => {
    if (price === 'free') {
      return allCourses.filter(course => course.isFree).length;
    }
    return allCourses.filter(course => !course.isFree).length;
  };

  const getDurationCount = (duration: string) => {
    return allCourses.filter(course => {
      const hours = course.hours;
      switch (duration) {
        case '0-5': return hours <= 5;
        case '6-10': return hours >= 6 && hours <= 10;
        case '11-20': return hours >= 11 && hours <= 20;
        case '21-40': return hours >= 21 && hours <= 40;
        case '40+': return hours > 40;
        default: return true;
      }
    }).length;
  };

  const getLanguageCount = (language: string) => {
    return allCourses.filter(course => course.language === language).length;
  };

  const getFeatureCount = (feature: string) => {
    return allCourses.filter(course => {
      switch (feature) {
        case 'certificate': return course.hasCertificate;
        case 'quizzes': return course.hasQuizzes;
        case 'subtitles': return course.hasSubtitles;
        default: return true;
      }
    }).length;
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
    selectedLevels.length > 0 || 
    selectedPrice.length > 0 || 
    rating !== null || 
    selectedDuration.length > 0 || 
    selectedLanguage.length > 0 || 
    selectedFeatures.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCategories.length + selectedLevels.length + selectedPrice.length + 
                   (rating ? 1 : 0) + selectedDuration.length + selectedLanguage.length + selectedFeatures.length}
                </Badge>
              )}
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters Sidebar */}
          <div className={cn(
            "lg:w-80 space-y-6",
            isMobileFiltersOpen ? "block" : "hidden lg:block"
          )}>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-brand-600 hover:text-brand-700"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Search */}
                <FilterSection title="Search" defaultOpen={true}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </FilterSection>

                {/* Categories */}
                <FilterSection title="Categories">
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <FilterCheckbox
                        key={category}
                        id={`category-${category}`}
                        label={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        count={getCategoryCount(category)}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Level */}
                <FilterSection title="Level">
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <FilterCheckbox
                        key={level}
                        id={`level-${level}`}
                        label={level}
                        checked={selectedLevels.includes(level)}
                        onChange={() => toggleLevel(level)}
                        count={getLevelCount(level)}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Price */}
                <FilterSection title="Price">
                  <div className="space-y-2">
                    {priceOptions.map((option) => (
                      <FilterCheckbox
                        key={option.value}
                        id={`price-${option.value}`}
                        label={option.label}
                        checked={selectedPrice.includes(option.value)}
                        onChange={() => togglePrice(option.value)}
                        count={getPriceCount(option.value)}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Rating */}
                <FilterSection title="Rating">
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((ratingValue) => (
                      <FilterCheckbox
                        key={ratingValue}
                        id={`rating-${ratingValue}`}
                        label={`${ratingValue}+ stars`}
                        checked={rating === ratingValue}
                        onChange={() => setRating(rating === ratingValue ? null : ratingValue)}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Duration */}
                <FilterSection title="Duration">
                  <div className="space-y-2">
                    {durationOptions.map((option) => (
                      <FilterCheckbox
                        key={option.value}
                        id={`duration-${option.value}`}
                        label={option.label}
                        checked={selectedDuration.includes(option.value)}
                        onChange={() => toggleDuration(option.value)}
                        count={getDurationCount(option.value)}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Language */}
                <FilterSection title="Language">
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <FilterCheckbox
                        key={lang}
                        id={`language-${lang}`}
                        label={lang}
                        checked={selectedLanguage.includes(lang)}
                        onChange={() => toggleLanguage(lang)}
                        count={getLanguageCount(lang)}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Features */}
                <FilterSection title="Features">
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <FilterCheckbox
                        key={feature.value}
                        id={`feature-${feature.value}`}
                        label={feature.label}
                        checked={selectedFeatures.includes(feature.value)}
                        onChange={() => toggleFeature(feature.value)}
                        count={getFeatureCount(feature.value)}
                      />
                    ))}
                  </div>
                </FilterSection>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {totalResults} courses found
                  </h1>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <span>Filters applied</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-4 w-4 p-0 hover:bg-transparent"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "best-match" | "highest-rated" | "newest" | "price-low-high" | "price-high-low")}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option value="best-match">Best Match</option>
                    <option value="highest-rated">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>

                  {/* View Toggle - Desktop */}
                  <div className="hidden lg:flex items-center space-x-1 border border-gray-300 rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                      aria-label="Grid view"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className={cn(
                "grid gap-6",
                viewMode === 'grid' 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              )}>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <CourseCard
                    key={index}
                    course={{} as Course}
                    isLoading={true}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : paginatedCourses.length > 0 ? (
              <div className={cn(
                "grid gap-6",
                viewMode === 'grid' 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              )}>
                {paginatedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </Container>

    </div>
  );
}
