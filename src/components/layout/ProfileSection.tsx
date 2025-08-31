import React from 'react';
import { MdEmail, MdPhone, MdLink, MdLocationOn } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

const ProfileSection: React.FC = () => {
  return (
    <>
      {/* Main Title Section - 기존 스타일 유지 */}
      <div className="max-w-[800px] mx-auto px-6 text-left mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">
          유민기 | 프론트엔드 개발자
        </h1>
      </div>

      {/* Profile Grid */}
      <div className="profile-grid">
        {/* Left Column - Profile Image */}
        <div className="profile-image">
          <div className="profile-image-container">
            <img
              src="/면접사진.jpeg"
              alt="유민기 면접사진"
              className="profile-image"
            />
          </div>
        </div>

        {/* Right Column - Quote and Contact Info */}
        <div className="profile-right-content">
          {/* Quote */}
          <div className="quote-card">
            <p className="quote-text">
              "개발을 할 때가 가장 행복한{' '}
              <span className="quote-highlight">프론트엔드 개발자</span>{' '}
              유민기입니다."
            </p>
          </div>

          {/* Contact Information */}
          <div className="contact-container">
            <div className="contact-item">
              <MdLocationOn className="contact-icon" />
              <span className="contact-text">경기도 안양시</span>
            </div>
            <div className="contact-item">
              <MdEmail className="contact-icon" />
              <span className="contact-text">dbalsrl7648@gmail.com</span>
            </div>
            <div className="contact-item">
              <MdPhone className="contact-icon" />
              <span className="contact-text">010-5351-7648</span>
            </div>
            <div className="contact-item">
              <MdLink className="contact-icon" />
              <a
                href="https://dbalsrl7648.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link contact-text"
              >
                티스토리
              </a>
            </div>
            <div className="contact-item">
              <FaGithub className="contact-icon" />
              <a
                href="https://github.com/youminki"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link contact-text"
              >
                깃허브
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
