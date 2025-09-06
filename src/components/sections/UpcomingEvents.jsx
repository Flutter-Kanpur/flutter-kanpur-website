import { Box, Typography } from '@mui/material';
import React from 'react';
import EventCard from '../containers/EventCard';
import { fetchUpcomingEvents } from '../../lib/firebase/server-actions';

// Convert to async component for SSR
async function UpcomingEvents() {
    // Fetch events from Firebase
    const events = await fetchUpcomingEvents();

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
}

export default UpcomingEvents;