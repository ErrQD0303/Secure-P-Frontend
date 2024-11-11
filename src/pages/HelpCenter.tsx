import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { a11yProps } from "../shared/helpers/objects";
import Container from "@mui/material/Container";
import CustomTabPanel from "../components/CustomTabPanel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@emotion/react";
import SpeakerIcon from "../components/svg-icons/Speaker";
import QuestionMarkIcon from "../components/svg-icons/QuestionMark";
import TwoArrowsIcon from "../components/svg-icons/TwoArrows";
import FlagIcon from "../components/svg-icons/Flag";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

// type Props = {};
const FAKE_DATA: {
  [key: string]: {
    [subKey: string]: {
      questions: { question: string; url: string }[];
      icon: React.ReactNode;
    };
  };
} = {
  FAQ: {
    ["Getting Started"]: {
      questions: [],
      icon: <FlagIcon />,
    },
    ["Transaction Issues"]: {
      questions: [
        { question: "How to make parking easy and cost effective?", url: "/" },
        { question: "Can I change the date and time of my booking", url: "/" },
        { question: "Can I change my booking?", url: "/" },
        { question: "Can I cancel my booking?", url: "/" },
      ],
      icon: <TwoArrowsIcon />,
    },
    ["Important Updates"]: {
      questions: [],
      icon: <SpeakerIcon />,
    },
    ["Billing & Plan"]: {
      questions: [],
      icon: <FlagIcon />,
    },
    ["Your Account"]: {
      questions: [],
      icon: <TwoArrowsIcon />,
    },
  },
  ["My Query"]: {},
};

