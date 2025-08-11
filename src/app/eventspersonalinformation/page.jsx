'use client';

import React from 'react';
import Footer from '@/components/footer/Footer';
import './eventspersonalinformation.css';
// import Image from 'next/image';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';

const EventsPersonalInformation = () => {

    const steps = [
        { label: "Overview", status: "completed" },
        { label: "Personal Information", status: "current" },
        { label: "Payment", status: "upcoming" },
        { label: "Confirm", status: "upcoming" },
        { label: "Success", status: "upcoming" }
    ];


    return (
        <div className='events-screen'>
            <div className='outerBox'>
                <div className="events-container">
                    <div className="progress-container">
                        {steps.map((step, index) => (
                            <div className="progress-step" key={index}>
                                <div
                                    className={`circle ${step.status}`}
                                >
                                    {step.status === "completed" && <span>✔</span>}
                                    {step.status === "current" && <span className="dot"></span>}
                                </div>
                                <p className="label">{step.label}</p>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`line ${steps[index + 1].status === "completed" || steps[index + 1].status === "current" ? "active" : ""}`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventsPersonalInformation;