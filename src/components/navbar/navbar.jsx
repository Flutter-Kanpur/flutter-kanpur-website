'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CustomButton from '../buttons/customNavbarButton/customButton';
import Image from 'next/image';
import LoginDialog from '../dialogs/LoginDialog';
import SignupDialog from '../dialogs/SignupDialog';

const navItems = [
    { index: 1, text: "Home" },
    { index: 2, text: "Jobs" },
    { index: 3, text: "Community" },
    { index: 4, text: "Events" },
];

const NavbarComponent = () => {
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [signupDialogOpen, setSignupDialogOpen] = useState(false);

    const handleLoginClick = () => {
        setLoginDialogOpen(true);
    };

    const handleCloseLoginDialog = () => {
        setLoginDialogOpen(false);
    };

    const handleShowSignupDialog = () => {
        setSignupDialogOpen(true);
    };

    const handleCloseSignupDialog = () => {
        setSignupDialogOpen(false);
    };

    const handleShowLoginDialog = () => {
        setLoginDialogOpen(true);
    };

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                gap: { xs: 2, md: 0 },
                padding: "25px 58px 0 58px",
            }}>
                <Image src="/landingPageIcons/flutter_icon.svg" height={56} width={56} alt="Flutter Logo" />
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "14.4px" }}>
                    {navItems.map((item, index) => (
                        <CustomButton key={item.index} selected={item.index === 1} text={item.text} />
                    ))}
                    <CustomButton
                        selected={false}
                        text="Login"
                        onClick={handleLoginClick}
                    />
                    <NotificationsIcon style={{ cursor: "pointer", color: "#E5E8EC", fontSize: 20 }} />
                </Box>
            </Box>

            <LoginDialog
                open={loginDialogOpen}
                onClose={handleCloseLoginDialog}
                onShowSignup={handleShowSignupDialog}
            />

            <SignupDialog
                open={signupDialogOpen}
                onClose={handleCloseSignupDialog}
                onShowLogin={handleShowLoginDialog}
            />
        </>
    )
}

export default NavbarComponent
