'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import UpdateCard from './UpdateCard';

// Fallback data when Firestore collection is empty or not yet created
const FALLBACK_UPDATES = [
    {
        title: 'Design Challenge 2026',
        description:
            'Join us for an exciting design challenge! Create Stunning UI/UX design and win amazing prize!',
        buttonText: 'View Details',
        backgroundImage: '/frame-1.png',
    },
    {
        title: 'Flutter Forward 2026',
        description:
            'Watch the latest Flutter announcements and deep-dive sessions from the Flutter team!',
        buttonText: 'Watch Now',
        backgroundImage: '/frame-1.png',
    },
    {
        title: 'Community Meetup',
        description:
            'Monthly meetup to connect, share ideas, and learn from fellow Flutter developers!',
        buttonText: 'RSVP',
        backgroundImage: '/frame-1.png',
    },
];

/**
 * UpdateCardCarousel — Horizontal swipeable carousel of UpdateCards with dot indicators.
 *
 * @param {Array} updates - Array of { title, description, buttonText, backgroundImage }
 */
const UpdateCardCarousel = ({ updates = [] }) => {
    const cards = updates.length > 0 ? updates : FALLBACK_UPDATES;
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track active slide via IntersectionObserver
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const slides = container.children;
        if (!slides.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.dataset.index);
                        if (!isNaN(idx)) setActiveIndex(idx);
                    }
                });
            },
            {
                root: container,
                threshold: 0.6,
            },
        );

        Array.from(slides).forEach((slide) => observer.observe(slide));

        return () => observer.disconnect();
    }, [cards.length]);

    // Click a dot to scroll to that slide
    const scrollToSlide = useCallback((index) => {
        const container = scrollRef.current;
        if (!container) return;
        const slide = container.children[index];
        if (slide) {
            slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
    }, []);

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Scrollable track */}
            <Box
                ref={scrollRef}
                sx={{
                    display: 'flex',
                    gap: '12px',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    px: '2px', // small padding so box-shadow isn't clipped
                }}
            >
                {cards.map((card, i) => (
                    <Box
                        key={i}
                        data-index={i}
                        sx={{
                            flex: '0 0 100%',
                            scrollSnapAlign: 'start',
                        }}
                    >
                        <UpdateCard
                            title={card.title}
                            description={card.description}
                            buttonText={card.buttonText}
                            backgroundImage={card.backgroundImage || '/frame-1.png'}
                        />
                    </Box>
                ))}
            </Box>

            {/* Dot indicators */}
            {cards.length > 1 && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        pt: '4px',
                    }}
                >
                    {cards.map((_, i) => (
                        <Box
                            key={i}
                            onClick={() => scrollToSlide(i)}
                            sx={{
                                width: activeIndex === i ? '10px' : '8px',
                                height: activeIndex === i ? '10px' : '8px',
                                borderRadius: '50%',
                                bgcolor: activeIndex === i ? '#1A1A1A' : '#C4C4C4',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default UpdateCardCarousel;
