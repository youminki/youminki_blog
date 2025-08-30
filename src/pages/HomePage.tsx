import React from 'react';
import ProfileSection from '../components/layout/ProfileSection';
import ContentLayout from '../components/layout/ContentLayout';

const HomePage: React.FC = () => {
  return (
    <main className="py-16 w-full">
      <div className="max-w-[800px] mx-auto px-6 w-full">
        {/* Profile and Quote Row */}
        <ProfileSection />

        {/* Divider Line */}
        <div className="border-b border-[var(--border-color)] my-8"></div>

        {/* Content Sections */}
        <ContentLayout />
      </div>
    </main>
  );
};

export default HomePage;
