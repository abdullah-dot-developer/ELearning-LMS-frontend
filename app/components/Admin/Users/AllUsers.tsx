"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Typography,
  Stack,
} from "@mui/material";
import { useTheme } from "next-themes";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../../redux/features/user/userApi";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { HiOutlineMail } from "react-icons/hi";
import { styles } from "../../../../app/styles/style";
import { IoPersonAddSharp } from "react-icons/io5";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

interface Column {
  field: string;
  headerName: string;
  flex: number;
  align?: "left" | "right" | "center";
  renderCell?: (params: RowData) => JSX.Element;
}

interface RowData {
  id: string;
  name: string;
  email: string;
  role: string;
  purchasedCourses: string;
  created_at: string;
}

const AllCourses: React.FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [deleteUser, { isSuccess, error: deleteUserError }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("User deleted successfully!");
    }
    if (deleteUserError) {
      if ("data" in deleteUserError) {
        const errorData = deleteUserError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, deleteUserError, refetch]);

  const columns: Column[] = [
    { field: "id", headerName: "ID", flex: 0.5, align: "left" },
    { field: "name", headerName: "Name", flex: 1, align: "left" },
    { field: "email", headerName: "Email", flex: 0.5, align: "left" },
    { field: "role", headerName: "Role", flex: 0.5, align: "left" },
    { field: "created_at", headerName: "Joined On", flex: 0.5, align: "left" },
    {
      field: "courses",
      headerName: "Purchased Courses",
      flex: 0.5,
      align: "left",
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      align: "center",
      renderCell: (row: RowData) => (
        <Button
          onClick={() => {
            setOpen(!open);
            setUserId(row.id);
          }}
        >
          <AiOutlineDelete
            className={`${theme === "dark" ? "text-white" : "text-black"}`}
            size={20}
          />
        </Button>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.2,
      align: "center",
      renderCell: (row: RowData) => (
        <a href={`mailto:${row.email}`}>
          <HiOutlineMail
            className={`${theme === "dark" ? "text-white" : "text-black"}`}
            size={20}
          />
        </a>
      ),
    },
  ];

  TimeAgo.addLocale(en);

  const timeAgo = new TimeAgo("en-US");

  const rows: RowData[] = [];

  if (isTeam) {
    const newData = data?.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        // console.log(item);
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          created_at: timeAgo.format(new Date(item.createdAt)),
          purchasedCourses: item.courses.length,
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        // console.log(item);
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          created_at: timeAgo.format(new Date(item.createdAt)),
          purchasedCourses: item.courses.length,
        });
      });
  }

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-10 mx-auto max-w-screen-xl font-Poppins px-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className="w-full flex justify-end"
            onClick={() => setActive(!active)}
          >
            <IoPersonAddSharp
              className={`${styles.button} !w-[70px] mb-3 bg-[#1A2A44]`}
            />
          </div>

          <Box
            component={Paper}
            elevation={3}
            sx={{
              backgroundColor: theme === "dark" ? "#1A2A44" : "white",
            }}
          >
            <TableContainer>
              <Table
                sx={{
                  minWidth: 650,
                  width: "100%",
                  backgroundColor: theme === "dark" ? "#1A2A44" : "white",
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: theme === "dark" ? "#0E1A30" : "white",
                    }}
                  >
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{
                          flex: column.flex,
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          color: theme === "dark" ? "white" : "black",
                        }}
                      >
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((column, index) => (
                        <TableCell
                          key={index}
                          align={column.align}
                          style={{
                            color: theme === "dark" ? "white" : "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          {column.renderCell
                            ? column.renderCell(row) // Render custom cell content if defined
                            : row[column.field as keyof RowData]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute font-Poppins top-[20%] left-[50%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
          <Typography
            variant="h6"
            sx={{ mb: 2, textAlign: "center", fontWeight: "semi-bold" }}
          >
            Confirm Delete
          </Typography>
          <Typography
            sx={{ mb: 3, textAlign: "center", fontFamily: "Poppins" }}
          >
            Are you sure you want to delete this user?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default AllCourses;
