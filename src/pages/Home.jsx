import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid";

function Home() {
  const [staffs, setStaffs] = useState([]);

  // Fetch staff data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://670f0c553e715186165667a0.mockapi.io/staffManagement"
        );
        const data = await response.json();
        // Sort data by age in descending order
        const sortedData = data.sort((a, b) => b.age - a.age);
        setStaffs(sortedData);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ marginTop: "20px" }}
        >
          Staff List
        </Typography>
        <Grid container spacing={4}>
          {staffs.map((staff) => (
            <Grid item key={staff.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={staff.avatar}
                  alt={`${staff.name}'s avatar`}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/detail/${staff.id}`}
                    // state={{ staffData: staff }} // Pass staff data to Detail page
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    {staff.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Address:</strong> {staff.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Age:</strong> {staff.age}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/detail/${staff.id}`}
                    // state={{ staffData: staff }} // Pass staff data to Detail page
                    sx={{ marginTop: "10px" }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
