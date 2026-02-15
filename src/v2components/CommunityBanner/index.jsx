"use client";
import UserAvatar from "@/v2components/UserAvatar";
import {useRouter} from 'next/navigation'
import "./styles.css";

const CommunityBanner = ({ onAskQuestion }) => {
  const avatarNames = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
  const router = useRouter();

  return (
    <div className="community-banner">
      <h3 className="banner-title">
        Confused about where to start?
      </h3>

      <div className="avatar-group">
        {avatarNames.map((name) => (
          <UserAvatar
            key={name}
            name={name}
            size="md"
            className="banner-avatar"
          />
        ))}
      </div>

      <p className="banner-text">
        Ask questions, share ideas, or help others by starting a conversation with the community.
      </p>

      <button
        onClick={()=>router.push('/askquestion')}
        className="banner-button"
      >
        Ask a question
      </button>
    </div>
  );
};

export default CommunityBanner;
