import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CustomButton from '../buttons/customNavbarButton/customButton';
import Image from 'next/image';

const navItems = [
    { index: 1, text: "Home" },
    { index: 2, text: "Jobs" },
    { index: 3, text: "Community" },
    { index: 4, text: "Events" },
];

const NavbarComponent = () => {
    let light = true; // This can be toggled based on user preference or state
    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", }}>
            <Image src="/landingPageIcons/flutter_icon.svg" height={56} width={56} />
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "14.4px" }}>
                {navItems.map((item, index) => (
                    <CustomButton key={item.index} selected={item.index === 1} text={item.text} />
                ))}
                <CustomButton selected={false} text={light === true ? "Light" : "Dark"} icons={true} light={true} />
                <NotificationsIcon style={{ cursor: "pointer", color: "#E5E8EC", fontSize: 20 }} />
            </Box>
        </Box>
    )
}

export default NavbarComponent
