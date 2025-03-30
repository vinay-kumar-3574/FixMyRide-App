import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  TextField,
  Avatar,
  IconButton,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AppTheme from "./AppTheme";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const steps = ["Personal Details", "Vehicle Details", "Location Preferences"];

// ✅ Styled Components for better animation & hover effects
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
  },
}));

const AnimatedInput = styled(TextField)({
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
});

const CameraButton = styled(IconButton)({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "#00ccff",
  color: "white",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#0099cc",
    transform: "scale(1.1)",
  },
});

export default function Onboarding(props) {
    const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    profilePicture: null,
    vehicleType: "",
    vehicleModel: "",
    licensePlate: "",
    location: "",
    latitude: null,
    longitude: null, 
  });
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: India
const [userMarker, setUserMarker] = useState(null);


const detectLocation = async () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                // ✅ Reverse Geocoding using OpenStreetMap (Nominatim API)
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                const data = await response.json();

                console.log("📍 Location Details:", data);

                // ✅ Extract City, State, and Zip Code
                const city = data.address.city || data.address.town || data.address.village || "Unknown City";
                const state = data.address.state || "Unknown State";
                const zipCode = data.address.postcode || "Unknown Zip";
                const fullAddress = data.display_name; // Full formatted address
               
                // ✅ Update formData
                setFormData((prev) => ({
                    ...prev,
                    latitude,
                    longitude,
                    location: fullAddress,
                    city:city,
                    state:state,
                    zipCode:zipCode,
                }));
                console.log(city,state,zipcode)
                
            } catch (error) {
                console.error("❌ Error fetching location details:", error);
                alert("Failed to get location details. Try again.");
            }
        },
        (error) => {
            console.error("❌ Error detecting location:", error);
            alert("Failed to get location. Please enable GPS.");
        }
    );
};
  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        handleFinish();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const validateStep = () => {
    if (activeStep === 0 && (!formData.fullName || !formData.contactNumber)) {
      alert("Please fill out all required fields.");
      return false;
    } else if (activeStep === 1 && (!formData.vehicleType || !formData.vehicleModel)) {
      alert("Please enter your vehicle details.");
      return false;
    }
    else if (activeStep === 2 && !formData.location) {
      alert("Please enter your location.");
      return false;
    }
    return true; // ✅ All validations passed
  };
  const handleFinish = async () => {
    console.log("📤 Sending Onboarding Data:", formData); // ✅ Debugging log

    const userEmail = localStorage.getItem("userEmail"); // ✅ Get stored email
    if (!userEmail) {
        alert("Error: User email not found. Please log in again.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/onboarding", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, email: userEmail }), // ✅ Include email
        });

        const data = await response.json();
        console.log("📥 Server Response:", data); // ✅ Log server response

        if (response.ok) {
            alert("Onboarding complete! Redirecting...");
            navigate("/dashboard");
        } else {
            alert("Onboarding failed. Please try again.");
        }
    } catch (error) {
        console.error("❌ Error submitting onboarding data:", error);
        alert("Server error. Please try again later.");
    }
};

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2} alignItems="center">
            {/* ✅ Profile Picture with Upload Option */}
            <Box position="relative">
              <Avatar
                src={formData.profilePicture}
                sx={{ width: 100, height: 100, bgcolor: "#ccc" }}
              />
              <CameraButton component="label">
                <CameraAltIcon />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </CameraButton>
            </Box>
            <AnimatedInput name="fullName" label="Full Name" fullWidth onChange={handleChange} />

            {/* ✅ Country Code + Phone Number Input */}
            <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
              <AnimatedInput
                select
                defaultValue="+91"
                sx={{ width: "30%" }}
              >
                <MenuItem value="+91">🇮🇳 +91</MenuItem>
                <MenuItem value="+1">🇺🇸 +1</MenuItem>
                <MenuItem value="+44">🇬🇧 +44</MenuItem>
                <MenuItem value="+61">🇦🇺 +61</MenuItem>
              </AnimatedInput>
              <AnimatedInput
                name="contactNumber"
                label="Phone Number"
                fullWidth
                onChange={handleChange}
              />
            </Stack>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={2}>
            <AnimatedInput name="vehicleType" label="Vehicle Type (Car, Bike, Truck)" fullWidth onChange={handleChange} />
            <AnimatedInput name="vehicleModel" label="Vehicle Model & Brand" fullWidth onChange={handleChange} />
            <AnimatedInput name="licensePlate" label="License Plate Number (Optional)" fullWidth onChange={handleChange} />
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={2}>
            <AnimatedInput name="location" label="Current Location" fullWidth onChange={handleChange} />

            {/* ✅ Auto-detect Location Option */}
            <Button
                  variant="contained"
                  sx={{
                    background: "#00ff99",
                    "&:hover": { background: "#00ccff" },
                    transition: "all 0.3s ease-in-out",
                  }}
                  onClick={detectLocation}
                >
                  Auto Detect Location
            </Button>
            <MapContainer center={mapCenter} zoom={15} style={{ height: "300px", width: "100%", borderRadius: "10px" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {userMarker && (
                  <Marker position={userMarker}>
                    <Popup>You are here!</Popup>
                  </Marker>
                )}
      </MapContainer>
          </Stack>
        );

      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Grid container sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <Grid item xs={12} sm={8} md={6}>
          <StyledCard>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Complete Your Profile
            </Typography>

            {/* ✅ Stepper Navigation */}
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <CardContent>{getStepContent(activeStep)}</CardContent>

            {/* ✅ Navigation Buttons with Animations */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              {activeStep !== 0 && (
                <Button
                  startIcon={<ChevronLeftRoundedIcon />}
                  onClick={handleBack}
                  sx={{
                    transition: "all 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  Previous
                </Button>
              )}
            <Button
              variant="contained"
              endIcon={<ChevronRightRoundedIcon />}
              onClick={() => {
                if (activeStep === steps.length - 1) {
                  handleFinish(); // ✅ Call handleFinish before navigating
                } else {
                  handleNext();
                }
              }}
              sx={{
                background: "#00ff99",
                "&:hover": { background: "#00ccff", transform: "scale(1.05)" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>


            </Box>
          </StyledCard>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
