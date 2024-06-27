import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link } from "react-router-dom";
import { selectUser } from "../store/auth/authSlice";
import { Login } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logOut } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ITI_Logo from "../assets/ITI_LOGO.png";

function formatRoute(string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

const defaultPages = ["events", "categories", "about", "faq"];

const settings = ["profile"];

function ResponsiveAppBar() {
  const [pages, setPages] = React.useState(defaultPages);
  const currentPage = window.location.pathname.split("/")[1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAuth = () => {
    if (user) {
      handleCloseUserMenu();
      dispatch(logOut());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  React.useEffect(() => {
    if (user?.role === "admin" && !pages.includes("admin")) {
      setPages((prev) => [...prev, "admin"]);
    }
  }, [user, pages]);

  return (
    <AppBar
      sx={{
        background:
          "linear-gradient(45deg, rgb(144, 27, 32), rgb(255, 107, 107))",
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              bgcolor: "white",
              borderRadius: 2,
              padding: "2px",
              paddingBottom: "4px",
              overflow: "hidden",
            }}
            component={Link}
            to="/"
          >
            <img src={ITI_Logo} alt="ITI" width={50} height={50} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages?.map((page) => (
                <MenuItem
                  component={Link}
                  to={page}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    {formatRoute(page)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <MenuItem
              component={Link}
              to="/"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                bgcolor: "white",
              }}
            >
              <img src={ITI_Logo} alt="ITI" width={50} height={50} />
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages?.map((page) => (
              <Button
                component={Link}
                to={page}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: page === currentPage ? "gold" : "white",
                  display: "block",
                }}
              >
                {formatRoute(page)}
              </Button>
            ))}
          </Box>

          {user && (
            <Box
              sx={{
                width: "200px",
                flexGrow: 1,
                display: "flex",
                justifyContent: "end",
              }}
            >
              {/* <Badge
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
                badgeContent={cartQuantity}
                color="error"
              >
                <IconButton color="inherit" component={Link} to="/cart">
                  <ShoppingCart />
                </IconButton>
              </Badge> */}
              <Tooltip title="Open settings">
                {/*     <Badge badgeContent={wishList?.length || 0} color="error"> */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.firstName?.charAt(0)}
                    src={user?.profileImage}
                  />
                </IconButton>
                {/* </Badge> */}
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings?.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      component={Link}
                      sx={{
                        textDecoration: "none",
                        color: setting === currentPage ? "gold" : "black",
                      }}
                      to={setting}
                      textAlign="center"
                    >
                      {formatRoute(setting)}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleAuth}>
                  <Typography
                    sx={{ textDecoration: "none", color: "black" }}
                    textAlign="center"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {!user && (
            <IconButton
              onClick={handleAuth}
              sx={{ mx: 2, color: "white", fontSize: 14 }}
            >
              Login
              <Login />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
