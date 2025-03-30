import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GoogleIcon } from "./CustomIcons"; // Google Login icon
import { useNavigate } from "react-router-dom";

// 🚀 Glassmorphic Card Styling with Hover Effects
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
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
}));

// 🚀 Background Styling
const SignUpContainer = styled(Stack)(() => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "radial-gradient(circle at 50% 0%, rgba(100, 255, 218, 0.05), transparent 70%)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

export default function SignUpForm() {
    const navigate = useNavigate();
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent form reload
  
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
  
      let hasError = false;
  
      if (!name) {
          setNameError(true);
          setNameErrorMessage("Name is required");
          hasError = true;
      } else {
          setNameError(false);
          setNameErrorMessage("");
      }
  
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
  
      // ✅ Send request to backend
      try {
          const response = await fetch("http://localhost:5000/auth/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, password }),
          });
  
          const data = await response.json();
          console.log("📥 Server response:", data);
  
          if (response.ok) {
              localStorage.setItem("userEmail", email);  // ✅ Store email after signup
              console.log("✅ Stored Email in localStorage:", localStorage.getItem("userEmail")); // ✅ Debugging log
              navigate("/onboarding");  // ✅ Redirect to onboarding
          } else {
              alert(data.message || "Signup failed. Please try again.");
          }
      } catch (error) {
          console.error("❌ Signup error:", error);
          alert("Server error. Please try again later.");
      }
  };
  
  return (
    <SignUpContainer>
      <CssBaseline />
      <Card variant="outlined">
        {/* 🏁 App Name "FixMyRide" */}
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#00ff99" }}>
          🚗 FixMyRide
        </Typography>

        {/* 🔑 Sign-up Heading */}
        <Typography component="h1" variant="h4" sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)", color: "#00ff99", textAlign: "center" }}>
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* 🏷️ Full Name Field */}
          <FormControl>
            <FormLabel htmlFor="name" sx={{ color: "white" }}>Full Name</FormLabel>
            <TextField
              id="name"
              name="name"
              placeholder="Username"
              required
              fullWidth
              variant="outlined"
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)" },
                "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 4px 15px rgba(100, 255, 218, 0.3)",
                    },
                    "&.Mui-focused": {
                        transform: "scale(1.05)",
                        border: "2px solid #00ccff",
                        boxShadow: "0px 6px 20px rgba(0, 204, 255, 0.5)",
                    },
                },
              }}
            />
          </FormControl>

          {/* ✉️ Email Field */}
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
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)" },
                "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 4px 15px rgba(100, 255, 218, 0.3)",
                    },
                    "&.Mui-focused": {
                        transform: "scale(1.05)",
                        border: "2px solid #00ccff",
                        boxShadow: "0px 6px 20px rgba(0, 204, 255, 0.5)",
                    },
                },
              }}
            />
          </FormControl>

          {/* 🔒 Password Field */}
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
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)" },
                "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 4px 15px rgba(100, 255, 218, 0.3)",
                    },
                    "&.Mui-focused": {
                        transform: "scale(1.05)",
                        border: "2px solid #00ccff",
                        boxShadow: "0px 6px 20px rgba(0, 204, 255, 0.5)",
                    },
                },
              }}
            />
          </FormControl>

          {/* ✅ Terms & Conditions */}
          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={<Checkbox value="agree" color="primary" />}
              label={
                <Typography sx={{ fontSize: "0.85rem", color: "black" }}>
                  I agree to the <Link href="#" sx={{ color: "#00ff99", "&:hover": { textDecoration: "underline" } }}>terms and conditions</Link>
                </Typography>
              }
            />
          </Box>

          {/* 🔘 Sign-up Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              background: "#00ff99",
              color: "#0A1F2F",
              fontWeight: "bold",
              "&:hover": { background: "#00ccff" },
              transition: "all 0.3s ease-in-out",
            }}
            
          >
            Sign Up
          </Button>

          {/* 🔽 Divider */}
          <Divider sx={{ background: "rgba(255, 255, 255, 0.2)" }}>or</Divider>

          {/* 🌍 Social Login Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => window.location.href = "http://localhost:5000/auth/google"} startIcon={<GoogleIcon />}>
              Sign up with Google
            </Button>
          </Box>

          {/* 🔹 Login Link */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?
            <Link href="/login" variant="body2" sx={{ color: "#00ff99", "&:hover": { textDecoration: "underline" } }}>
              &nbsp; Login
            </Link>
          </Box>
        </Box>
      </Card>
    </SignUpContainer>
  );
}
