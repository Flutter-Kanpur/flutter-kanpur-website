'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav/BottomNav';

export default function SuccessPage() {
  return (
    <Box
      sx={{
        maxWidth: 393,
        mx: 'auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pb: '110px',
      }}
    >
      <Typography fontSize={22} fontWeight={600}>
        Application submitted
      </Typography>

      <Typography mt={1} color="#6b7280" textAlign="center" px={3}>
        Thank you for applying. Our team will review your application.
      </Typography>

      <Link href="/opencalls" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          sx={{ mt: 3, borderRadius: 6, textTransform: 'none' }}
        >
          Back to open calls
        </Button>
      </Link>

      <BottomNav activeTab="explore" />
    </Box>
  );
}
