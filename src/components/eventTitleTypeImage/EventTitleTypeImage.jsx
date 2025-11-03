'use client';

import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image';

const EventTitleTypeImage = ({ title, type, image }) => {
  return (<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, bgcolor: '#010A10', }}>
    <Box sx={{display: "flex", justifyContent: "flex-start", alignContent: 'flex-start', pb: 3}}>
      <Image
        src={image}
        alt="Event Banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "300px",
          // objectFit: "cover",
        }}
      />
    </Box>

    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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