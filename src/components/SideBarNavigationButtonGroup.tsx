import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import SideBarNavigationButton from "./SideBarNavigationButton";

const StyledStack = styled(Stack)();

function SideBarNavigationButtonGroup() {
  return (
    <StyledStack aria-label="navigation buttons group" spacing={1.5}>
      <SideBarNavigationButton
        to="/subscriptions"
        ariaLabel="My subscriptions"
        icon={<img src="/src/assets/png-icons/my-subscriptions.png"></img>}
      />
      <SideBarNavigationButton
        to="/payment-history"
        ariaLabel="Payment history"
        icon={<img src="/src/assets/png-icons/payment-history.png"></img>}
      />
      <SideBarNavigationButton
        to="/subscriptions/add"
        ariaLabel="Add New Subscription"
        icon={<img src="/src/assets/png-icons/add-new.png"></img>}
      />
      <SideBarNavigationButton
        to="/help-center"
        ariaLabel="Help-center"
        icon={<img src="/src/assets/png-icons/help-center.png"></img>}
      />
      <SideBarNavigationButton
        to="/"
        ariaLabel="Sign out"
        icon={<img src="/src/assets/png-icons/log-out.png"></img>}
      />
    </StyledStack>
  );
}

export default SideBarNavigationButtonGroup;
