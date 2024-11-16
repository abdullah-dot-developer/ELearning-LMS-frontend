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
  Typography,
  Stack,
  Modal,
} from "@mui/material";
import { useTheme } from "next-themes";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import toast from "react-hot-toast";
import Link from "next/link";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

interface Column {
  field: string;
  headerName: string;
  flex: number;
  align?: "left" | "right" | "center";
  renderCell?: (params: RowData) => JSX.Element;
}

interface RowData {
  id: string;
  title: string;
  ratings: string;
  purchased: string;
  created_at: string;
}

const AllCourses: React.FC = () => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [deleteCourse, { isSuccess, error: deleteError }] =
    useDeleteCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course deleted successfully");
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, deleteError, refetch]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID", flex: 0.5, align: "left" },
    { field: "title", headerName: "Course Title", flex: 1, align: "left" },
    { field: "ratings", headerName: "Ratings", flex: 0.5, align: "right" },
    { field: "purchased", headerName: "Purchased", flex: 0.5, align: "right" },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
      align: "right",
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      align: "center",
      renderCell: (row: RowData) => (
        <Link href={`/admin/edit-course/${row.id}`}>
          <CiEdit
            className={`${theme === "dark" ? "text-white" : "text-black"}`}
            size={20}
          />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      align: "center",
      renderCell: (row: RowData) => (
        <Button
          onClick={() => {
            setOpen(true);
            setCourseId(row.id);
          }}
        >
          <AiOutlineDelete
            className={`${theme === "dark" ? "text-white" : "text-black"}`}
            size={20}
          />
        </Button>
      ),
    },
  ];

  const rows: RowData[] = [];
  if (data) {
    data.courses.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.courseName,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: timeAgo.format(new Date(item.createdAt)),
      });
    });
  }

  return (
    <div className="mt-10 mx-auto max-w-screen-xl font-Poppins px-4">
      {isLoading ? (
        <Loader />
      ) : (
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
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
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
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        align={column.align}
                        style={{
                          color: theme === "dark" ? "white" : "black",
                          fontFamily: "Poppins",
                        }}
                      >
                        {column.renderCell
                          ? column.renderCell(row)
                          : row[column.field as keyof RowData]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {/* Delete Confirmation Modal */}
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
            Are you sure you want to delete this course?
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
