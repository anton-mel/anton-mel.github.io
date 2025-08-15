import React from 'react';

const ScrollProgressHeader = () => {
  const [progress, setProgress] = React.useState(0);

  const handleScroll = React.useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    const pct = total > 0 ? (current / total) * 100 : 0;
    setProgress(pct);
  }, []);

  React.useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header className="header">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
    </header>
  );
};

export default ScrollProgressHeader;
