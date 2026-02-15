"use client";

import { Heart, MessageCircle, Bookmark } from "lucide-react";
import UserAvatar from "@/v2components/UserAvatar";
import TagBadge from "@/v2components/TagBadge";
import { useRouter } from "next/navigation";
import "./styles.css";

const DiscussionCard = (props) => {
  const {
    id,
    title,
    body,
    author,
    tags = [],
    answers = [],
    views = 0,
    createdAt,
    variant = "default",
    onClick,
  } = props;

   const router = useRouter();
  const timeAgo = "Recently"; // you can improve later
  const likes = views; // temporary mapping
  const comments = answers.length;
  const bookmarks = 0;

  const formattedDate = createdAt
  ? createdAt.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : "";

    const handleClick = () => {
      router.push(`/discussiondetails/${id}`);
    };
    
  return (
    <div className="discussion-card" onClick={handleClick}>
      <div className="card-header">
        <UserAvatar name={author?.name || "Anonymous"} size="sm" />
        <div>
          <p className="author-name bold">
            {author?.name || "Anonymous"}
          </p>
          <p className="author-time">{formattedDate}</p>
        </div>
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-body">{body}</p>

      {tags.length > 0 && (
        <div className="card-tags">
          {tags.map((tag) => (
            <TagBadge key={tag} label={`#${tag}`} />
          ))}
        </div>
      )}

      <div className="card-footer">
        <span className="footer-item">
          <Heart size={14} /> {likes}
        </span>

        <span className="footer-item">
          <MessageCircle size={14} /> {comments}
        </span>

        <span className="footer-item bookmark">
          <Bookmark size={14} /> {bookmarks}
        </span>
      </div>
    </div>
  );
};

export default DiscussionCard;
