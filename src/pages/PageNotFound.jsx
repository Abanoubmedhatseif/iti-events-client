import React from 'react';
import notFoundImage from '../assets/404Page.gif'; // Adjust the path to your actual image

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
};

function PageNotFound() {
  return (
    <div style={styles.container}>
      <img src={notFoundImage} alt="Page Not Found" style={styles.image} />
    </div>
  );
}

export default PageNotFound;