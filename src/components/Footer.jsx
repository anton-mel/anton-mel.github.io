import React from 'react';

function Footer() {
  return (
    <div className='footer-text'>
      <div className="footer-copyright">
        <small>© 2025 Anton Melnychuk. All rights reserved.</small>
        <br/>
        <small>Site last updated {__BUILD_DATE__ || '2025-04-29'} (Vite).</small>
      </div>
    </div>
  );
}

export default Footer;
