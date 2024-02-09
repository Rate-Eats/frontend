import FacebookLogo from '@/assets/svgs/logos/facebookLogo.svg?react';
import GoogleLogo from '@/assets/svgs/logos/googleLogo.svg?react';

const Socials = () => {
  const googleLogin=()=>{
    window.location.replace('https://1c21-37-128-40-211.ngrok-free.app/api/connect/google');
  }

  return (
    <div className="flex gap-4">
      <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md border" type="button" onClick={()=>googleLogin()}>
        <GoogleLogo className="w-5" />
        <span>Log in with Google</span>
      </button>
      <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md border" type="button">
        <FacebookLogo className="w-5" />
        <span>Log in with Facebook</span>
      </button>
    </div>
  );
};

export default Socials;
