import React from 'react';
import { MdEmail, MdPhone, MdLink, MdLocationOn } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { PERSONAL_INFO, CONTACT_INFO, SOCIAL_LINKS } from '../../data';

const ProfileSection: React.FC = () => {
  return (
    <>
      {/* Main Title Section - 기존 스타일 유지 */}
      <div className="max-w-[800px] mx-auto px-6 text-left mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">
          {PERSONAL_INFO.name} | {PERSONAL_INFO.title}
        </h1>
      </div>

      {/* Profile Grid */}
      <div className="profile-grid">
        {/* Left Column - Profile Image */}
        <div className="profile-image">
          <div className="profile-image-container">
            <img
              src={PERSONAL_INFO.profileImage}
              alt={`${PERSONAL_INFO.name} 면접사진`}
              className="profile-image"
            />
          </div>
        </div>

        {/* Right Column - Quote and Contact Info */}
        <div className="profile-right-content">
          {/* Quote */}
          <div className="quote-card">
            <p className="quote-text">
              "새로운 기술 습득을 즐기고 클론 코딩이 취미인{' '}
              <span className="quote-highlight">개발자</span> 유민기입니다."
            </p>
          </div>

          {/* Contact Information */}
          <div className="contact-container">
            <div className="contact-item">
              <MdLocationOn className="contact-icon" />
              <span className="contact-text">{CONTACT_INFO.location}</span>
            </div>
            <div className="contact-item">
              <MdEmail className="contact-icon" />
              <span className="contact-text">{CONTACT_INFO.email}</span>
            </div>
            <div className="contact-item">
              <MdPhone className="contact-icon" />
              <span className="contact-text">{CONTACT_INFO.phone}</span>
            </div>
            <div className="contact-item">
              <MdLink className="contact-icon" />
              <a
                href={SOCIAL_LINKS.blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link contact-text"
              >
                {SOCIAL_LINKS.blog.label}
              </a>
            </div>
            <div className="contact-item">
              <FaGithub className="contact-icon" />
              <a
                href={SOCIAL_LINKS.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link contact-text"
              >
                {SOCIAL_LINKS.github.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
