import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


function Login() {
  return (
    <>
    <GoogleLogin
      onSuccess={credentialResponse => {
        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
        console.log("HERE:", credentialResponseDecoded);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
    </>
  );
}

export default Login;
