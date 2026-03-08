'use client';

import { ContributorFormProvider } from '@/contexts/ContributorContext';

export default function ContributorLayout({ children }) {
  return (
    <ContributorFormProvider>
      {children}
    </ContributorFormProvider>
  );
}
