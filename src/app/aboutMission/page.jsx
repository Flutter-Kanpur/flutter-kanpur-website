'use client';

import FooterComponent from '../../v2components/FooterComponent';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import styles from './aboutMission.module.css';

export default function AboutTeamPage() {
  return (
    <div className={styles.aboutTeamContainer}>
      <main className={styles.headerSection}>
        <h1 className={styles.title}>
          Empowering Developers.Strengthening
          <span className={styles.headingBreak}></span>
        Community.Shaping the Future of Flutter 
        </h1>
        <div className={styles.contentBox}>
          <p className={styles.description}>
Flutter Kanpur was founded with a simple but powerful belief — growth happens faster when people learn together. What started as a small initiative to connect Flutter enthusiasts has evolved into a structured, collaborative ecosystem focused on skill development, knowledge sharing, and community-driven innovation.         </p>
          <p className={styles.description + ' ' + styles.paragraphGap}>
We are not just organizing events. We are building a platform where developers build confidence, credibility, and capability.            </p>
        </div>
        {/* Mission Section */}
        <section className={styles.missionSection}>
          <h2 className={styles.missionHeading}>
            To create a practical, inclusive, and growth-driven platform for Flutter developers.
          </h2>
          
          <div className={styles.missionDescription}>
            <p>Our mission is centered around enabling real-world skill development through community engagement. We aim to provide structured opportunities that go beyond passive learning.</p>
          </div>
          
          <div className={styles.missionItems}>
            {[1, 2, 3, 4, 5].map((num) => (
              <div className={styles.missionItem} key={num}>
                <div className={styles.missionNumber}>01</div>
                <div className={styles.missionItemContent}>
                  <h3 className={styles.missionItemTitle}>Make Learning Practical</h3>
                  <p className={styles.missionItemText}>
                    Encourage hands-on development through coding contests, daily challenges, hackathons, and project submissions.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Core Values Section */}
        <section className={styles.coreValuesSection}>
          <h2 className={styles.coreValuesHeading}>Our Core Values</h2>
          
          <div className={styles.coreValuesGrid}>
            {[1, 2, 3, 4, 5].map((num) => (
              <div className={styles.coreValueCard} key={num}>
                <h3 className={styles.coreValueTitle}>Continuous Learning</h3>
                <p className={styles.coreValueDescription}>
                  Growth never stops. Every event, discussion, and challenge is designed to encourage progress.
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Impact Section */}
        <section className={styles.impactSection}>
          <h2 className={styles.impactHeading}>Our Impact So Far</h2>
          
          <div className={styles.impactStatsGrid}>
            {[1, 2, 3, 4].map((num) => (
              <div className={styles.impactStatCard} key={num}>
                <div className={styles.impactNumber}>1,200+</div>
                <div className={styles.impactLabel}>Community Members</div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Mission Statement with Mascots */}
        <section className={styles.missionStatementSection}>
          <div className={styles.missionContent}>
            <div className={styles.missionTextContainer}>
              <ScrollReveal delay={0}>
                <h2 className={styles.missionStatementHeading}>
                  To build one of the most active, respected, and skill-driven Flutter communities.
                </h2>
              </ScrollReveal>
              
              <div className={styles.missionPointsWrapper}>
                <div className={styles.blueBar}></div>
                <div className={styles.missionPoints}>
                <ScrollReveal delay={100}>
                  <div className={styles.missionPoint}>
                    <div className={styles.pointLabel}>A Self-Sustaining Learning Ecosystem</div>
                    <div className={styles.pointDescription}>
                      A platform where members teach, mentor, and uplift each other.
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <div className={styles.missionPoint}>
                    <div className={styles.pointLabel}>Recognized Community Talent</div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={300}>
                  <div className={styles.missionPoint}>
                    <div className={styles.pointLabel}>Recognized Community Talent</div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={400}>
                  <div className={styles.missionPoint}>
                    <div className={styles.pointLabel}>Recognized Community Talent</div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={500}>
                  <div className={styles.missionPoint}>
                    <div className={styles.pointLabel}>Recognized Community Talent</div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={600}>
                  <div className={styles.missionPoint}>
                    <div className={styles.pointLabel}>Recognized Community Talent</div>
                  </div>
                </ScrollReveal>
              </div>
              </div>
            </div>
            
            <div className={styles.mascotImageContainer}>
              <ScrollReveal delay={200}>
                <img 
                  src="/images/mascots.png" 
                  alt="Flutter Kanpur Mascots" 
                  className={styles.mascotImage}
                />
              </ScrollReveal>
            </div>
          </div>
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
