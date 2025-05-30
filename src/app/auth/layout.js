import "../globals.css";

export const metadata = {
  title: "Authentication - LC SIGN HELPDESK",
  description: "Login or register to access LC SIGN HELPDESK",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 