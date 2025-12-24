'use client';

import { Box } from '@mui/material'
import React from 'react'

const EventCount = ({ id }) => {
  return (
    <Box
      sx={{
        border: '1px solid transparent',
        borderRadius: '50px',
        px: 3,
        py: 1,
        mt: 0,
        mb: 5,
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        width: "20%",
        background: 'linear-gradient(#0c1217, #0c1217) padding-box, linear-gradient(270deg, #010a10, #37abff) border-box'
      }}
    >
      {id}
    </Box>
  )
}
export default EventCount