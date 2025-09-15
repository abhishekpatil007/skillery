import { notFound } from "next/navigation";
import { CourseDetail } from "@/types/course-detail";
import { CourseDetailContent } from "./CourseDetailContent";

// This would typically fetch from an API or database
async function getCourseDetail(slug: string): Promise<CourseDetail | null> {
  try {
    // Try to get detailed course data first
    const courseData = await import(`@/data/course-details/${slug}.json`);
    return courseData.default;
  } catch {
    // Fallback: create basic course detail from courses.json
    try {
      const coursesData = await import(`@/data/courses.json`);
      const course = coursesData.default.find((c: any) => c.slug === slug);
      
      if (!course) return null;
      
      // Create a basic CourseDetail from Course data
      return {
        id: course.id,
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle || "Learn essential skills and advance your career",
        instructor: course.instructor,
        rating: course.rating,
        ratingCount: course.ratingCount,
        studentsCount: course.ratingCount,
        price: course.price,
        lastUpdated: "2024-01-15",
        language: course.language,
        hasSubtitles: course.hasSubtitles,
        hasCertificate: course.hasCertificate,
        level: course.level,
        duration: `${course.hours} hours`,
        lectures: course.lectures,
        previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        previewVideoPoster: course.thumbnail,
        bestSeller: course.bestSeller,
        whatYouWillLearn: [
          "Master the fundamentals of this subject",
          "Build real-world projects and applications",
          "Understand industry best practices",
          "Gain practical hands-on experience",
          "Learn from expert instructors",
          "Earn a certificate of completion",
          "Access lifetime course updates",
          "Join a community of learners"
        ],
        includes: {
          hours: course.hours,
          articles: 10,
          resources: 15,
          lifetimeAccess: true,
          certificate: course.hasCertificate,
          mobileAccess: true,
          assignments: 8
        },
        requirements: [
          "Basic computer skills",
          "Internet connection",
          "Willingness to learn"
        ],
        description: course.description || "Comprehensive course covering all essential topics and practical applications.",
        curriculum: {
          totalSections: 8,
          totalLectures: course.lectures,
          totalDuration: course.hours,
          sections: []
        },
        reviews: []
      };
    } catch {
      return null;
    }
  }
}

interface CourseDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getCourseDetail(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailContent course={course} />;
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getCourseDetail(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} | Skillery`,
    description: course.shortDescription,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      images: [course.thumbnail],
    },
  };
}
