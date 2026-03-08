import { Box, Typography } from '@mui/material';
import FooterComponent from '../../v2components/FooterComponent';
import CTASection from '../../components/common/CTASection';
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
    <Box className={styles.aboutTeamContainer}>
      <Box component="main" className={styles.headerSection}>
        <Typography variant="h1" className={styles.title}>
          The People Driving Flutter
          <Box component="span" className={styles.headingBreak}></Box>
          Kanpur Forward
        </Typography>
        <Box className={styles.contentBox}>
          <Typography className={styles.description}>
            Flutter Kanpur is powered by a passionate group of developers, designers, organizers, and mentors who believe in building a strong and inclusive Flutter ecosystem. Our team works behind the scenes to organize events, curate technical content, manage community initiatives, and create meaningful learning opportunities for developers at every stage of their journey.
          </Typography>
          <Typography className={styles.description + ' ' + styles.paragraphGap}>
            From hosting workshops and hackathons to reviewing project submissions and mentoring beginners, the team is committed to fostering collaboration, innovation, and continuous growth. Together, we aim to create a platform where learning is practical, contributions are recognized, and every member feels empowered to grow.
          </Typography>
        </Box>
        <Typography variant="h2" className={styles.meetTeamTitle}>Meet Our Team</Typography>
        <Box component="section" className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member, idx) => (
            <Box className={styles.memberCard} key={idx}>
              <Box component="img" src={member.img} alt={member.name} className={styles.memberImg} />
              <Typography className={styles.memberName}>{member.name}</Typography>
              <Typography className={styles.memberRole}>{member.role}</Typography>
            </Box>
          ))}
        </Box>
        
        <Typography variant="h2" className={styles.meetTeamTitle}>Other members</Typography>
        <Box component="section" className={styles.teamGrid}>
          {OTHER_MEMBERS.map((member, idx) => (
            <Box className={styles.memberCard} key={idx}>
              <Typography className={styles.memberName}>{member.name}</Typography>
              <Typography className={styles.memberRole}>{member.role}</Typography>
            </Box>
          ))}
        </Box>
        
        <CTASection styles={styles} />
      </Box>
      <FooterComponent />
    </Box>
    
  );
}
