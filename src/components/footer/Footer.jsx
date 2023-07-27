import React from 'react'
import footerStyles from './footer_style.module.scss'
import footerLogo from './footer_images/logo.png'
import fb from './footer_images/fb.png'
import insta from './footer_images/insta.png'
import ld from './footer_images/ld.png'

const Footer = () => {
  return (
    <footer>
      <div className={footerStyles.footer_container}>
        <div className={footerStyles.footer_description}>
          <div className={footerStyles.footer_logo_container}>
            <img className={footerStyles.footer_logo} src={footerLogo} alt='Logo' />
            <span className={footerStyles.logo_name}>Oak tree</span>
          </div>


          <div className={footerStyles.social_media_icons}>
            <a href='https://www.facebook.com/delorna.janemay' target='_blank' rel='noopener noreferrer'>
              <img className={footerStyles.fb_img} src={fb} alt='facebook-icon' />
            </a>
            <a href='https://www.instagram.com/ilona.priyatkina/?hl=uk' target='_blank' rel='noopener noreferrer'>
              <img className={footerStyles.insta_img} src={insta} alt='instagram-icon' />
            </a>
            <a href='https://www.linkedin.com/in/ilona-priyatkina-167a01105/' target='_blank' rel='noopener noreferrer'>
              <img className={footerStyles.ld_img} src={ld} alt='linkedin-icon' />
            </a>
          </div>
        </div>

        <form className={footerStyles.footer_form}></form>

        <div className={footerStyles.footer_contacts}>
          <h3>Contacts</h3>
          <ul className={footerStyles.footer_ul}>
            <li>Phone Numbers: Main Office: +380 12-345-6789</li>
            <li> Sales Department: +380 98-765-4321</li>
            <li>Address: Street: Green Street, 123</li>

          </ul>
        </div>
        <div className={footerStyles.footer_contacts}>
          <ul className={footerStyles.footer_ul}>
            <li><h3>Contacts</h3></li>
            <li>City: Lviv
              <br />Country: Ukraine
              <br />ZIP Code: 98765</li>
            <li>Email: info@oaktree.com</li>
          </ul>
        </div>

        <div className={footerStyles.footer_btn_group}>
          <button className={footerStyles.btn}>Login</button>
          <button className={footerStyles.btn}>Register</button>
        </div>
      </div>
    </footer >
  )
}

export default Footer
