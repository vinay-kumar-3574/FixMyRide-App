export const useLogout = (navigate) => {
  return async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include", // Important for session cookies
      });

      if (response.ok) {
        localStorage.removeItem("token"); // Remove stored JWT
        navigate("/"); // ✅ Pass `navigate` from the component
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
};
