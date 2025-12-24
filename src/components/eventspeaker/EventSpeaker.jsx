'use client';

import { Box, Typography, Grid, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import { BorderAllRounded, FitScreen } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import { Twitter, LinkedIn } from '@mui/icons-material';

const EventSpeaker = ({ speaker_image, speaker_name, speaker_intro, speaker_twitter, speaker_linkedin }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
    >
      <Typography variant='h3' sx={{ color: "#42c2c2", fontWeight: 'bold' }}>Speakers</Typography>

      <Box sx={{ display: "flex", flexDirection: 'column', gap: 3, alignItems: 'center', mt: 2 }}>

        <Image src={speaker_image} alt={speaker_name} height={180} width={180} style={{ borderRadius: "50%" }} />

        <Box sx={{ display: "flex", flexDirection: 'column', gap: 1, alignItems: 'center' }}>

          <Typography sx={{ color: "#3fd1ff", fontSize: '24px' }}>
            {speaker_name}
          </Typography>

          <Typography sx={{ color: "#ffffffr", fontSize: '14px', }} >
            {speaker_intro}
          </Typography>

          <Stack direction="row" >
            {speaker_linkedin && (
              <a href={speaker_linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <LinkedIn sx={{ fontSize: 30, color: '#64A9DD' }} />
                </IconButton>
              </a>
            )}

            {speaker_twitter && (
              <a
                href={speaker_twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <Twitter sx={{ fontSize: 30, color: '#64A9DD' }} />
                </IconButton>
              </a>
            )}

          </Stack>
        </Box>
      </Box>
    </Box>

  );
};
export default EventSpeaker;