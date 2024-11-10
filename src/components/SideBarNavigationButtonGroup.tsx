import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import SideBarNavigationButton from "./SideBarNavigationButton";
import React from "react";
import { useNavigate } from "react-router-dom";

const StyledStack = styled(Stack)({});

function SideBarNavigationButtonGroup() {
  const navigate = useNavigate();
  const navigationButtons = React.useMemo(
    () => [
      {
        to: "/subscriptions",
        ariaLabel: "My subscriptions",
        icon: "/src/assets/png-icons/my-subscriptions.png",
      },
      {
        to: "/payment-history",
        ariaLabel: "Payment history",
        icon: "/src/assets/png-icons/payment-history.png",
      },
      {
        to: "/subscriptions/add",
        ariaLabel: "Add New Subscription",
        icon: "/src/assets/png-icons/add-new.png",
      },
      {
        to: "/help-center",
        ariaLabel: "Help-center",
        icon: "/src/assets/png-icons/help-center.png",
      },
      {
        onClick: () => {
          navigate("/login");
        },
        ariaLabel: "Sign out",
        icon: "/src/assets/png-icons/log-out.png",
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
