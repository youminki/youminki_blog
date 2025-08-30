import React from 'react';
import AboutMe from '../AboutMe';
import Career from '../Career';
import School from '../School';
import Skills from '../Skills';
import Projects from '../Projects';

const ContentLayout: React.FC = () => {
  return (
    <>
      {/* Content Sections - Column Layout */}
      <div className="content-sections">
        <AboutMe />
        <div className="career-school-row">
          <Career />
          <School />
        </div>
      </div>

      {/* Full Width Sections */}
      <div className="section-spacing">
        <div className="w-full">
          <Skills />
        </div>
        <Projects />
      </div>
    </>
  );
};

export default ContentLayout;
