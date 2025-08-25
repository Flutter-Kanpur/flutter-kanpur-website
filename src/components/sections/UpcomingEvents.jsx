import { Box, Typography } from '@mui/material';
import React from 'react';
import EventCard from '../containers/EventCard';

const UpcomingEvents = () => {
    const events = [
        {
            tag: "Hackathon",
            date: "April 5, 2025",
            time: "9:00 AM - 4:00 PM IST",
            title: "UX/UI Design Sprint Workshop",
            description: "A fast-paced, hands-on workshop where designers collaborate to solve real-world design challenges and create innovative solutions."
        },
        {
            tag: "Workshop",
            date: "April 12, 2025",
            time: "2:00 PM - 6:00 PM IST",
            title: "Flutter Development Masterclass",
            description: "Learn advanced Flutter techniques, state management, and best practices from industry experts in this comprehensive workshop."
        },
        {
            tag: "Design Sprint",
            date: "April 19, 2025",
            time: "10:00 AM - 5:00 PM IST",
            title: "Product Design Sprint Challenge",
            description: "Join our intensive design sprint where teams work together to prototype and validate innovative product solutions."
        }
    ];

    return (
        <Box sx={{
            width: "100%",
            padding: "80px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: "1300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
            }}>
                {/* Upcoming Events Label */}
                <Box sx={{
                    background: 'transparent',
                    border: '1px solid #2E3942',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#FFFFFF',
                }}>
                    Upcoming Events
                </Box>

                {/* Main Heading */}
                <Typography
                    sx={{
                        fontSize: { xs: "28px", md: "36px" },
                        fontWeight: "700",
                        color: "#FFFFFF",
                        textAlign: "left",
                        marginBottom: "60px",
                        fontFamily: "Encode Sans, sans-serif",
                        lineHeight: "1.2"
                    }}
                >
                    Join workshops, hackathons, and design sprints.
                </Typography>

                {/* Event Cards */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "30px",
                    width: "100%",
                    justifyContent: "space-between"
                }}>
                    {events.map((event, index) => (
                        <EventCard
                            key={index}
                            tag={event.tag}
                            date={event.date}
                            time={event.time}
                            title={event.title}
                            description={event.description}
                            style={{ flex: 1 }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default UpcomingEvents; 