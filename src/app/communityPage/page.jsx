import React from "react";
// import "./Community.css";
import styles from "@/components/communityPageComponents/communityPage.module.css";
import ActiveMembers from "@/components/communityPageComponents/ActiveMembers";
import Leaderboard from "@/components/communityPageComponents/LeaderBoard";
import FeaturedResources from "@/components/communityPageComponents/FeaturedResources";
import NavbarComponent from "@/components/navbar/navbar";
// import flutter_icon from "../../../public/landingPageIcons";
// import user1 from "../../assets/user1.png";
// import user2 from "../../assets/user2.png";
// import Leaderboard from "../../components/communityPageComponents/components/leaderBoard";
// import FeaturedResources from "../../components/communityPageComponents/components/featuredResouses";
// import ActiveMembers from "../../components/communityPageComponents/components/activeMembers";



const events = [
  {
    title: "Flutter 3.0 Migration Guide Discussion",
    desc: "Tips and tricks for smooth migration to Flutter 3.0",
    avatar: "user1",
  },
  {
    title: "State Management Best Practices",
    desc: "Comparing different state management solutions",
    avatar: "user2",
  }
]

const Community = () => {
  return (
    <div className={styles.community_container}>
      {/* ✅ Header */}
      {/* <header className={styles.community_header}>
        <img src={styles.flutter_logo} alt={styles.Flutter_Logo} className={styles.flutter_logo} />
        <div className={styles.menu_items}>
          <button className={styles.menu_btn}>Home</button>
          <button className={styles.menu_btn}>Jobs</button>
          <button className={styles.menu_btn_active}>Community</button>
          <button className={styles.menu_btn}>Events</button>
          <button className={styles.menu_btn}>Login</button>
        </div>
      </header> */}
      <NavbarComponent />

      {/* ✅ Main Content */}
      <section className={styles.community_section}>
        {/* Dashboard Button */}
        <div className={styles.dashboard_button}>Community Dashboard</div>
        <h1 className={styles.headline}>Connect. Collaborate. Grow.</h1>

        {/* ✅ Discussion + Leaderboard side by side */}
        <div className={styles.community_main_content}>
          <div className={styles.discussion_cards}>
            {events.map((item, i) => (
              <div className={styles.discussion_card} key={i}>
                <div className={styles.discussion_content}>
                  <div className={styles.discussion_text}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <img
                    src={item.avatar}
                    alt={styles.User}
                    className={styles.discussion_avatar}
                  />
                </div>
                <div className={styles.discussion_stats}>
                  <div className={styles.stat}>
                    <span className={styles.icon}>💬</span> 24 Replies
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.icon}>👁️</span> 24 Views
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Leaderboard on the right */}
          <Leaderboard />
        </div>

        <div className={styles.resources_members}>
          <FeaturedResources />
          <ActiveMembers />
        </div>
      </section>
    </div>
  );
};

export default Community;
