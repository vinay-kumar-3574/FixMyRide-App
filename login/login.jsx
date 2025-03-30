import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GoogleIcon } from "./CustomIcons";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: { maxWidth: "450px" },
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const LoginContainer = styled(Stack)(() => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "radial-gradient(circle at 50% 0%, rgba(100, 255, 218, 0.05), transparent 70%)",
}));

export default function LoginForm() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    let hasError = false;

    if (!email) {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
      hasError = true;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
      hasError = true;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (hasError) return;

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📥 Server response:", data);

      if (response.ok) {
        localStorage.setItem("userEmail", email);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <LoginContainer>
      <CssBaseline />
      <Card variant="outlined">
      <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {/* Logo */}
            <img
              src="/fixmyapp logo.png"
              alt="FixMyRide Logo"
              style={{
                width: "80px", // Adjust as needed
                height: "auto",
                filter: "drop-shadow(0px 4px 10px rgba(0, 255, 153, 0.6))", // Elegant neon glow effect
              }}
            />

            {/* Brand Name with Ultimate Styling */}
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700, // Bold and strong
                textAlign: "center",
                fontFamily: "'Poppins', sans-serif", // Elegant, professional font
                letterSpacing: "1px",
                color: "#00FF99", // Premium green shade
                textShadow: "2px 2px 8px rgba(0, 255, 153, 0.4)", // Smooth glowing effect
                textTransform: "uppercase", // Makes it look strong and bold
                display: "inline-block",
                padding: "5px 15px",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)", // Slight hover effect
                  textShadow: "2px 2px 12px rgba(0, 255, 153, 0.7)",
                },
              }}
            >
              Fix<span style={{ color: "#00FF99" }}>My</span>
              <span style={{ color: "#00FF99" }}>Ride</span>
            </Typography>
          </Box>


        <Typography component="h1" variant="h4" sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)", color: "#00ff99", textAlign: "center" }}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="email" sx={{ color: "white" }}>Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              fullWidth
              variant="outlined"
              sx={{ background: "rgba(255, 255, 255, 0.1)", borderRadius: "8px" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password" sx={{ color: "white" }}>Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              required
              fullWidth
              variant="outlined"
              sx={{ background: "rgba(255, 255, 255, 0.1)", borderRadius: "8px" }}
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ background: "#00ff99", fontWeight: "bold" }}>
            Login
          </Button>

          <Button fullWidth variant="outlined" onClick={() => window.location.href = "http://localhost:5000/auth/google"} startIcon={<GoogleIcon />}>
            Login with Google
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            Don't have an account?
            <Link href="/signup" variant="body2" sx={{ color: "#00ff99" }}>
              &nbsp; Sign Up
            </Link>
          </Box>
        </Box>
      </Card>
    </LoginContainer>
  );
}
