import React from "react";
import styles from "../../communityPageComponents/css/communityPage.module.css";

const members = [
  { id: 1, name: "John K", role: "UI/UX Designer", img: "/images/john.png" },
  { id: 2, name: "John K", role: "UI/UX Designer", img: "/images/john.png" },
  { id: 3, name: "John K", role: "UI/UX Designer", img: "/images/john.png" },
];

const ActiveMembers = () => {
  return (
    <div className={styles.active_members_container}>
      {/* Active Members Button */}
      <div className={styles.active_members_btn}>Active Members</div>

      {/* Members Cards */}
      <div className={styles.members_grid}>
        {members.map((member) => (
          <div className={styles.member_card} key={member.id}>
            <img src={member.img} alt={member.name} className={styles.member_img} />
            <h3 className={styles.member_name}>{member.name}</h3>
            <p className={styles.member_role}>{member.role}</p>
            <button className={styles.view_btn}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveMembers;
