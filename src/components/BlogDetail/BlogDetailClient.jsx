'use client';

import Link from 'next/link';
import { Box, Typography, Button, Card, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BlogDetailClient() {
  return (
    <Stack spacing={3} alignItems="center" mt={2}>

      {/* Write Card */}
      <Card
        sx={{
          width: '100%',
          maxWidth: 320,
          p: 2.5,
          borderRadius: 3,
          textAlign: 'center',
          background: '#eef2ff',
          boxShadow: 'none',
        }}
      >
        <Typography fontWeight={600} fontSize={16}>
          Want to write for us?
        </Typography>

        <Typography fontSize={13} color="#6b7280" mt={1}>
          Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.
        </Typography>

        <Button
          component={Link}
          href="/blog2"
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: 5,
            textTransform: 'none',
            background: '#000',
            '&:hover': { background: '#111' },
          }}
        >
          Start writing
        </Button>
      </Card>
    </Stack>
  );
}
