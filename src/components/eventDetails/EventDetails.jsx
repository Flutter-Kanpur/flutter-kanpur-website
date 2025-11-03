'use client';

import { Box, Typography } from '@mui/material'
import React from 'react'

const EventDetails = ({short_description,description}) => {
    const extraText = description.replace(short_description, "").trim();

    return (

        <Box >
              <Typography variant="body1" sx={{ mb: 2,fontSize: '20px' }}>
                {short_description}
              </Typography>

              <Typography variant="body1" sx={{ mb: 2 , fontSize: '20px' }}>
                {extraText}
              </Typography>
              

            </Box>
    )
}
export default EventDetails