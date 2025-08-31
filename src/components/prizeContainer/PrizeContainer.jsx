'use client';

import { Box, Typography } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';


const PrizeContainer = ({ title, subtitle, reward }) => {
    return (

        <Box
            variant='contained'
            sx={{
                Width: '100%',
                bgcolor: '#0f1c25',
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,

            }}
        >
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 4 }}>
                    <Box>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                            {subtitle}
                        </Typography>
                    </Box>
                    <Box>
                        {/* Icon */}
                        <CardGiftcardIcon style={{ color: '#1e90ff', fontSize: '50px' }} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        bgcolor: '#1E90FF',
                        p: 1.2,
                        borderRadius: 1,
                    }}
                >
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                        {reward}
                    </Typography>
                </Box>
            </Box>


        </Box>

    );
};
export default PrizeContainer;