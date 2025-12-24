'use client';

import { Box, Typography } from '@mui/material'
import React from 'react'

const EventTitleTypeImage = ({ title, type, image }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, bgcolor: '#010A10', width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", alignContent: 'flex-start', pb: 3, width: "100%", maxWidth: "1210px", maxHeight: "400px" }}>
        <img src={image} alt="Event Banner" style={{ width: "100%", aspectRatio: 1, borderRadius: "8px" }} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            background: 'linear-gradient(0deg, #64a9dd, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0.8,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            color: '#fff',
            border: '1px solid',
            borderColor: 'transparent',
            background:
              'linear-gradient(#0c1217, #0c1217) padding-box, linear-gradient(0deg, #64a9dd, #fff) border-box',
            fontSize: '1rem',
            px: 2,
            py: 0.5,
            borderRadius: 9,
            width: 'fit-content',
          }}>
          <Typography>
            {type}
          </Typography>
        </Box>
      </Box>
    </Box>

  )
}
export default EventTitleTypeImage