import { Box, Typography, Card, Button } from '@mui/material';

export default function CTASection({ styles }) {
  return (
    <Box className={styles.ctaSectionWrapper}>
      <Card className={styles.ctaSectionBox}>
        <Box component="img" src="/images/cta-circles.svg" alt="Team members illustration" style={{ width: '280px', height: '40px' }} />
        <Box className={styles.ctaContentBox}>
          <Typography className={styles.ctaTitle}>
            Want to Be Part of the Team?
          </Typography>
          <Typography className={styles.ctaSubtitle}>
            We're always looking for passionate contributors, mentors, and organizers to help grow the Flutter Kanpur community.
          </Typography>
        </Box>
        <Button className={styles.ctaButton}>
          Become a Contributor
        </Button>
      </Card>
    </Box>
  );
}
