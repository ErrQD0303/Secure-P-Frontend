import Container from "@mui/material/Container";
import Grid, { Grid2Props } from "@mui/material/Grid2";
import React from "react";
import { useSelector } from "react-redux";
import {
  getAvatar,
  getAvatarKey,
  getProfilesPersonalInfo,
} from "../store/userSlice";
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
import Loader from "../components/Loader";
import { StaticFileUrl } from "../shared/constants/staticFileUrl";
import UploadImageModal from "../components/UploadImageModal";
import {
  IUpdatePasswordError,
  IUpdateProfilePersonalInfoError,
} from "../services/userService";

function Profiles() {
  const theme = useTheme();
  const fetcher = useFetcher();
  const {
    username: username,
    mobileNumber,
    dayOfBirth,
    fullName,
    email,
  } = useSelector(getProfilesPersonalInfo);
  const { routeName } = useOutletContext() as { routeName: string };
  const { viewWidth } = useViewPort();

  const userAvatar = useSelector(getAvatar);
  const userAvatarKey = useSelector(getAvatarKey);
  const avatar = userAvatar
    ? import.meta.env.VITE_BACKEND_URL + "/" + userAvatar
    : StaticFileUrl.DEFAULT_AVATAR;

  const [errors, setErrors] = React.useState<
    IUpdateProfilePersonalInfoError | IUpdatePasswordError | null
  >(null);

  const [showUploadImageModal, setShowUploadImageModal] = React.useState(false);

  const [showChangeProfileImage, setShowChangeProfileImage] =
    React.useState(false);

  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  const handleProfileImageClick = React.useCallback(() => {
    setShowUploadImageModal(true);
  }, []);

  const handleProfileImageMouseOver = React.useCallback(() => {
    // Add logic here if needed, or remove this callback if unused
    setShowChangeProfileImage(true);
    const profileImage = document.getElementById("profileImage");
    if (!profileImage) return;
    profileImage.style.transform = "scale(1.1)";
    profileImage.style.transition = "transform 0.3s ease-in-out";
  }, []);

  const handleProfileImageMouseOut = React.useCallback(() => {
    setShowChangeProfileImage(false);
    const profileImage = document.getElementById("profileImage");
    if (!profileImage) return;
    profileImage.style.transform = "scale(1)";
    profileImage.style.transition = "transform 0.3s ease-in-out";
  }, []);

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
          error?: boolean;
          helperText?: string | object;
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
            required: true,
            error: errors && "Email" in errors ? Boolean(errors.Email) : false,
            helperText: (errors && "Email" in errors ? errors.Email : "") || "",
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
            placeholder: "••••••••",
            required: true,
            error:
              errors && "CurrentPassword" in errors
                ? Boolean(errors?.CurrentPassword)
                : false,
            helperText:
              errors && "CurrentPassword" in errors
                ? errors.CurrentPassword
                : "",
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
            required: true,
            placeholder: "012345678",
            error: errors && "Phone" in errors ? Boolean(errors?.Phone) : false,
            helperText: (errors && "Phone" in errors && errors?.Phone) || "",
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
            label: "New Password",
            placeholder: "••••••••",
            error:
              errors && "NewPassword" in errors
                ? Boolean(errors?.NewPassword)
                : false,
            helperText:
              errors && "NewPassword" in errors ? errors.NewPassword : "",
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
            required: true,
            error:
              errors && "DayOfBirth" in errors
                ? Boolean(errors?.DayOfBirth)
                : false,
            helperText:
              errors && "DayOfBirth" in errors ? errors.DayOfBirth : "",
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
            placeholder: "••••••••",
            error:
              errors && "ConfirmPassword" in errors
                ? Boolean(errors?.ConfirmPassword)
                : false,
            helperText:
              errors && "ConfirmPassword" in errors
                ? errors.ConfirmPassword
                : "",
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
    [dayOfBirth, email, mobileNumber, theme.breakpoints, username, errors]
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

      if (submitAction === "savePersonalInfo") {
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const filterFields = ["email", "phone", "dayOfBirth"];
        const data = Object.fromEntries(
          Array.from(formData.entries()).filter(([key]) =>
            filterFields.includes(key)
          )
        );
        data.dayOfBirth = (() => {
          const [day, month, year] = (data.dayOfBirth as string).split("/");
          return `${year}-${month}-${day}`;
        })();
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

  React.useEffect(() => {
    if (fetcher.state === "idle") {
      if (!fetcher.data) {
        fetcher.load("/");
        return;
      }

      setErrors(fetcher.data as IUpdateProfilePersonalInfoError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.state, fetcher.load, fetcher.data]);

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
        {showUploadImageModal && (
          <UploadImageModal setShowModal={setShowUploadImageModal} />
        )}
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
                onClick={handleProfileImageClick}
                onMouseOver={handleProfileImageMouseOver}
                onMouseOut={handleProfileImageMouseOut}
                sx={{
                  width: "72px",
                  height: "69px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  position: "relative",
                  [theme.breakpoints.up("lg")]: {
                    width: "144px",
                    height: "138px",
                  },
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Box
                  key={userAvatarKey}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: `url('${avatar}') center/cover`,
                  }}
                  id="profileImage"
                ></Box>
                <Box
                  sx={{
                    display: "none",
                    [theme.breakpoints.up("lg")]: {
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: "rgba(0, 0, 0, 0.5)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      display: showChangeProfileImage ? "flex" : "none",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.8s",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: "1.25rem",
                      lineHeight: "1.875rem",
                      fontWeight: 600,
                    }}
                  >
                    Change
                  </Typography>
                </Box>
              </Box>
              <Stack>
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    lineHeight: "1.875rem",
                    fontWeight: 600,
                  }}
                >
                  {fullName}
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
                {errors && errors.summary && (
                  <Typography
                    variant="body2"
                    color="error"
                    bgcolor={"#FDE8E8"}
                    p={4}
                    sx={{
                      mb: 2,
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      lineHeight: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    {errors.summary}
                  </Typography>
                )}
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
                              error,
                              helperText,
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
                                  {error && (
                                    <Typography
                                      variant="body2"
                                      color="error"
                                      sx={{
                                        mb: 1,
                                      }}
                                    >
                                      {typeof helperText === "object"
                                        ? Object.values(helperText).map(
                                            (value: unknown, index: number) => (
                                              <React.Fragment key={index}>
                                                {value as string}
                                                <br />
                                              </React.Fragment>
                                            )
                                          )
                                        : helperText}
                                    </Typography>
                                  )}
                                  <TextField
                                    type={type}
                                    placeholder={placeholder}
                                    name={name}
                                    defaultValue={defaultValue}
                                    sx={{
                                      width: "100%", // Ensure the TextField spans the full width
                                    }}
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
                                    disableFuture={true}
                                    error={error}
                                    helperText={helperText as string}
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
                                error,
                                helperText,
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
                                          {error && (
                                            <Typography
                                              variant="body2"
                                              color="error"
                                              sx={{
                                                mb: 1,
                                              }}
                                            >
                                              {helperText as string}
                                            </Typography>
                                          )}
                                          <TextField
                                            type={type}
                                            placeholder={placeholder}
                                            defaultValue={defaultValue}
                                            name={name}
                                            sx={{
                                              width: "100%",
                                            }}
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
                                            disableFuture={true}
                                            error={error}
                                            helperText={helperText as string}
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
                                error,
                                helperText,
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
                                    {error && (
                                      <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{
                                          mb: 1,
                                        }}
                                      >
                                        {helperText as string}
                                      </Typography>
                                    )}
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
                                      disableFuture={true}
                                      error={error}
                                      helperText={helperText as string}
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
