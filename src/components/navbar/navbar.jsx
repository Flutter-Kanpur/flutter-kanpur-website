'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CustomButton from '../buttons/customNavbarButton/customButton';
import Image from 'next/image';
import LoginDialog from '../dialogs/LoginDialog';
import SignupDialog from '../dialogs/SignupDialog';
import { useRouter, usePathname } from 'next/navigation';
import { useNavbar } from '@/contexts/NavbarContext';

import { getAuth } from "firebase/auth";
import LogoutButton from "@/components/components/ui/LogoutButton";

const NavbarComponent = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { selectedButton, updateSelectedButton } = useNavbar();
    const auth = getAuth();

    // Hide navbar on onboarding pages
    if (pathname?.startsWith('/onboarding')) {
        return null;
    }

    const navItems = [
        { index: 1, text: "Home", onClick: () => router.push("/"), selected: selectedButton.Home },
        { index: 2, text: "Team", onClick: () => router.push("/members"), selected: selectedButton.Team },
        { index: 3, text: "Blog", onClick: () => router.push("/bloglisting"), selected: selectedButton.Blog },
        { index: 4, text: "Community", onClick: () => router.push("/communityPage"), selected: selectedButton.Community },
        { index: 5, text: "Events", onClick: () => router.push("/events"), selected: selectedButton.Events },
    ];

    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [signupDialogOpen, setSignupDialogOpen] = useState(false);

    const [signUpData, setSignUpData] = useState({
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
    });

    const [loginData, setloginData] = useState({
        email: "",
        password: "",
    });

    const [user, setUser] = useState(null);

    // Track login state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

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
                background: "transparent",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                width: "100%",
                backgroundColor: pathname.includes("blogscreen") ? "#010a10" : null,
                justifyContent: "space-between",
                gap: { xs: 2, md: 0 },
                padding: "25px 58px 0 58px",
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
                    {navItems.map((item) => (
                        <CustomButton
                            key={item.index}
                            onClick={() => {
                                item.onClick();
                                updateSelectedButton(item.text);
                            }}
                            selected={item.selected}
                            text={item.text}
                        />
                    ))}

                    {/* Conditional Login / Logout */}
                    {user ? (
                        <LogoutButton /> // Show logout if logged in
                    ) : (
                        <CustomButton
                            selected={false}
                            text="Login"
                            onClick={handleLoginClick}
                        />
                    )}

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
    );
};

export default NavbarComponent;
