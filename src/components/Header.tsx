interface HeaderProps {
  activeTab: 'portfolio' | 'blog';
  onTabChange: (tab: 'portfolio' | 'blog') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: '0 1px 3px var(--shadow-light)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '5rem',
          }}
        >
          {/* 탭 네비게이션 */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '0.5rem',
              padding: '0.25rem',
              border: '1px solid var(--border-color)',
              boxShadow: '0 1px 3px var(--shadow-light)',
            }}
          >
            <button
              onClick={() => onTabChange('portfolio')}
              style={{
                position: 'relative',
                padding: '0.75rem 1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.375rem',
                transition: 'all 0.2s ease',
                marginRight: '0.25rem',
                ...(activeTab === 'portfolio'
                  ? {
                      color: 'white',
                      backgroundColor: 'var(--accent-color)',
                      boxShadow: '0 1px 3px var(--shadow-medium)',
                    }
                  : {
                      color: 'var(--text-primary)',
                      backgroundColor: 'transparent',
                    }),
              }}
            >
              포트폴리오
            </button>

            <button
              onClick={() => onTabChange('blog')}
              style={{
                position: 'relative',
                padding: '0.75rem 1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.375rem',
                transition: 'all 0.2s ease',
                marginLeft: '0.25rem',
                ...(activeTab === 'blog'
                  ? {
                      color: 'white',
                      backgroundColor: 'var(--accent-color)',
                      boxShadow: '0 1px 3px var(--shadow-medium)',
                    }
                  : {
                      color: 'var(--text-primary)',
                      backgroundColor: 'transparent',
                    }),
              }}
            >
              블로그
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
