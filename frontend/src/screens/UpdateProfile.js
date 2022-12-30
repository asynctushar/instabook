import { Box, Typography, useMediaQuery, useTheme, TextField, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import FlexBetween from '../customs/FlexBetween';
import { EditOutlined } from '@mui/icons-material';
import { useEffect, Fragment } from 'react';
import userSlice from '../redux/slices/userSlice';
import { updateUser } from '../redux/actions/userAction';
import Loader from '../components/Loader';

const updateSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    avatar: yup.string()
})

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isUpdated, isUpdateLoading } = useSelector((state) => state.userState);
    const theme = useTheme();
    const isMobileScreen = useMediaQuery('(max-width: 800px)');
    const setUpdateStatus = userSlice.actions.setUpdateStatus;

    const initialValues = {
        name: user.name,
        email: user.email,
        location: user.location,
        occupation: user.occupation,
        avatar: ""
    }

    useEffect(() => {
        if (isUpdated) {
            navigate('/me');
            dispatch(setUpdateStatus(false));
        }
    }, [user, isUpdated, navigate, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    const submitHandler = (values) => {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('occupation', values.occupation);
        formData.append('location', values.location);

        if (typeof values.avatar !== 'string') {
            formData.append('avatar', values.avatar);
        }

        dispatch(updateUser(formData))
    }

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" minHeight="571px" width={isMobileScreen ? "93%" : "50%"} p="2rem" m="1rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
            {isUpdateLoading ? <Loader /> : (
                <Fragment>
                    <Typography color={theme.palette.primary.main} variant='h3' fontWeight="500" sx={{ mb: "1.5rem", textAlign: 'center' }}>
                        Update User Profile
                    </Typography>
                    <Formik onSubmit={submitHandler}
                        initialValues={initialValues}
                        validationSchema={updateSchema}

                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{
                                    "> div": {
                                        gridColumn: isMobileScreen ? "span 4" : "span 2"
                                    }
                                }}>
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
                                    <Box border={`1px solid ${Boolean(touched.avatar) && errors.avatar ? "#d32f2f" : theme.palette.neutral.medium}`} borderRadius="5px" p="1rem" gridColumn="span 4!important">
                                        <Dropzone
                                            acceptedFiles=".jpg, .jpeg, .png" multiple={false}
                                            onDrop={(acceptedFiles) => setFieldValue("avatar", acceptedFiles[0])}>
                                            {({ getRootProps, getInputProps }) => (
                                                <Box {...getRootProps()} border={`2px dashed ${theme.palette.primary.main}`} p="1rem"
                                                    sx={{ ":hover": { cursor: "pointer" } }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!values.avatar ? (
                                                        <Typography>Add New Profile Picture</Typography>
                                                    ) : (
                                                        <FlexBetween >
                                                            <Typography> {values.avatar.name}</Typography>
                                                            <EditOutlined />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                        {Boolean(touched.avatar) && errors.avatar && <Typography color="#d32f2f" fontSize="0.6428571428571428rem" mt="2px">{errors.avatar}</Typography>}
                                    </Box>

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
                                </Box>
                                <Box width="100%">
                                    <Button type="submit"
                                        variant="contained"
                                        sx={{
                                            m: "2rem auto",
                                            p: "1rem",
                                            display: "block",
                                            width: "60%",
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.background.alt,
                                        }}>
                                        Update
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Fragment>
            )}
        </Box>
    )
}
export default UpdateProfile;