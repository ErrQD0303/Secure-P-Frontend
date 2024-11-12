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

const StyledStack = styled(Stack)({});

function SideBarNavigationButtonGroup() {
  const navigate = useNavigate();
  const navigationButtons = React.useMemo(
    () => [
      {
        to: "/subscriptions",
        ariaLabel: "My subscriptions",
        icon: mySubscriptionsImage,
      },
      {
        to: "/payment-history",
        ariaLabel: "Payment history",
        icon: paymentHistoryImage,
      },
      {
        to: "/subscriptions/add",
        ariaLabel: "Add New Subscription",
        icon: addNewImage,
      },
      {
        to: "/help-center",
        ariaLabel: "Help-center",
        icon: helpCenterImage,
      },
      {
        onClick: () => {
          navigate("/login");
        },
        ariaLabel: "Sign out",
        icon: logOutImage,
        sx: {
          px: 0,
        },
      },
    ],
    [navigate]
  );

  return (
    <StyledStack aria-label="navigation buttons group" spacing={1.5}>
      {navigationButtons.map(({ icon, ...props }) => (
        <SideBarNavigationButton
          key={props.ariaLabel}
          {...props}
          icon={<img src={icon} alt={props.ariaLabel} />}
        />
      ))}
    </StyledStack>
  );
}

export default SideBarNavigationButtonGroup;
