import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseClient from "./CourseClient";
import { COURSES, getCourseBySlug } from "@/data/courses";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const course = getCourseBySlug(params.slug);
  if (!course) {
    return { title: "Course not found" };
  }
  return buildMetadata({
    title: course.title.en,
    description: course.shortDescription.en,
    path: `/academia/${course.slug}`,
  });
}

export default function CoursePage({ params }: Props) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();
  return <CourseClient slug={params.slug} />;
}
