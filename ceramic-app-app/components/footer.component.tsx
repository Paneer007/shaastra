import Link from "next/link";

export const Footer = () => {
  return (
    <footer className='footer'>
      <div>
        <Link
          href='/'
          onClick={() => {
            localStorage.removeItem("logged_in");
            window.location.href = "/";
          }}
        >
          Logout
        </Link>
      </div>
    </footer>
  );
};
