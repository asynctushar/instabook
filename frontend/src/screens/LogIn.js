import { Box, Typography, useMediaQuery, useTheme, TextField, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import FlexBetween from '../customs/FlexBetween';
import { EditOutlined } from '@mui/icons-material';
import { logInUser, registerUser } from '../redux/actions/userAction';

const registerSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    password: yup.string().min(8).required("Required"),
    avatar: yup.string().required("Required")
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required")
})

const initialValues = {
    name: "",
    email: "",
    location: "",
    occupation: "",
    password: "",
    avatar: ""
}

const LogIn = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.userState.isAuthenticated);
    const theme = useTheme();
    const isMobileScreen = useMediaQuery('(max-width: 800px)');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated]);

    const submitHandler = (values, onSubmitProps) => {
        if (pageType === "login") {
            const formData = {
                email: values.email,
                password: values.password
            }

            dispatch(logInUser(formData))
        } else {
            const formData = new FormData();

            for (let value in values) {
                formData.append(value, values[value]);
            }

            dispatch(registerUser(formData))
        }

        onSubmitProps.resetForm();
    }

    return (
        <Box width={isMobileScreen ? "93%" : "50%"} p="2rem" m="1rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
            <Typography color={theme.palette.primary.main} variant='h3' fontWeight="500" sx={{ mb: "1.5rem", textAlign: 'center' }}>
                Welcome to Instabook
            </Typography>
            <Formik onSubmit={submitHandler}
                // initialValues={ pageType === "login" ? initialValuesLogin : initialValuesRegister}
                initialValues={initialValues}
                validationSchema={pageType === "login" ? loginSchema : registerSchema}

            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{
                            "> div": {
                                gridColumn: isMobileScreen ? "span 4" : "span 2"
                            }
                        }}>
                            {pageType === "register" && (
                                <Fragment>
                                    <TextField
                                        label="Full Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        error={Boolean(touched.name) && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                        sx={{ gridColumn: "span 4!important" }}
                                    />
                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name="location"
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                    />
                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name="occupation"
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                    />
                                    <Box border={`1px solid ${theme.palette.neutral.medium}`} borderRadius="5px" p="1rem" gridColumn="span 4!important">
                                        <Dropzone
                                            acceptedFiles=".jpg, .jpeg, .png" multiple={false}
                                            onDrop={(acceptedFiles) => setFieldValue("avatar", acceptedFiles[0])}>
                                            {({ getRootProps, getInputProps }) => (
                                                <Box {...getRootProps()} border={`2px dashed ${theme.palette.primary.main}`} p="1rem"
                                                    sx={{ ":hover": { cursor: "pointer" } }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!values.avatar ? (
                                                        <Typography>Add Profile Picture</Typography>
                                                    ) : (
                                                        <FlexBetween >
                                                            <Typography> {values.avatar.name}</Typography>
                                                            <EditOutlined />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </Fragment>
                            )}

                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4!important" }}
                            />
                            <TextField
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={Boolean(touched.password) && errors.password}
                                sx={{ gridColumn: "span 4!important" }}
                            />

                        </Box>
                        <Box width="100%">
                            <Button type="submit"
                                sx={{
                                    m: "2rem auto",
                                    p: "1rem",
                                    display: "block",
                                    width: "60%",
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.background.alt,
                                    ":hover": {
                                        color: theme.palette.primary.main
                                    }
                                }}>
                                {pageType === "login" ? "Log In" : "Register"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    setPageType(pageType === "login" ? "register" : "login");
                                    resetForm();
                                }}
                                sx={{
                                    color: theme.palette.primary.main,
                                    ":hover": {
                                        cursor: "pointer",
                                        textDecoration: "underline"
                                    }
                                }}
                            >
                                {pageType === "login" ? "Don't have an account? Sign Up here." : "Already have an account? Log In here."}
                            </Typography>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
export default LogIn;