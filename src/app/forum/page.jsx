import { fetchQuestionsData } from "@/services/fetch_data_from_firestore";
import CommunityClient from "./CommunityClient";

export default async function CommunityPage() {
  const questions = await fetchQuestionsData();
  return <CommunityClient questions={questions} />;
}
