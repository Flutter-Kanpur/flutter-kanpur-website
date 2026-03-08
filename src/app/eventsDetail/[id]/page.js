import DetailCard from '@/v2components/EventDetailPageComponents/DetailCard'
import LeftParComponent from '@/v2components/EventDetailPageComponents/LeftPart'
import PaddingContainer from '@/v2components/PaddingContainer'
import { Box } from '@mui/material'
import React from 'react'

const index = () => {
    return (
        <PaddingContainer style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '100px' }}>
            <LeftParComponent />
            <DetailCard />
        </PaddingContainer>
    )
}

export default index
