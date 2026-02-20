import PageHeader from "@/v2components/PageHeader";
import BottomNav from "@/v2components/BottomNav";
import TagBadge from "@/v2components/TagBadge";
import UserAvatar from "@/v2components/UserAvatar";
import ResponseCard from "@/v2components/ResponseCard";
import ShadowButton from "@/v2components/ShadowButton";
import Link from "next/link";
import "./styles.css";
import DiscussionDetailClient from "./DiscussionDetailClient";
import { ArrowRight } from "lucide-react";

import { fetchQuestionById } from "@/services/fetch_data_from_firestore";
import ResponseInput from "@/v2components/ResponseInput";

  export default async function DiscussionDetailPage(props) {
  const params = await props.params;
  const id = params?.id;

  console.log("Dynamic Page ID:", id);

  if (!id) {
    return <div>Invalid ID</div>;
  }

  const question = await fetchQuestionById(id);

  if (!question) {
    return <div>Question not found</div>;
  }


  return (
    <div className="discussion-detail-container">
      <PageHeader title="Discussion" showBack showMore />

      <div className="content-wrapper">
        <Link href="/askquestion" className="no-link-style">
                  <ShadowButton text="Start a new Discussion" iconafter={<ArrowRight size={16}/>}/>
                </Link>
        <h2 className="discussion-title">
          {question.title}
        </h2>

        <div className="tag-row">
          {question.tags?.map((tag) => (
            <TagBadge key={tag} label={tag} variant="blue"/>
          ))}
        </div>

        <p className="discussion-description">
          {question.body}
        </p>

        {/* Author */}
        <div className="author-section">
          <UserAvatar
            name={question.author?.name || "Anonymous"}
            size="sm"
          />
          <div>
            <p className="author-name">
              {question.author?.name || "Anonymous"}
            </p>
            <p className="author-time">
              {new Date(question.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Responses */}
        <div className="responses-section">
          <h3 className="responses-title">
            Responses {question.answers.length}
          </h3>
          
          <ResponseInput questionId={question.id}/>
        </div>

        
        <DiscussionDetailClient question={question} />


      </div>

      <BottomNav />
    </div>
  );
}
