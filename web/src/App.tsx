import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Career from './components/Career';
import School from './components/School';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { MdEmail, MdPhone, MdLink } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

function App() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#37352f]">
      <Header />

      <main className="py-16">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Profile and Quote Row - Using CSS classes */}
          <div className="profile-grid">
            {/* Left Column - Profile Image */}
            <div className="profile-image">
              <div className="profile-image-container">
                <img
                  src="/src/assets/면접사진.jpeg"
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
                  <span className="quote-highlight">개발자</span>{' '}
                  유민기입니다.."
                </p>
              </div>

              {/* Contact Information */}
              <div className="contact-container">
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

          {/* Divider Line */}
          <div className="border-b border-[#e3e2e0] my-8"></div>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Left Column - About Me */}
            <div>
              <AboutMe />
            </div>

            {/* Right Column - Career and School */}
            <div>
              <div className="space-y-12">
                <Career />
                <School />
              </div>
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="section-spacing">
            <Skills />
            <Projects />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
