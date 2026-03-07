import FooterComponent from '../../v2components/FooterComponent';
import styles from './AboutTeam.module.css';

const TEAM_MEMBERS = Array.from({ length: 12 }).map(() => ({
  name: 'Angelica Singh',
  role: 'UI/UX Designer',
  img: '/assets/angie.png',
}));

const OTHER_MEMBERS = Array.from({ length: 15 }).map(() => ({
  name: 'Angelica Singh',
  role: 'UI/UX Designer',
}));

export default function AboutTeamPage() {
  return (
    <div className={styles.aboutTeamContainer}>
      <main className={styles.headerSection}>
        <h1 className={styles.title}>
          The People Driving Flutter
          <span className={styles.headingBreak}></span>
          Kanpur Forward
        </h1>
        <div className={styles.contentBox}>
          <p className={styles.description}>
            Flutter Kanpur is powered by a passionate group of developers, designers, organizers, and mentors who believe in building a strong and inclusive Flutter ecosystem. Our team works behind the scenes to organize events, curate technical content, manage community initiatives, and create meaningful learning opportunities for developers at every stage of their journey.
          </p>
          <p className={styles.description + ' ' + styles.paragraphGap}>
            From hosting workshops and hackathons to reviewing project submissions and mentoring beginners, the team is committed to fostering collaboration, innovation, and continuous growth. Together, we aim to create a platform where learning is practical, contributions are recognized, and every member feels empowered to grow.
          </p>
        </div>
        <h2 className={styles.meetTeamTitle}>Meet Our Team</h2>
        <section className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member, idx) => (
            <div className={styles.memberCard} key={idx}>
              <img src={member.img} alt={member.name} className={styles.memberImg} />
              <div className={styles.memberName}>{member.name}</div>
              <div className={styles.memberRole}>{member.role}</div>
            </div>
          ))}
        </section>
        
        <h2 className={styles.meetTeamTitle}>Other members</h2>
        <section className={styles.teamGrid}>
          {OTHER_MEMBERS.map((member, idx) => (
            <div className={styles.memberCard} key={idx}>
              <div className={styles.memberName}>{member.name}</div>
              <div className={styles.memberRole}>{member.role}</div>
            </div>
          ))}
        </section>
        
        <div className={styles.ctaSectionWrapper}>
          <div className={styles.ctaSectionBox}>
            {/* Visual Illustration */}
            <div className={styles.ctaCirclesRow}>
              {/* Colored Circles */}
              <div className={styles.ctaCirclesGroup}>
                {['#7B7BFF', '#28C04E', '#3D6BFF', '#F7E34E', '#D13431'].map((color, i) => (
                  <div
                    key={i}
                    className={styles.ctaCircle}
                    style={{ background: color, border: 'none' }}
                  />
                ))}
              </div>
              <span className={styles.ctaPlus}>+</span>
              {/* Dashed Circles */}
              <div className={styles.ctaCirclesGroup}>
                {[0, 1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className={styles.ctaCircle}
                    style={{ background: '#F5F5F5', border: '1px dashed #CCC' }}
                  />
                ))}
              </div>
            </div>
            {/* Content */}
            <div className={styles.ctaContentBox}>
              <div className={styles.ctaTitle}>
                Want to Be Part of the Team?
              </div>
              <div className={styles.ctaSubtitle}>
                We're always looking for passionate contributors, mentors, and organizers to help grow the Flutter Kanpur community.
              </div>
            </div>
            {/* CTA */}
            <button className={styles.ctaButton}>
              Become a Contributor
            </button>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
    
  );
}
