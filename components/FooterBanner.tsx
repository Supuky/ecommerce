import React from 'react'
import Link from 'next/link';
import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner }: any) => {
  return (
    <footer className="footer-banner-container">
      <div className="banner-desc">
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </footer>
  )
}

export default FooterBanner;