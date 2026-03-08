'use client';

import React, { createContext, useContext, useState } from 'react';

const ContributorFormContext = createContext();

export const ContributorFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentRole: '',
    contribution: '',
    experience: '',
    weeklyTime: '',
    reason: '',
    skills: [],
    links: []
  });

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      currentRole: '',
      contribution: '',
      experience: '',
      weeklyTime: '',
      reason: '',
      skills: [],
      links: []
    });
  };

  return (
    <ContributorFormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </ContributorFormContext.Provider>
  );
};

export const useContributorForm = () => useContext(ContributorFormContext);
