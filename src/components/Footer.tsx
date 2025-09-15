const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        padding: '2rem 0',
        marginTop: 'auto',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--text-secondary)' }}>
          © 2025 Youminki. Built with React, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
