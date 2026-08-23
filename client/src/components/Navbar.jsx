import { useMemo } from "react";

const Navbar = () => {
  const user = useMemo(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  }, []);

  const firstLetter = user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="ph-navbar">
      <div className="ph-navbar-left">
        <h2>Programming Helper</h2>
      </div>

      <div className="ph-user-avatar" title={user?.email}>
        {firstLetter}
      </div>
    </header>
  );
};

export default Navbar;