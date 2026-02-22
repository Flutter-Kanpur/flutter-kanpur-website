import TeamMemberCard from '@/v2components/TeamMemberCard'
import { Box } from '@mui/material'
import React from 'react'

const OurTeamSection = ({ firstRow, secondRow }) => {
    return (
        <Box>
            <h2>Our Team</h2>
            <Box className="team-scroll-container">
                <Box className="scroll-row">
                    <Box className="scroll-track">
                        {[...firstRow, ...firstRow].map((m) => (
                            <TeamMemberCard key={m.id} {...m} />
                        ))}
                    </Box>
                </Box>

                <Box className="scroll-row">
                    <Box className="scroll-track reverse">
                        {[...secondRow, ...secondRow].map((m) => (
                            <TeamMemberCard key={m.id} {...m} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default OurTeamSection
