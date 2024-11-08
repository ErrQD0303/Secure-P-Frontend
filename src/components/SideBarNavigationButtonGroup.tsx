import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import SideBarNavigationButton from "./SideBarNavigationButton";
import React from "react";

const StyledStack = styled(Stack)({});

function SideBarNavigationButtonGroup() {
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
        onClick: () => {},
        ariaLabel: "Sign out",
        icon: "/src/assets/png-icons/log-out.png",
      },
    ],
    []
  );

  return (
    <StyledStack aria-label="navigation buttons group" spacing={1.5}>
      {navigationButtons.map(({ icon, ...props }) => (
        <SideBarNavigationButton
          {...props}
          icon={<img src={icon} alt={props.ariaLabel} />}
        />
      ))}
    </StyledStack>
  );
}

export default SideBarNavigationButtonGroup;
