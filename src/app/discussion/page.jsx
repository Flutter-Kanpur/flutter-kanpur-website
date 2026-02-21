import PageHeader from "@/v2components/PageHeader";
import BottomNav from "@/v2components/BottomNav";
import QuestionCard from "@/v2components/QuestionCard";
import FilterCard from "@/v2components/FilterCard";
import ShadowButton from "@/v2components/ShadowButton";
import Link from "next/link";
import { fetchQuestionsData } from "@/services/fetch_data_from_firestore";
import "./styles.css";
import { ArrowRight } from "lucide-react";

export default async function Page() {
  const questions = await fetchQuestionsData();

  return (
    <div className="discussion-container">
      <PageHeader title="Discussion" showBack showMore />

      <div className="content-wrapper">
        <Link href="/askquestion" className="no-link-style">
          <ShadowButton text="Start a new Discussion" iconafter={<ArrowRight size={16}/>} />
        </Link>

        <div className="filter-row">
          <FilterCard label="Filters" isFilter />
          <FilterCard label="Trending" active />
          <FilterCard label="Active" />
          <FilterCard label="Unanswered" />
        </div>

        <p className="question-count">
          {questions?.length || 0} questions
        </p>

        <div className="discussion-list">
          {questions?.map((q) => (
            <QuestionCard
              key={q.id}
              {...q}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
