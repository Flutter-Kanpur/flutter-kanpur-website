import { fetchAllSlugs, fetchQuestionsData } from "@/services/fetch_data_from_firestore";
import CommunityClient from "./CommunityClient";

export async function generateStaticParams() {
  try {
    const slugs = await fetchAllSlugs();
    if (!Array.isArray(slugs)) return [];

    return slugs
      .filter(Boolean)           // remove undefined/null
      .map((slug) => ({ slug: [String(slug)] })); // always array of strings
  } catch (err) {
    console.error("Error generating static params:", err);
    return [];
  }
}


export default async function CommunityPage({ params }) {
  const slugArray = Array.isArray(params?.slug) ? params.slug : [];

  if (!slugArray.length) {
    console.warn("Missing slug, returning empty questions array.");
    return <CommunityClient questions={[]} />;
  }

  let questions = [];
  try {
    questions = await fetchQuestionsData({ id: slugArray[0] });
  } catch (err) {
    console.error("Error fetching questions:", err);
    questions = [];
  }

  return <CommunityClient questions={questions} />;
}
