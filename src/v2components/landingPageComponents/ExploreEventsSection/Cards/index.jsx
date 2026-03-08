import React from 'react';
import { Card, CardContent, Box, Typography, Avatar, AvatarGroup } from '@mui/material';
import ExploreEventImage from "@/../public/assets/landing-page-assets/explore-event-card-image.svg";
import Image from 'next/image';

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif"

const EventTag = ({ label, bgColor, textColor }) => (
    <Box sx={{
        bgcolor: bgColor,
        color: textColor,
        px: '16px',
        py: '6px',
        borderRadius: '100px',
        fontSize: 12,
        fontWeight: 500,
        fontFamily: PRODUCT_SANS
    }}>
        {label}
    </Box>
)

const EventsCard = ({ onClick = () => { }, event }) => {
    const {
        image = ExploreEventImage,
        time = "4:00 PM – 7:00 PM",
        type = "Workshop",
        title = "Flutter State Management Workshop",
        description = "A hands-on workshop covering all Provider, Bloc, and Riverpod....",
        registeredCount = "56+",
        location = "Bangalore",
        date = "06 Mar'26"
    } = event || {};

    const avatars = [
        { id: 1, color: '#8b5cf6' },
        { id: 2, color: '#10b981' },
        { id: 3, color: '#3b82f6' },
        { id: 4, color: '#facc15' },
        { id: 5, color: '#ef4444' },
    ];

    const commonTextStyle = {
        fontFamily: PRODUCT_SANS,
        m: 0
    }

    return (
        <Box onClick={onClick} sx={{ position: 'relative' }}>
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 280,
                    background: '#ffffff',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    border: 'none',
                }}>
                <Box sx={{ p: '16px 16px 0 16px', width: "100%", height: "100%" }}>
                    <Image src={image} alt={title} style={{ width: "100%", objectFit: 'contain', height: '100%' }} />
                </Box>

                <CardContent sx={{ padding: '0 20px 20px 20px', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                        <EventTag label={time} bgColor="#FFF9F0" textColor="#ED8A19" />
                        <EventTag label={type} bgColor="#E8F9F1" textColor="#10B981" />
                    </Box>

                    <Typography
                        sx={{
                            ...commonTextStyle,
                            fontSize: 18,
                            fontWeight: 500,
                            color: '#000000',
                            lineHeight: '25px',
                        }}>
                        {title}
                    </Typography>

                    <Typography sx={{
                        ...commonTextStyle,
                        fontSize: 14,
                        color: '#b0b0b0',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}>
                        {description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                        <Typography
                            sx={{
                                ...commonTextStyle,
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#000',
                            }}>
                            {registeredCount} Registered
                        </Typography>
                        <AvatarGroup max={5} sx={{
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                fontSize: 14,
                                border: '2px solid #fff'
                            }
                        }}>
                            {avatars.map(avatar => (
                                <Avatar key={avatar.id} sx={{ bgcolor: avatar.color }} src="" />
                            ))}
                        </AvatarGroup>
                    </Box>
                </CardContent>

            </Card>
            <Box
                sx={{
                    zIndex: -1,
                    top: '100%',
                    transform: 'translate(0px , -18px)',
                    position: 'absolute',
                    borderBottomRightRadius: '24px',
                    borderBottomLeftRadius: '24px',
                    bgcolor: '#4669f2',
                    p: '14px 20px',
                    width: '100%',
                    maxWidth: 380,
                    height: "50px",
                    paddingTop: '40px',
                    paddingBottom: "20px",
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16, fontFamily: PRODUCT_SANS }}>{location}</Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 16, fontFamily: PRODUCT_SANS }}>{date}</Typography>
            </Box>
        </Box>
    )
}

export default EventsCard