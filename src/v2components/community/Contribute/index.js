import React from 'react';
import { Box, Typography } from "@mui/material";

import ContributeCard from '@/v2components/ContributeCard';


const ContributeSection = () => {
  return (
    <Box sx={{ marginTop: "24px" }}>
      <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: "#000", marginBottom: '12px' }}>Contribute</Typography>
      <Box className="contribute-grid">
        <ContributeCard
          tagLabel="Open to all"
          tagVariant="blue"
          title="Upload Your Projects"
          description="Share your projects with the community to showcase your work."
          href="/project"
          bigCard={false}
        />
        <Box className="contribute-right">
          <ContributeCard
            tagLabel="Write for us"
            tagVariant="blue"
            description="Submit a blog request and contribute content that helps the community grow."
            href="/startwriting"
            bigCard={true}

          />
          <ContributeCard
            tagLabel="Get Involved"
            tagVariant="blue"
            description="Join as a Contributor."
            href="/contributor"
            bigCard={true}

          />
        </Box>
      </Box>
    </Box>
  )
}

export default ContributeSection
