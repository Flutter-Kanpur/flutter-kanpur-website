import FooterComponent from '@/v2components/FooterComponent'
import ExploreCategoriesSection from '@/v2components/landingPageComponents/ExploreCategories'
import ExploreEventsSection from '@/v2components/landingPageComponents/ExploreEventsSection'
import FAQSection from '@/v2components/landingPageComponents/FAQSection'
import HeroSection from '@/v2components/landingPageComponents/HeroSectionV2'
import PastSpeakerSection from '@/v2components/landingPageComponents/PastSpeakerSection'
import ReadyToGrowSection from '@/v2components/landingPageComponents/ReadyToGrowSection'
import PaddingContainer from '@/v2components/PaddingContainer'
import { Box } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '130px' }}>
            <HeroSection />
            <PaddingContainer style={{ display: 'flex', flexDirection: 'column', gap: '130px' }}>
                <ExploreEventsSection />
                <PastSpeakerSection />
                <ExploreCategoriesSection />
                <FAQSection />
                <ReadyToGrowSection />
                <FooterComponent />
            </PaddingContainer>
        </Box>
    )
}

export default page
