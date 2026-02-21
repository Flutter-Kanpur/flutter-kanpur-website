'use client';

import { Box, Typography } from '@mui/material';

export default function EmptyState({
  title = 'Nothing here',
  subtitle = '',
}) {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography fontWeight={600}>{title}</Typography>

      <Typography color="#6b7280" mt={1} maxWidth={260}>
        {subtitle}
      </Typography>
    </Box>
  );
}
