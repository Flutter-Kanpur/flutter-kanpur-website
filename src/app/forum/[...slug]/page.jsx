import { fetchQuestionsData } from "@/services/fetch_data_from_firestore";
import CommunityClient from "./CommunityClient";

export default async function CommunityPage({ params }) {

  const data = await params;
  console.log(data.slug[0], "id");
  const questions = await fetchQuestionsData({ id: data.slug[0] });
  console.log(questions, "questions");
  return <CommunityClient questions={questions} />;
}
