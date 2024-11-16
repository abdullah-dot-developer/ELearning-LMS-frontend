import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  People,
  Receipt,
  School,
  LiveTv,
  Build,
  Category,
  Assessment,
  LiveHelp,
  ArrowBackIos,
  ArrowForwardIos,
  BubbleChart,
  PeopleAlt,
  Diversity1,
} from "@mui/icons-material";
import Image from "next/image";
import defaultAvatar from "../../../../public/avatar2.png";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation"; // Import redirect from next/navigation

const navItems = [
  {
    section: "Dashboard",
    items: [{ text: "Dashboard", icon: <Dashboard />, route: "/admin" }],
  },
  {
    section: "Data",
    items: [
      { text: "Users", icon: <People />, route: "/admin/users" },
      { text: "Invoices", icon: <Receipt />, route: "/admin/invoices" },
    ],
  },
  {
    section: "Content",
    items: [
      {
        text: "Create Course",
        icon: <School />,
        route: "/admin/create-course",
      },
      { text: "Live Courses", icon: <LiveTv />, route: "/admin/live-courses" },
    ],
  },
  {
    section: "Customization",
    items: [
      { text: "Hero", icon: <Build />, route: "/admin/hero" },
      { text: "FAQ", icon: <LiveHelp />, route: "/admin/faq" },
      { text: "Categories", icon: <Category />, route: "/admin/categories" },
    ],
  },
  {
    section: "Controllers",
    items: [
      {
        text: "Manage Team",
        icon: <Diversity1 />,
        route: "/admin/manage-team",
      },
    ],
  },
  {
    section: "Analytics",
    items: [
      {
        text: "Courses Analytics",
        icon: <Assessment />,
        route: "/admin/courses-analytics",
      },
      {
        text: "Orders Analytics",
        icon: <BubbleChart />,
        route: "/admin/orders-analytics",
      },
      {
        text: "Users Analytics",
        icon: <PeopleAlt />,
        route: "/admin/users-analytics",
      },
    ],
  },
  {
    section: "Extras",
    items: [],
  },
];

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => setMounted(true), []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item); // Set selected item when clicked
    // Redirect to the defined route
    redirect(item.route);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: collapsed ? 80 : 250,
        "& .MuiDrawer-paper": {
          width: collapsed ? 80 : 250,
          backgroundColor: "#1A2A44",
          color: "#fff",
          paddingTop: "1rem",
          transition: "width 0.3s",
        },
      }}
    >
      {/* Header with company name and toggle button */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="0 1rem"
      >
        {!collapsed && (
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#B0BEC5" }}
          >
            ELearning
          </Typography>
        )}
        <IconButton onClick={toggleCollapse} sx={{ color: "#B0BEC5" }}>
          {collapsed ? <ArrowForwardIos /> : <ArrowBackIos />}
        </IconButton>
      </Box>

      {/* Profile image */}
      {!collapsed && (
        <Box sx={{ padding: "0 1rem", textAlign: "center" }}>
          <Image
            src={user?.avatar ? user.avatar.url : defaultAvatar}
            alt="Avatar of user"
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
            {user?.name}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
            Admin
          </Typography>
        </Box>
      )}

      {/* Navigation Items */}
      <List>
        {navItems.map((nav, index) => (
          <Box key={index}>
            {nav.section && !collapsed && (
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#B0BEC5",
                  margin: "1rem 0 0.5rem 0.5rem",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                }}
              >
                {nav.section}
              </Typography>
            )}
            {nav.items &&
              nav.items.map((item, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton
                    onClick={() => handleItemClick(item)} // Pass entire item
                    sx={{
                      color: selectedItem === item ? "#2196f3" : "#B0BEC5",
                      backgroundColor:
                        selectedItem === item.route ? "#283A5B" : "inherit",
                      "&:hover": { backgroundColor: "#2D3A50" },
                      justifyContent: collapsed ? "center" : "flex-start",
                      paddingLeft: collapsed ? "0" : "1.5rem",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "#B0BEC5",
                        minWidth: 0,
                        marginRight: collapsed ? 0 : 2,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={item.text} />}
                  </ListItemButton>
                </ListItem>
              ))}
            {nav.section === "Extras" && <Divider sx={{ mt: 2, mb: 1 }} />}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
//color:
// selectedItem === item.route ? "#2196f3" : "#B0BEC5",
