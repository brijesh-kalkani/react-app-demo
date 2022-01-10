import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 170 },
  { id: "edit", label: "Edit", minWidth: 170 },
];

function Users(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [disable, setDisabled] = useState(false);
  const [dialogMSG, setDialogMSG] = useState("");
  const [index, setIndex] = useState({});
  const [userStatus, setUserStatus] = useState("");
  const [dialogValue, setDialogValue] = useState({
    name: "",
    email: "",
    location: "",
  });

  const setState = (e) => {
    setDialogValue({ ...dialogValue, [e.target.name]: e.target.value });
    console.log(dialogValue);
  };

  const handleClickOpen = (msg) => {
    if (msg === "Show") {
      setDisabled(true);
      setDialogMSG("Only for view");
    } else if (msg === "Add") {
      setDialogValue({
        name: "",
        email: "",
        location: "",
      });
      setDialogMSG("You can Add new user");
      setUserStatus("Add");
    } else {
      setDisabled(false);
      setDialogMSG("You can Edit information");
      setUserStatus("Update");
    }
    setDialogValue({
      name: index.name,
      email: index.email,
      location: index.location,
    });

    console.log(index);
    setOpen(true);
  };

  const userFunction = () => {
    if (userStatus === "Add") {
      axios
        .post("http://restapi.adequateshop.com/api/users", dialogValue, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
    if (userStatus === "Update") {
      axios
        .put(
          `http://restapi.adequateshop.com/api/users/${index.id}`,
          { id: index.id, ...dialogValue },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
    if (userStatus === "Delete") {
      axios
        .delete(`http://restapi.adequateshop.com/api/users/${index.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get(`http://restapi.adequateshop.com/api/users?page=${page + 1}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTableData(res.data.data);
        setTotalPages(res.data.total_pages);
      });
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <div style={{ textAlign: "end", padding: "10px" }}>
        <Button variant="outlined" onClick={() => handleClickOpen("Add")}>
          Add User
        </Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={i}
                    name={`${i}`}
                    id="test"
                  >
                    {columns.map((column, ind) => {
                      const value = row[column.id];

                      return (
                        <>
                          {!value && (
                            <>
                              <TableCell
                                align={column.align}
                                id="basic-button"
                                aria-controls={open1 ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open1 ? "true" : undefined}
                                onClick={handleClick}
                              >
                                <MoreVertOutlinedIcon
                                  onClick={(e) => {
                                    setIndex(row);
                                  }}
                                />
                              </TableCell>
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open1}
                                onClose={handleClose1}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <MenuItem
                                  name={i}
                                  onClick={(e) => {
                                    handleClose1();
                                    handleClickOpen("Show");
                                  }}
                                >
                                  Show
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleClose1();
                                    handleClickOpen("Edit");
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleClose1();
                                    setUserStatus("Delete");
                                    userFunction();
                                  }}
                                >
                                  Delete
                                </MenuItem>
                              </Menu>
                            </>
                          )}
                          {value && (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )}
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalPages}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogMSG}</DialogTitle>
          <DialogContent className="w-150px">
            <div className="m-b-1rem">
              <TextField
                className="w-100"
                label="Name"
                variant="filled"
                name="name"
                disabled={disable}
                onChange={setState}
                value={dialogValue.name}
              />
            </div>
            <div className="m-b-1rem">
              <TextField
                className="w-100"
                label="Email"
                variant="filled"
                name="email"
                disabled={disable}
                onChange={setState}
                value={dialogValue.email}
              />
            </div>
            <div className="m-b-1rem">
              <TextField
                className="w-100"
                label="Location"
                variant="filled"
                name="location"
                disabled={disable}
                onChange={setState}
                value={dialogValue.location}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                handleClose();
                userFunction();
              }}
              autoFocus
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Users;
