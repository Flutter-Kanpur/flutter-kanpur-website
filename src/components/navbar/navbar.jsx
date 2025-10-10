'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CustomButton from '../buttons/customNavbarButton/customButton';
import Image from 'next/image';
import LoginDialog from '../dialogs/LoginDialog';
import SignupDialog from '../dialogs/SignupDialog';
import { useRouter } from 'next/navigation';
import { useNavbar } from '@/contexts/NavbarContext';


const NavbarComponent = () => {

    const router = useRouter();
    const { selectedButton, updateSelectedButton } = useNavbar();

    const navItems = [
        { index: 1, text: "Home", onClick: () => router.push("/"), selected: selectedButton.Home },
        { index: 2, text: "Jobs", onClick: () => console.log("jobs clicked"), selected: selectedButton.Jobs },
        { index: 3, text: "Community", onClick: () => router.push("/communityPage"), selected: selectedButton.Community },
        { index: 4, text: "Events", onClick: () => router.push("/events"), selected: selectedButton.Events },
    ];

    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [signupDialogOpen, setSignupDialogOpen] = useState(false);

    const [signUpData, setSignUpData] = useState({
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
    })

    const [loginData, setloginData] = useState({
        email: "",
        password: "",
    })

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
                padding: "25px 58px 0 58px"
            }}>
                <Box 
                    onClick={() => router.push('/')} 
                    sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                            opacity: 0.8
                        }
                    }}
                >
                    <Image src="/landingPageIcons/flutter_icon.svg" height={56} width={56} alt="Flutter Logo" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "14.4px" }}>
                    {navItems.map((item, index) => (
                        <CustomButton key={item.index}
                            onClick={() => {
                                item.onClick();
                                updateSelectedButton(item.text);
                            }}
                            selected={item.selected} text={item.text} />
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
                setloginData={setloginData}
                loginData={loginData}
                open={loginDialogOpen}
                onClose={handleCloseLoginDialog}
                onShowSignup={handleShowSignupDialog}
            />

            <SignupDialog
                signUpData={signUpData}
                setSignUpData={setSignUpData}
                open={signupDialogOpen}
                onClose={handleCloseSignupDialog}
                onShowLogin={handleShowLoginDialog}
            />
        </>
    )
}

export default NavbarComponent