function HelpCenter() {
  const [currentTab, setCurrentTab] = React.useState("0");
  const [currentSubTab, setCurrentSubTab] = React.useState("1");
  const [search, setSearch] = React.useState("");
  const pageName = React.useMemo(() => "HelpCenter", []);

  const topics = Object.entries(FAKE_DATA)[+currentTab][1];

  const issues = React.useMemo(() => {
    const selectedTopicIssues =
      Object.keys(topics).length > 0
        ? Object.entries(topics)[+currentSubTab][1].questions
        : [];
    console.log(selectedTopicIssues);
    if (!search || search.trim() === "") {
      return selectedTopicIssues;
    }
    return selectedTopicIssues.filter(({ question }) =>
      question.toLowerCase().includes(search.toLowerCase())
    );
  }, [currentSubTab, search, topics]);

  const handleTextChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
      setCurrentSubTab("0");
    },
    []
  );

  const handleSubTabClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const key = event.currentTarget.getAttribute("data-key");
      setCurrentSubTab(key || "0");
    },
    []
  );
  const navigate = useNavigate();

  const handleIssueClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      navigate(event.currentTarget.getAttribute("data-url") || "/");
    },
    [navigate]
  );
  const theme = useTheme();

  return (
    <Container
      sx={{
        width: "100%",
        color: "#3D4B56",
        px: "1.437rem",
        pb: {
          base: "6.8rem",
          md: 0,
        },
        mt: "1.438rem",
      }}
    >
      <Box>
        <TextField
          id={"search-input"}
          variant="outlined"
          placeholder={"Help articles and FAQs"}
          sx={{
            width: "100%",
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          }}
          value={search}
          onChange={handleTextChange}
          slotProps={{
            input: {
              /* sx: {
            "& .MuiInputAdornment-root": {
              display: "none",
            },
          }, */
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "black",
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{}}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Help Center Tabs"
          sx={{
            borderBottom: "1px solid #EAEFF5",
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {Object.entries(FAKE_DATA).map(([name], index) => (
            <Tab
              label={name}
              key={index}
              value={index.toString()}
              {...a11yProps(0, pageName)}
            ></Tab>
          ))}
        </Tabs>
        <Stack
          direction={{
            base: "column-reverse",
            md: "column",
          }}
        >
          {Object.entries(FAKE_DATA).map(
            ([, value], index) =>
              Object.keys(value).length > 0 && (
                <CustomTabPanel
                  pageName={pageName}
                  value={+currentTab}
                  index={index}
                  key={index}
                >
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1rem",
                      fontWeight: 500,
                      mt: "1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Select a Topic
                  </Typography>
                  <Box
                    sx={{
                      p: "1.375rem 0.8rem",
                    }}
                  >
                    <Grid
                      container
                      columns={{
                        base: 3,
                        lg: 6,
                      }}
                      columnGap={{
                        base: 1,
                        md: "1.75rem",
                      }}
                      rowGap={3}
                      sx={{
                        alignItems: "start",
                        border: "none",
                        [theme.breakpoints.up("lg")]: {},
                      }}
                    >
                      {Object.entries(value).map(([key, val], subIdx) => (
                        <Grid
                          component={Button}
                          key={subIdx}
                          data-key={subIdx.toString()}
                          size={1}
                          sx={{
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            fontWeight: 500,
                            maxWidth: "5.938rem",
                            textTransform: "capitalize",
                            color:
                              currentSubTab === subIdx.toString()
                                ? theme.palette.primary.main
                                : "inherit",
                          }}
                          onClick={handleSubTabClick}
                        >
                          <Stack
                            spacing={1.5}
                            sx={{
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                            }}
                          >
                            <Stack
                              sx={{
                                width: "4rem",
                                height: "4rem",
                                borderRadius: "50%",
                                bgcolor:
                                  currentSubTab === subIdx.toString()
                                    ? theme.palette.primary.main
                                    : "#EAEFF5",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {val.icon &&
                                React.cloneElement(
                                  val.icon as React.ReactElement,
                                  {
                                    innerFill:
                                      currentSubTab === subIdx.toString()
                                        ? "#fff"
                                        : "#5E6A78",
                                  }
                                )}
                            </Stack>
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                lineHeight: "1rem",
                                fontWeight: 500,
                                width: "5.938rem",
                              }}
                            >
                              {key}
                            </Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </CustomTabPanel>
              )
          )}
          <Stack>
            <Typography
              sx={{
                fontSize: "0.875rem",
                lineHeight: "1rem",
                fontWeight: 500,
                mt: "1rem",
                textTransform: "uppercase",
                display: "block",
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              }}
            >
              Select an issue
            </Typography>
            <Typography
              sx={{
                fontSize: "0.875rem",
                lineHeight: "1rem",
                fontWeight: 500,
                mt: "1rem",
                textTransform: "uppercase",
                display: "none",
                [theme.breakpoints.up("md")]: {
                  display: "block",
                },
              }}
            >
              {Object.entries(topics)[+currentSubTab]?.[0]}
            </Typography>
            <List
              sx={{
                pt: "1.375rem",
                pb: "0.3rem",
              }}
            >
              {issues.map((issue, idx) => (
                <ListItem
                  disablePadding
                  key={idx}
                  sx={{
                    display: "block",
                    width: "100%",
                    py: "1.25rem",
                    textTransform: "capitalize",
                    justifyContent: "flex-start",
                    p: 0,
                  }}
                >
                  <ListItemButton
                    component="button"
                    sx={{
                      gap: "0.4rem",
                      p: 0,
                    }}
                    onClick={handleIssueClick}
                    data-url={issue.url}
                  >
                    <ListItemIcon
                      sx={{
                        flex: "0 1 auto",
                        minWidth: "auto",
                        alignItems: "start",
                        justifyContent: "center",
                        display: "flex",
                        alignSelf: "flex-start",
                        transform: "translateY(0.45rem)",
                      }}
                    >
                      <QuestionMarkIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        flex: 1,
                        "& .MuiListItemText-primary": {
                          fontSize: "0.875rem",
                          lineHeight: "1.313rem",
                          textTransform: "none",
                        },
                      }}
                      primary={issue.question}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default HelpCenter;
