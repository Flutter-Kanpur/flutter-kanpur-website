'use client';

import { Box, Typography, Grid, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import { BorderAllRounded, FitScreen } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import { Twitter, LinkedIn } from '@mui/icons-material';

const EventHost = ({ host_image, host_name }) => {
  return (
        <Box 
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
        >
            <Typography variant='h2' sx={{ color: "#42c2c2", fontWeight: 'bold' }}>Hosts</Typography>

          <Box sx={{ display: "flex", flexDirection: 'column', gap: 3, alignItems: 'center', mt: 2 }}>
            <Image src={host_image} alt={host_name} height={140} width={140} style={{ borderRadius: "50%" }} />
            <Box sx={{ display: "flex", flexDirection: 'column', gap: 1, alignItems: 'center' }}>
              <Typography sx={{ color: "#fffff", fontSize: '24px' }}>
                {host_name}
              </Typography>          
            </Box>
          </Box>   
        </Box>
    
  );
};
export default EventHost;