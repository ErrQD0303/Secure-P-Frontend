import { useLoaderData } from "react-router-dom";
import useViewPort from "../hooks/useViewPort";
import { useTheme } from "@emotion/react";
import NotificationIcon from "./svg-icons/Notification";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { INotification } from "../types/notification";
import { limitString } from "../shared/helpers/strings";
import { formatNotificationTime } from "../shared/helpers/dates";
import blue from "@mui/material/colors/blue";

// type Props = {};

function NotificationButton() {
  const { notifications } = useLoaderData() as {
    notifications: INotification[];
  };
  const { viewWidth } = useViewPort();
  const theme = useTheme();
  const isMobile = viewWidth < theme.breakpoints.values.md;
  const hasNotification = notifications.length > 0;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const handleOpenUserMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);

    return clearInterval(intervalId);
  }, []);

  return (
    <>
      <Tooltip title="Notifications">
        <Button
          aria-label={"Profile Settings"}
          onClick={handleOpenUserMenu}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.625rem",
            cursor: "pointer",
            color: "#3D4B56",
            textTransform: "none",
            p: 0,
            flexGrow: 0,
            minWidth: "auto",
          }}
        >
          <NotificationIcon
            hasNotification={hasNotification}
            {...(!isMobile
              ? { fill: "#0093D0", stroke: "#fff" }
              : { fill: "#fff", stroke: "#0093D0" })}
          />
        </Button>
      </Tooltip>
      <Menu
        id="profile-menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={!!anchorElUser}
        onClose={handleCloseUserMenu}
        sx={{
          "& .MuiPaper-root": {
            ml: "1.6rem",
          },
        }}
      >
        <MenuItem
          key={"Notification Title"}
          sx={{
            pb: "0.9rem",
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
          disableTouchRipple
          divider
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "22.5rem",
            }}
          >
            <Typography
              sx={{
                color: "#3D4B56",
                fontWeight: 700,
                fontSize: "1.5rem",
                lineHeight: "1.75rem",
                textTransform: "capitalize",
              }}
            >
              Notifications
            </Typography>
            <MoreHorizIcon />
          </Box>
        </MenuItem>
        {notifications.map((notification: INotification) => (
          <MenuItem
            key={notification.id}
            divider
            sx={{
              flexBasis: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "22.5rem",
                color: "#3D4B56",
                fontSize: "0.9375rem",
                lineHeight: "1.25rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    fontSize: "inherit",
                    lineHeight: "inherit",
                  }}
                >
                  {notification.title}
                </Typography>
                <Box
                  sx={{
                    color: blue["A700"],
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    lineHeight: "1rem",
                  }}
                >
                  {formatNotificationTime(notification.timestamp, currentTime)}
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.813rem",
                  lineHeight: "inherit",
                  whiteSpace: "wrap",
                  /* whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis", */
                }}
              >
                {limitString(notification.message, 11)}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default NotificationButton;
