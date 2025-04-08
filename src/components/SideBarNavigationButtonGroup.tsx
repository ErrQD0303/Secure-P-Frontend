import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import SideBarNavigationButton from "./SideBarNavigationButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import mySubscriptionsImage from "/png-icons/my-subscriptions.png";
import paymentHistoryImage from "/png-icons/payment-history.png";
import addNewImage from "/png-icons/add-new.png";
import helpCenterImage from "/png-icons/help-center.png";
import logOutImage from "/png-icons/log-out.png";
/* import { useSelector } from "react-redux";
import { getUserPermissions } from "../store/userSlice";
import { AppPolicy } from "../types/enum"; */

const StyledStack = styled(Stack)({});

function SideBarNavigationButtonGroup() {
  // const userPermissions = useSelector(getUserPermissions);
  const navigate = useNavigate();
  const navigationButtons = React.useMemo(
    () => [
      {
        to: "/subscriptions",
        ariaLabel: "My subscriptions",
        icon: mySubscriptionsImage,
        show: true,
      },
      {
        to: "/payment-history",
        ariaLabel: "Payment history",
        icon: paymentHistoryImage,
        show: true,
      },
      {
        to: "/subscriptions/add",
        ariaLabel: "Add New Subscription",
        icon: addNewImage,
        show: true,
      },
      {
        to: "/help-center",
        ariaLabel: "Help-center",
        icon: helpCenterImage,
        show: true,
      },
      {
        onClick: () => {
          navigate("/logout");
        },
        ariaLabel: "Sign out",
        icon: logOutImage,
        sx: {
          px: 0,
        },
        show: true,
      },
    ],
    [navigate]
  );

  return (
    <StyledStack aria-label="navigation buttons group" spacing={1.5}>
      {navigationButtons.map(({ icon, show, ...props }) =>
        !show ? null : (
          <SideBarNavigationButton
            key={props.ariaLabel}
            {...props}
            icon={<img src={icon} alt={props.ariaLabel} />}
          />
        )
      )}
    </StyledStack>
  );
}

export default SideBarNavigationButtonGroup;
