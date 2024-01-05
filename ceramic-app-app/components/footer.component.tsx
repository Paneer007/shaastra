import Link from "next/link";

export const Footer = () => {


  
  return (
    <footer className='footer'>
      <div>
        <a
          onClick={() => {
            localStorage.clear();
            history.pushState(null, null, window.location.href);
          }}
        >
          Logout
        </a>
      </div>
    </footer>
  );
};
