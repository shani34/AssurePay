import React from 'react';
import career from './career.module.css'; // Import the corresponding CSS file
import styles from './welcome.module.css';

const CareerPage = () => {
  return (
    <div className={career.careerPage}>
      <h1>Join Our Team</h1>
      <p>We are always looking for talented individuals to join our team.</p>
      <div className={career.jobListing}>
        <div className={career.job}>
          <h2>Software Engineer</h2>
          <p>
            We are seeking a skilled software engineer to develop and maintain web applications.
          </p>
          <button className={career.applyButton}>Apply Now</button>
        </div>
        <div className={career.job}>
          <h2>UI/UX Designer</h2>
          <p>
            We're looking for a creative UI/UX designer to craft intuitive and visually appealing user interfaces.
          </p>
          <button className={career.applyButton}>Apply Now</button>
        </div>
        <div className={career.job}>
          <h2>Product Manager</h2>
          <p>
            We're looking for a expereinced Product Manager to craft product as per clients demands.
          </p>
          <button className={career.applyButton}>Apply Now</button>
        </div>
        <div className={career.job}>
          <h2>Software Engineer II</h2>
          <p>
          We are seeking a skilled software engineer to develop and maintain web applications.
          </p>
          <button className={career.applyButton}>Apply Now</button>
        </div>
        {/* Add more job listings as needed */}
      </div>
      <footer className={styles.footer}>
          <p>&copy; 2023 AssurePay. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default CareerPage;
