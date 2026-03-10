'use client';

import { Box, Typography, Card } from '@mui/material';
import FooterComponent from '../../v2components/FooterComponent';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import CTASection from '../../components/common/CTASection';
import styles from './aboutMission.module.css';

export default function AboutTeamPage() {
  return (
    <Box className={styles.aboutTeamContainer}>
      <Box component="main" className={styles.headerSection}>
        <Typography variant="h1" className={styles.title}>
          Empowering Developers.Strengthening
          <Box component="span" className={styles.headingBreak}></Box>
        Community.Shaping the Future of Flutter 
        </Typography>
        <Box className={styles.contentBox}>
          <Typography className={styles.description}>
Flutter Kanpur was founded with a simple but powerful belief — growth happens faster when people learn together. What started as a small initiative to connect Flutter enthusiasts has evolved into a structured, collaborative ecosystem focused on skill development, knowledge sharing, and community-driven innovation.         </Typography>
          <Typography className={styles.description + ' ' + styles.paragraphGap}>
We are not just organizing events. We are building a platform where developers build confidence, credibility, and capability.            </Typography>
        </Box>
        {/* Mission Section */}
        <Box component="section" className={styles.missionSection}>
          <Typography variant="h2" className={styles.missionHeading}>
            To create a practical, inclusive, and growth-driven platform for Flutter developers.
          </Typography>
          
          <Box className={styles.missionItems}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Box className={styles.missionItem} key={num}>
                <Box className={styles.missionNumber}>01</Box>
                <Box className={styles.missionItemContent}>
                  <Typography variant="h3" className={styles.missionItemTitle}>Make Learning Practical</Typography>
                  <Typography className={styles.missionItemText}>
                    Encourage hands-on development through coding contests, daily challenges, hackathons, and project submissions.
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        
        <Box component="section" className={styles.coreValuesSection}>
          <Typography variant="h2" className={styles.coreValuesHeading}>Our Core Values</Typography>
          
          <Box className={styles.coreValuesGrid}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Card className={styles.coreValueCard} key={num}>
                <Typography variant="h3" className={styles.coreValueTitle}>Continuous Learning</Typography>
                <Typography className={styles.coreValueDescription}>
                  Growth never stops. Every event, discussion, and challenge is designed to encourage progress.
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
        
        <Box component="section" className={styles.impactSection}>
          <Typography variant="h2" className={styles.impactHeading}>Our Impact So Far</Typography>
          
          <Box className={styles.impactStatsGrid}>
            {[1, 2, 3, 4].map((num) => (
              <Box className={styles.impactStatCard} key={num}>
                <Typography className={styles.impactNumber}>1,200+</Typography>
                <Typography className={styles.impactLabel}>Community Members</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        
        <Box component="section" className={styles.missionStatementSection}>
          <Box className={styles.missionContent}>
            <Box className={styles.missionTextContainer}>
              <ScrollReveal delay={0}>
                <Typography variant="h2" className={styles.missionStatementHeading}>
                  To build one of the most active, respected, and skill-driven Flutter communities.
                </Typography>
              </ScrollReveal>
              
              <Box className={styles.missionPointsWrapper}>
                <Box className={styles.blueBar}></Box>
                <Box className={styles.missionPoints}>
                <ScrollReveal delay={100}>
                  <Box className={styles.missionPoint}>
                    <Typography className={styles.pointLabel}>A Self-Sustaining Learning Ecosystem</Typography>
                    <Typography className={styles.pointDescription}>
                      A platform where members teach, mentor, and uplift each other.
                    </Typography>
                  </Box>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <Box className={styles.missionPoint}>
                    <Typography className={styles.pointLabel}>Recognized Community Talent</Typography>
                  </Box>
                </ScrollReveal>
                
                <ScrollReveal delay={300}>
                  <Box className={styles.missionPoint}>
                    <Typography className={styles.pointLabel}>Recognized Community Talent</Typography>
                  </Box>
                </ScrollReveal>
                
                <ScrollReveal delay={400}>
                  <Box className={styles.missionPoint}>
                    <Typography className={styles.pointLabel}>Recognized Community Talent</Typography>
                  </Box>
                </ScrollReveal>
                
                <ScrollReveal delay={500}>
                  <Box className={styles.missionPoint}>
                    <Typography className={styles.pointLabel}>Recognized Community Talent</Typography>
                  </Box>
                </ScrollReveal>
                
                <ScrollReveal delay={600}>
                  <Box className={styles.missionPoint}>
                    <Typography className={styles.pointLabel}>Recognized Community Talent</Typography>
                  </Box>
                </ScrollReveal>
              </Box>
              </Box>
            </Box>
            
            <Box className={styles.mascotImageContainer}>
              <ScrollReveal delay={200}>
                <Box
                  component="img" 
                  src="/images/mascots.png" 
                  alt="Flutter Kanpur Mascots" 
                  className={styles.mascotImage}
                />
              </ScrollReveal>
            </Box>
          </Box>
        </Box>
        
        <CTASection styles={styles} />
      </Box>
      <FooterComponent />
    </Box>
    
  );
}
