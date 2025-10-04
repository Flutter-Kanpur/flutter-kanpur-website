'use client';

import { Box, Typography } from '@mui/material';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';



const WriteBlog = () => {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        py: 8,
        px: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        color: 'white',
        width: "100%",
        background: "#0c1217",
        borderRadius: "10px"
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Submit a Blog
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Typography color='#898989' sx={{ width: "70%" }}>
          We're always excited to hear from developers, designers, and innovators who want to share their knowledge and experiences with our community.,
        </Typography>
        <ApplyNowButton
          disabled={false}
          onClick={() => window.open('https://forms.gle/WFXgvqxuBzZCTqJh9', '_blank')}
          text='Submit A BLOG'
          fontSize='10px'
        />
      </Box>
    </Box>

  );
};
export default WriteBlog;