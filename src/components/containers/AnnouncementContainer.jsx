import { Box, Typography } from '@mui/material';
import React from 'react';
import TagContainer from './TagContainer';
import styles from '../carousel/announcementCarousel.module.css'; // Assuming you have a CSS module for styles

const AnnouncementContainer = ({
    tag = "Announcement",
    title,
    bodyText,
    style = {},
}) => {
    return (
        <Box className={styles.announcementContainerParent} sx={{ ...style }}>
            <Box className={styles.announcementContainer}>
                <TagContainer tag={tag} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', lineHeight: '24px', }}>
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#FFFFFF', lineHeight: '24px', }}  >
                        {bodyText}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AnnouncementContainer; 