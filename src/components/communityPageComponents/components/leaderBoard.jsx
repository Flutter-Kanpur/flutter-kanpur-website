import React from 'react';
import styles from "../../communityPageComponents/css/communityPage.module.css";
// import avatar1 from '../../assets/pic1.png';
// import avatar2 from '../../assets/pic2.png';
// import avatar3 from '../../assets/pic3.png';

const Leaderboard = () => {
  return (
    <div className={styles.leaderboard_container}>
      <div className={styles.leaderboard_title_glow}>
        <span className={styles.leaderboard_title_text}>Leaderboard</span>
      </div>

      <div className={styles.leaderboard_entry}>
        <span className={styles.rank_gold}>1</span>
        <img src={"avatar1"} alt="Sarah" className={styles.leaderboard_avatar} />
        <div className={styles.leaderboard_user}>
          <span className={styles.name}>Sarah K.</span>
          <span className={styles.points}>1250 Points</span>
        </div>
      </div>
      <hr />

      <div className={styles.leaderboard_entry}>
        <span className={styles.rank_silver}>2</span>
        <img src={"avatar2"} alt="Emma" className={styles.leaderboard_avatar} />
        <div className={styles.leaderboard_user}>
          <span className={styles.name}>Emma Wilson</span>
          <span className={styles.points}>1236 Points</span>
        </div>
      </div>
      <hr />

      <div className={styles.leaderboard_entry}>
        <span className={styles.rank_bronze}>3</span>
        <img src={"avatar3"} alt="John" className={styles.leaderboard_avatar} />
        <div className={styles.leaderboard_user}>
          <span className={styles.name}>John K.</span>
          <span className={styles.points}>1210 Points</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
