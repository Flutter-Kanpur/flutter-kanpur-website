import UserAvatar from "@/v2components/UserAvatar";
import "./styles.css";

const TeamMemberCard = ({ name, tagline, photoURL }) => {
  return (
    <div className="team-member-card">
      
      <UserAvatar 
        name={name} 
        size="md" 
        imageUrl={photoURL}   // ✅ pass photo
      />

      <div className="team-member-info">
        <p className="team-member-name">{name}</p>
        {/* <p className="team-member-role">{tagline}</p> */}
      </div>
    </div>
  );
};

export default TeamMemberCard;
