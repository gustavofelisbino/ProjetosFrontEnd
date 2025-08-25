import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import type { AppBarProps as MuiAppBarProps } from "@mui/material";
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Divider,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  Person as UserIcon,
  CardGiftcard as CardGiftcardIcon,
  PhonelinkLock as PhonelinkLockIcon,
  Help as HelpIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../themes";
import AvatarHeaderInicio from "./AvatarHeader";
import CustomIconButtonHeaderInicio from "./CustomIconButtonHeaderInicio";
import SidebarUnderHeader from "./SidebarUnderHeader";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "40ch",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
}));

interface PrimarySearchAppBarProps extends MuiAppBarProps {
}

export default function PrimarySearchAppBar({ color = 'primary', ...props }: PrimarySearchAppBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const renderProfileMenu = (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Minha Conta</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      id="mobile-menu"
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Mensagens</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificações</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, width: '100%', '& .MuiAppBar-root': { minHeight: '64px' } }}>
        <MuiAppBar 
          position="static" 
          color={color} 
          {...props} 
          elevation={0}
          sx={{ 
            ...props.sx, 
            '&.MuiAppBar-root': { 
              padding: 0,
              margin: 0,
              minHeight: '64px!important',
              '& .MuiToolbar-root': {
                minHeight: '64px!important',
                padding: '0 16px!important',
                margin: 0
              }
            }
          }}
        >
          <Toolbar disableGutters>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <SidebarUnderHeader open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <MenuIcon 
                onClick={() => setSidebarOpen((prev) => !prev)} 
                sx={{ cursor: 'pointer' }}
              />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Projeto React
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Procurar..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                ml: "auto",
              }}
            >
              <CustomIconButtonHeaderInicio
                color="inherit"
                icon={<CardGiftcardIcon />}
              />
              <CustomIconButtonHeaderInicio
                color="inherit"
                icon={<PhonelinkLockIcon />}
              />
              <CustomIconButtonHeaderInicio
                color="inherit"
                icon={<HelpIcon />}
              />
              <CustomIconButtonHeaderInicio
                color="inherit"
                icon={<ChatIcon />}
              />
              <CustomIconButtonHeaderInicio
                color="inherit"
                icon={<NotificationsIcon />}
              />

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  height: "30px",
                  my: "auto",
                }}
              />
              <AvatarHeaderInicio
                userIcon={<UserIcon />}
                nomeUsuario="Gustavo"
                nomeUnidade="Projeto React"
              />
            </Box>
          </Toolbar>
        </MuiAppBar>

        {renderMobileMenu}
        {renderProfileMenu}
      </Box>
    </ThemeProvider>
  );
}
