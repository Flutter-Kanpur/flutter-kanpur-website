'use client';

import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image';

const EventTitleDateTimeImage = ({ title, date, time, image }) => {
  return (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
    <div style={{ height: "200px", overflow: "hidden" }}>
  <Image
    src={image}
    alt="Event Banner"
    width={0}
    height={0}
    sizes="100vw"
    style={{
      width: "200%",
      height: "auto",
      objectFit: "contain",
    }}
  />
<Image
      src={image}
      alt="Event Banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "200%",      
          height: "auto",     
          objectFit: "contained",  
          borderRadius: "8px"
        }}
    />
    </div>
    
    <Box>
      <Typography
        variant="h5"
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
      <br />
      <Typography variant="body2" sx={{ color: '#415360' }}>
        {date}
        <br />
        {/* {time} */}
      </Typography>
    </Box>
  </Box>

  )
}
export default EventTitleDateTimeImage