import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
function Dashboard() {
  const [staffs, setStaffs] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [errors, setErrors] = useState({});
  const [sortOrder, setSortOrder] = useState("asc"); // New state for sorting

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://670f0c553e715186165667a0.mockapi.io/staffManagement"
        );
        const data = await response.json();
        setStaffs(data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedStaffs = [...staffs].sort((a, b) => {
      return newSortOrder === "asc" ? a.id - b.id : b.id - a.id;
    });

    setStaffs(sortedStaffs);
  };

  const handleOpenEditModal = (staff) => {
    setSelectedStaff(staff);
    setOpenEditModal(true);
    setErrors({});
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedStaff(null);
  };

  const handleEditChange = (e) => {
    setSelectedStaff({
      ...selectedStaff,
      [e.target.name]: e.target.value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const validateName = (name) => {
    const nameWords = name.trim().split(" ");
    return name.trim() && nameWords.length > 2 && name === name.toUpperCase();
  };

  const handleEditSubmit = async () => {
    const formErrors = {};

    if (!validateName(selectedStaff.name)) {
      formErrors.name =
        "Name must be in FULL UPPER CASE and contain more than 2 words";
    }

    if (!selectedStaff.address.trim()) {
      formErrors.address = "Address is required";
    }

    if (!selectedStaff.age || selectedStaff.age <= 0) {
      formErrors.age = "Age must be a positive number";
    }

    if (!selectedStaff.imageUrl || !selectedStaff.imageUrl.startsWith("http")) {
      formErrors.imageUrl = "Image URL must be a valid URL";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await fetch(
        `https://670f0c553e715186165667a0.mockapi.io/staffManagement/${selectedStaff.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedStaff),
        }
      );
      setStaffs(
        staffs.map((staff) =>
          staff.id === selectedStaff.id ? selectedStaff : staff
        )
      );
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  const handleOpenDeleteDialog = (staff) => {
    setStaffToDelete(staff);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setStaffToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `https://670f0c553e715186165667a0.mockapi.io/staffManagement/${staffToDelete.id}`,
        { method: "DELETE" }
      );
      setStaffs(staffs.filter((staff) => staff.id !== staffToDelete.id));
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4">Staff Management Dashboard</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                  {/* <TableCell  onClick={handleSort}>
                    ID {sortOrder === "asc"}
                  </TableCell> */}
                  <TableCell>
                    <TableCell
                      onClick={handleSort}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      ID
                      {sortOrder === "asc" ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      )}
                    </TableCell>     
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.address}</TableCell>
                  <TableCell>{staff.age}</TableCell>
                  {/* <TableCell>{staff.gender ? "M" : "F"}</TableCell> IN CASE HAS GENDER */}
                  <TableCell>
                    <IconButton
                      component={Link}
                      to={`/detail/${staff.id}`}
                      state={{ staffData: staff }}
                      color="primary"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenEditModal(staff)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteDialog(staff)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <Add />
        </Fab>

        <Dialog open={openEditModal} onClose={handleCloseEditModal}>
          <DialogTitle>Edit Staff</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={selectedStaff?.name || ""}
              onChange={handleEditChange}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              margin="dense"
              label="Address"
              name="address"
              value={selectedStaff?.address || ""}
              onChange={handleEditChange}
              fullWidth
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              margin="dense"
              label="Age"
              name="age"
              value={selectedStaff?.age || ""}
              onChange={handleEditChange}
              fullWidth
              error={!!errors.age}
              helperText={errors.age}
            />
            <TextField
              margin="dense"
              label="Avatar"
              name="avatar"
              value={selectedStaff?.avatar || ""}
              onChange={handleEditChange}
              fullWidth
              error={!!errors.avatar}
              helperText={errors.avatar}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Staff</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this staff member?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default Dashboard;
