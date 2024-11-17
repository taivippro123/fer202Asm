// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
// import Navbar from '../components/Navbar';

// function Detail() {
//   const location = useLocation();
//   const { staffData } = location.state || {}; // Access staffData from state

//   console.log("Received staffData:", staffData); // Debugging log

//   if (!staffData) {
//     return <Typography variant="h6">No staff data available.</Typography>;
//   }

//   return (
//     <>
//       <Navbar />
//       <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//         <Card sx={{ maxWidth: 600 }}>
//           <CardMedia
//             component="img"
//             height="300"
//             image={staffData.avatar}
//             alt={`${staffData.name}'s avatar`}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h4" component="div">
//               {staffData.name}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               <strong>Address:</strong> {staffData.address}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               <strong>Age:</strong> {staffData.age}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               <strong>Created Date:</strong> {new Date(staffData.createdAt).toLocaleDateString()}
//             </Typography>
//           </CardContent>
//         </Card>
//       </Container>
//     </>
//   );
// }

// export default Detail;


// USE ID, NOT PASS DATA FROM HOME PAGE



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar';

function Detail() {
  const { id } = useParams(); // Get the id from the URL
  const [staff, setStaff] = useState(null); // Renamed to staff

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(`https://670f0c553e715186165667a0.mockapi.io/staffManagement/${id}`);
        const data = await response.json();
        setStaff(data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaff();
  }, [id]);

  if (!staff) {
    return <Typography variant="h6">Loading staff data...</Typography>;
  }

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            component="img"
            height="300"
            image={staff.avatar}
            alt={`${staff.name}'s avatar`}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {staff.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Address:</strong> {staff.address}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Age:</strong> {staff.age}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Created Date:</strong> {new Date(staff.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Detail;
