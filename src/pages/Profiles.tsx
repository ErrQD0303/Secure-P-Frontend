import Container from "@mui/material/Container";
import Grid, { Grid2Props } from "@mui/material/Grid2";
import React from "react";
import { useSelector } from "react-redux";
import { getProfilesPersonalInfo } from "../store/userSlice";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../shared/helpers/objects";
import { useFetcher, useOutletContext } from "react-router-dom";
import CustomTabPanel from "../components/CustomTabPanel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTheme } from "@emotion/react";
import AppDatePicker from "../components/AppDatePicker";
import useViewPort from "../hooks/useViewPort";
import dayjs from "dayjs";
import avatarImage from "/avatar.png";
import Loader from "../components/Loader";

function Profiles() {
  const theme = useTheme();
  const fetcher = useFetcher();
  const {
    userName: username,
    mobileNumber,
    dayOfBirth,
    email,
  } = useSelector(getProfilesPersonalInfo);
  const { routeName } = useOutletContext() as { routeName: string };
  const { viewWidth } = useViewPort();

  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  const tabs: {
    [key: string]: {
      name: string;
      formFields: {
        [key: string]: Omit<
          Grid2Props,
          | "id"
          | "type"
          | "label"
          | "name"
          | "placeholder"
          | "value"
          | "defaultValue"
          | "required"
        > & {
          id: string;
          type: string;
          label: string;
          name?: string;
          placeholder?: string;
          value?: dayjs.Dayjs | string;
          defaultValue?: string | dayjs.Dayjs | undefined;
          required?: boolean;
          buttonProps?: ButtonProps;
        };
      };
    };
  } = React.useMemo(
    () => ({
      Personal: {
        name: "Personal",
        formFields: {
          username: {
            type: "normalText",
            id: "username",
            label: "User Name",
            defaultValue: username || "",
            size: {
              base: 12,
              lg: 12,
            },
          },
          email: {
            type: "email",
            id: "email",
            name: "email",
            label: "Email",
            defaultValue: email || "",
            placeholder: "anyone@gmail.com",
            size: {
              base: 12,
              lg: 4,
            },
            sx: {
              mt: "1rem",
              [theme.breakpoints.up("lg")]: {
                mt: 0,
              },
            },
          },
          currentPassword: {
            type: "password",
            id: "currentPassword",
            name: "currentPassword",
            label: "Current Password",
            placeholder: "******",
            offset: {
              base: 0,
              lg: 1,
            },
            size: {
              base: 12,
              lg: 4,
            },
            sx: {
              mt: "2rem",
              [theme.breakpoints.up("md")]: {
                mt: "1rem",
              },
            },
          },
          phoneNumber: {
            type: "phone",
            id: "phone",
            name: "phone",
            label: "Phone Number",
            defaultValue: mobileNumber,
            placeholder: "012345678",
            offset: {
              base: 0,
            },
            size: {
              base: 12,
              lg: 4,
            },
            sx: {
              mt: "0",
              [theme.breakpoints.up("lg")]: {
                mt: "0.7rem",
              },
            },
          },
          newPassword: {
            type: "password",
            id: "newPassword",
            name: "newPassword",
            label: "new Password",
            placeholder: "*******",
            required: true,
            offset: {
              base: 0,
              lg: 1,
            },
            size: {
              base: 12,
              lg: 4,
            },
            sx: {
              mt: "0",
              [theme.breakpoints.up("lg")]: {
                mt: "0.7rem",
              },
            },
          },
          dayOfBirth: {
            type: "date",
            id: "dayOfBirth",
            name: "dayOfBirth",
            label: "Day of Birth",
            defaultValue: dayjs(dayOfBirth),
            placeholder: "dd/mm/yyyy",
            offset: {
              base: 0,
            },
            size: {
              base: 12,
              lg: 4,
            },
            sx: {
              mt: "0",
              [theme.breakpoints.up("lg")]: {
                mt: "0.7rem",
              },
            },
          },
          retypeNewPassword: {
            type: "password",
            id: "retypeNewPassword",
            name: "retypeNewPassword",
            label: "Re-type New Password",
            required: true,
            placeholder: "••••••",
            offset: {
              base: 0,
              lg: 1,
            },
            size: {
              base: 12,
              lg: 4,
            },
            sx: {
              mt: "0",
              [theme.breakpoints.up("lg")]: {
                mt: "0.7rem",
              },
            },
          },
          saveChangeButton: {
            type: "button",
            id: "saveChangeButton",
            name: "savePersonalInfo",
            label: "Save Changes",
            offset: {
              base: 0,
            },
            size: {
              base: 12,
              lg: 4,
            },
            sx: {
              mt: "0",
              [theme.breakpoints.up("lg")]: {
                mt: "0.7rem",
              },
            },
            buttonProps: {
              variant: "contained",
              color: "primary",
              type: "submit",
              value: "savePersonalInfo",
              sx: {
                width: "100%",
                px: "2.375rem",
                py: "0.75rem",
                textTransform: "capitalize",
                [theme.breakpoints.up("lg")]: {
                  width: "auto",
                },
              },
            },
          },
          UpdatePasswordButton: {
            type: "button",
            id: "updatePasswordButton",
            name: "updatePassword",
            label: "Update Password",
            offset: {
              base: 0,
              lg: 1,
            },
            size: {
              base: 12,
              lg: 4,
            },
            sx: {
              mt: "0",
              [theme.breakpoints.up("lg")]: {
                mt: "0.7rem",
              },
            },
            buttonProps: {
              type: "submit",
              variant: "contained",
              color: "primary",
              value: "updatePassword",
              sx: {
                width: "100%",
                px: "2.375rem",
                py: "0.75rem",
                textTransform: "capitalize",
                [theme.breakpoints.up("lg")]: {
                  width: "auto",
                },
              },
            },
          },
        },
      },
      billingAddress: {
        name: "Billing Address",
        formFields: {},
      },
      promotions: {
        name: "Promotions",
        formFields: {},
      },
    }),
    [dayOfBirth, email, mobileNumber, theme.breakpoints, username]
  );
  const [currentTab, setCurrentTab] = React.useState<number | null>(0);
  const mainComponentRef = React.useRef<HTMLDivElement>(null);
  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setCurrentTab(newValue);
    },
    []
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLElement>) => {
      event.preventDefault();
      const submitAction = (
        event.nativeEvent as SubmitEvent
      ).submitter?.getAttribute("name");
      console.log(event);
      if (submitAction === "savePersonalInfo") {
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        console.log(Object.fromEntries(formData));
        const filterFields = ["email", "phone", "dayOfBirth"];
        const data = Object.fromEntries(
          Array.from(formData.entries()).filter(([key]) =>
            filterFields.includes(key)
          )
        );
        fetcher.submit(new URLSearchParams(data as Record<string, string>), {
          method: "put",
          action: "/profiles/update-personal-info",
        });
      }
      if (submitAction === "updatePassword") {
        const formData = new FormData(event.target as HTMLFormElement);
        const filterFields = [
          "currentPassword",
          "newPassword",
          "retypeNewPassword",
        ];
        const data = Object.fromEntries(
          Array.from(formData.entries()).filter(([key]) =>
            filterFields.includes(key)
          )
        );
        console.log(data);
        fetcher.submit(new URLSearchParams(data as Record<string, string>), {
          method: "put",
          action: "/profiles/update-password",
        });
      }
    },
    [fetcher]
  );

  React.useEffect(() => {
    const scrollToMainContent = async () => {
      if (mainComponentRef.current) {
        mainComponentRef.current.scrollIntoView();
      }
    };
    scrollToMainContent();
  }, []);
  return (
    <>
      <Paper
        sx={{
          boxShadow: "0px 4px 4px 0px #B8C5D033",
          border: "1px solid #D8E0ED",
          mt: 0,
          [theme.breakpoints.up("lg")]: {
            mt: "3rem",
          },
        }}
        ref={mainComponentRef}
      >
        {isLoading && <Loader />}
        <Container
          sx={{
            px: 0,
            pb: {
              base: "6.8rem",
              lg: 0,
            },
            fontSize: "0.875rem",
            lineHeight: "1rem",
            color: "#3D4B56",
            [theme.breakpoints.up("lg")]: {
              px: 0,
            },
          }}
        >
          <Box>
            <Stack
              direction={"row"}
              spacing={4}
              sx={{
                alignItems: "center",
                justifyContent: "start",
                p: "2.875rem",
                pb: "1rem",
              }}
            >
              <Box
                aria-label="profile images"
                sx={{
                  width: "72px",
                  height: "69px",
                  borderRadius: "50%",
                  background: `url('${avatarImage}') center/cover`,
                  [theme.breakpoints.up("lg")]: {
                    width: "144px",
                    height: "138px",
                  },
                }}
              ></Box>
              <Stack>
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    lineHeight: "1.875rem",
                    fontWeight: 600,
                  }}
                >
                  {username}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    lineHeight: "1.313rem",
                    fontWeight: 500,
                    color: "#A3B0BF",
                  }}
                >
                  {email}
                </Typography>
              </Stack>
            </Stack>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="Profiles tabs"
              centered
              sx={{
                borderBottom: "1px solid #DEE7EE",
              }}
            >
              {Object.entries(tabs).map(([key, value], index) => (
                <Tab
                  key={key}
                  label={value.name}
                  value={index}
                  sx={{
                    textTransform: "capitalize",
                  }}
                  {...a11yProps(index, routeName)}
                />
              ))}
            </Tabs>
            {Object.entries(tabs).map(([key, value], index) => (
              <CustomTabPanel
                index={index}
                value={currentTab as number}
                pageName={routeName}
                key={key}
                sx={{
                  p: "1rem",
                  [theme.breakpoints.up("lg")]: {
                    p: "3.125rem",
                  },
                }}
              >
                <fetcher.Form method="PUT" onSubmit={handleSubmit}>
                  <Grid
                    container
                    columns={12}
                    rowGap={{
                      base: 2,
                      lg: 3,
                    }}
                    wrap={"wrap"}
                  >
                    {viewWidth >= theme.breakpoints.values.lg ? (
                      <>
                        {Object.entries(value.formFields).map(
                          ([
                            subKey,
                            {
                              type,
                              label,
                              name,
                              sx,
                              placeholder,
                              defaultValue,
                              buttonProps,
                              ...subValue
                            },
                          ]) => (
                            <Grid
                              key={subKey}
                              sx={{
                                ...sx,
                                display: "none",
                                [theme.breakpoints.up("lg")]: {
                                  display: "block",
                                },
                              }}
                              {...subValue}
                            >
                              {type === "normalText" && (
                                <Stack direction="row" gap={4}>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontSize: "inherit",
                                      lineHeight: "inherit",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {label}
                                  </Typography>
                                  <Box
                                    sx={{
                                      color: "#A3B0BF",
                                    }}
                                  >
                                    {username}
                                  </Box>
                                </Stack>
                              )}
                              {["text", "phone", "password", "email"].includes(
                                type
                              ) && (
                                <Stack spacing={1} sx={{}}>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontSize: "inherit",
                                      lineHeight: "inherit",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {label}
                                  </Typography>
                                  <TextField
                                    type={type}
                                    placeholder={placeholder}
                                    name={name}
                                    defaultValue={defaultValue}
                                    sx={{}}
                                  />
                                </Stack>
                              )}
                              {type === "date" && (
                                <Stack spacing={1} sx={{}}>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontSize: "inherit",
                                      lineHeight: "inherit",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {label}
                                  </Typography>
                                  <AppDatePicker
                                    name={name}
                                    defaultValue={defaultValue as dayjs.Dayjs}
                                  />
                                </Stack>
                              )}
                              {type === "button" && (
                                <Button name={name} {...buttonProps}>
                                  {label}
                                </Button>
                              )}
                            </Grid>
                          )
                        )}
                      </>
                    ) : (
                      <>
                        {Object.entries(value.formFields)
                          .filter((_e, idx) => {
                            switch (key.toLowerCase()) {
                              case "personal":
                                return idx % 2 !== 0;
                              default:
                                return false;
                            }
                          })
                          .map(
                            ([
                              subKey,
                              {
                                type,
                                label,
                                name,
                                sx,
                                placeholder,
                                defaultValue,
                                buttonProps,
                                ...subValue
                              },
                            ]) => (
                              <Grid
                                key={subKey}
                                sx={{
                                  ...sx,
                                  display: "block",
                                  [theme.breakpoints.up("lg")]: {
                                    display: "none",
                                  },
                                }}
                                {...subValue}
                              >
                                {(() => {
                                  switch (type) {
                                    case "normalText":
                                      return (
                                        <Stack direction="row" gap={4}>
                                          <Typography
                                            variant="body1"
                                            sx={{
                                              fontSize: "inherit",
                                              lineHeight: "inherit",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {label}
                                          </Typography>
                                          <Box
                                            sx={{
                                              color: "#A3B0BF",
                                            }}
                                          >
                                            {username}
                                          </Box>
                                        </Stack>
                                      );
                                    case "text":
                                    case "password":
                                    case "email":
                                    case "phone":
                                      return (
                                        <Stack spacing={1} sx={{}}>
                                          <Typography
                                            variant="body1"
                                            sx={{
                                              fontSize: "inherit",
                                              lineHeight: "inherit",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {label}
                                          </Typography>
                                          <TextField
                                            type={type}
                                            placeholder={placeholder}
                                            defaultValue={defaultValue}
                                            name={name}
                                            sx={{}}
                                          />
                                        </Stack>
                                      );
                                    case "date":
                                      return (
                                        <Stack spacing={1} sx={{}}>
                                          <Typography
                                            variant="body1"
                                            sx={{
                                              fontSize: "inherit",
                                              lineHeight: "inherit",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {label}
                                          </Typography>
                                          <AppDatePicker
                                            name={name}
                                            defaultValue={
                                              defaultValue as dayjs.Dayjs
                                            }
                                          />
                                        </Stack>
                                      );
                                    case "button":
                                      return (
                                        <Button name={name} {...buttonProps}>
                                          {label}
                                        </Button>
                                      );
                                    default:
                                      return null;
                                  }
                                })()}
                              </Grid>
                            )
                          )}
                        {Object.entries(value.formFields)
                          .filter((_e, idx) => {
                            switch (key.toLowerCase()) {
                              case "personal":
                                return idx !== 0 && idx % 2 === 0;
                              default:
                                return false;
                            }
                          })
                          .map(
                            ([
                              subKey,
                              {
                                type,
                                label,
                                name,
                                sx,
                                placeholder,
                                defaultValue,
                                buttonProps,
                                ...subValue
                              },
                            ]) => (
                              <Grid
                                key={subKey}
                                sx={{
                                  ...sx,
                                  display: "block",
                                  [theme.breakpoints.up("lg")]: {
                                    display: "none",
                                  },
                                }}
                                {...subValue}
                              >
                                {type === "normalText" && (
                                  <Stack direction="row" gap={4}>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "inherit",
                                        lineHeight: "inherit",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {label}
                                    </Typography>
                                    <Box
                                      sx={{
                                        color: "#A3B0BF",
                                      }}
                                    >
                                      {username}
                                    </Box>
                                  </Stack>
                                )}
                                {[
                                  "text",
                                  "phone",
                                  "password",
                                  "email",
                                ].includes(type) && (
                                  <Stack spacing={1} sx={{}}>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "inherit",
                                        lineHeight: "inherit",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {label}
                                    </Typography>
                                    <TextField
                                      type={type}
                                      placeholder={placeholder}
                                      defaultValue={defaultValue}
                                      name={name}
                                      sx={{}}
                                    />
                                  </Stack>
                                )}
                                {type === "dayInput" && (
                                  <Stack spacing={1} sx={{}}>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "inherit",
                                        lineHeight: "inherit",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {label}
                                    </Typography>
                                    <AppDatePicker
                                      name={name}
                                      defaultValue={defaultValue as dayjs.Dayjs}
                                    />
                                  </Stack>
                                )}
                                {type === "button" && (
                                  <Button name={name} {...buttonProps}>
                                    {label}
                                  </Button>
                                )}
                              </Grid>
                            )
                          )}
                      </>
                    )}
                  </Grid>
                </fetcher.Form>
              </CustomTabPanel>
            ))}
          </Box>
        </Container>
      </Paper>
    </>
  );
}

export default Profiles;
