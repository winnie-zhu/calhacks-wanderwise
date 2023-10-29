import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import "../App.css";

function CustomGoogleLoginButton() {
  const [userProfile, setUserProfile] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    const profileImage = credentialResponseDecoded.picture;
    const name = credentialResponseDecoded.name;

    setUserProfile({ profileImage, name });
  };

  const handleLoginError = () => {
    console.log('Login failed');
  };

  return (
    <div>
      {userProfile ? (
        <img id='profile-pic' src={userProfile.profileImage} />
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      )}
    </div>
  );
}

export default CustomGoogleLoginButton;