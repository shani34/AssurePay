import React from "react";
import styles from './about.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import user from '../logo/AssurePay.png'
const About = () => {
  return (
    <div className={styles.about}>
     <header className={styles.header}>
        <img
          src={user}
          alt="AssurePay Logo"
          className={styles.logo}
        />
     </header>
     <div className={styles.sidebar}>
      <nav className={styles.sidebar}>
        <ul className={styles.navLinks}>
          <li>
            <a href="/about" onClick={About} >About</a>
          </li>
          <li>
            <a href="/career">Career</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>
      </div>

      <div className={styles.aboutHeader}>
        <h1>About Us</h1>
      </div>
      <div className={styles.aboutContent}>
        <h2>AssurePay: Empowering Your Financial Journey</h2>
        <p>
          AssurePay is a leading financial services provider that specializes in offering seamless solutions for managing accounts across various banks and facilitating the process of obtaining loans. Our mission is to empower individuals and businesses to achieve their financial goals with confidence and ease.
        </p>
        <h3>Our Services:</h3>
        <p>
          <strong>Multi-Bank Account Management:</strong> AssurePay's innovative platform enables you to manage your accounts with different banks through a single, user-friendly interface. No more logging in and out of various bank apps or websites – with AssurePay, you can access and manage all your accounts in one place.
        </p>
        <p>
          <strong>Efficient Loan Processing:</strong> We understand that securing loans can often be a complex and time-consuming process. AssurePay streamlines this journey by offering a smooth and efficient loan application and approval process. Our technology-driven approach ensures that your loan application is processed quickly and accurately.
        </p>
        <p>
          <strong>Personalized Financial Insights:</strong> Our platform provides you with valuable insights into your financial health. From tracking expenses to analyzing your spending patterns, AssurePay helps you make informed financial decisions that align with your goals.
        </p>
        <p>
          <strong>Secure and Reliable:</strong> We take data security seriously. AssurePay employs state-of-the-art encryption and security measures to safeguard your personal and financial information. You can trust us to provide a secure environment for managing your finances.
        </p>
        <p>
          <strong>Customer-Centric Approach:</strong> At AssurePay, our customers are at the heart of everything we do. Our dedicated customer support team is available to assist you at every step, ensuring that your experience with our services is smooth and hassle-free.
        </p>
        <h3>Why Choose AssurePay:</h3>
        <p>
          <strong>Simplicity:</strong> We believe in simplifying financial processes. Our user-friendly platform makes managing accounts and applying for loans straightforward and convenient.
        </p>
        <p>
          <strong>Efficiency:</strong> Time is valuable, and we respect that. With AssurePay, you can save time by avoiding lengthy paperwork and manual processes.
        </p>
        <p>
          <strong>Accessibility:</strong> Whether you're at home, in the office, or on the go, AssurePay provides access to your financial information and services whenever you need them.
        </p>
        <p>
          <strong>Transparency:</strong> We are committed to transparency in all our interactions. From fees to interest rates, you'll have a clear understanding of the terms and conditions associated with our services.
        </p>
        <p>
          <strong>Empowerment:</strong> AssurePay empowers you to take control of your financial journey. By offering insights, tools, and solutions, we help you make informed decisions that contribute to your financial well-being.
        </p>
        <p>
          Join AssurePay and experience the future of financial services. Say goodbye to the complexities of managing accounts and loans – say hello to a seamless, efficient, and empowered financial journey with AssurePay.
        </p>
      </div>
      <div className={styles.followUs}>
        <p>Follow us on:</p>
        <div className={styles.socialMedia}>
          <a href="https://facebook.com" className={styles.socialLink}>
            <FontAwesomeIcon icon={faFacebook} className={styles.icon}/>
          </a>
          <a href="https://twitter.com" className={styles.socialLink}>
            <FontAwesomeIcon icon={faTwitter} className={styles.icon}/>
          </a>
          <a href="https://instagram.com" className={styles.socialLink}>
            <FontAwesomeIcon icon={faInstagram}className={styles.icon}/>
          </a>
        </div>
      </div>
      <footer className={styles.footer}>
          <p>&copy; 2023 AssurePay. All rights reserved.</p>
     </footer>
    </div>
  );
};

export default About;
