import * as React from 'react';
import emailjs from '@emailjs/browser';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginApi from '../../api/login/loginApi';
import CreateNotification from '../../common/notification/notification';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {


    useNavigate

} from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Bản quyền website thuộc vũ trí tâm © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const history = useNavigate();
    const [sentMail, setMail] = React.useState()
    const [userLogin, setUserLogin] = React.useState()
    const [getEmail, setGetEmail] = React.useState({
        emailUser: ""
    })
    // const form = React.useRef();

    // const sendEmail = (e) => {
    //     // e.preventDefault();
    //     console.log(e, 'eee');
    //     console.log(form, 'form');
    //     emailjs.sendForm('service_wmacn8e', 'template_dvxbxws', form.current, 'ptAo4p6XaONqw8tkz')
    //         .then((result) => {
    //             console.log(result.text);
    //         }, (error) => {
    //             console.log(error.text);
    //         });
    // };

    React.useEffect(() => {
        LoginApi.getUserLogin()?.then((login) => setUserLogin(login?.data?.accessToken))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const getConfirm = Number(data.get('confirm'))

        // console.log(typeof (data));
        const registerUser = {
            userName: `${data.get('firstName')}${data.get('lastName')}`,
            email: data.get('email'),
            password: data.get('password'),
        }
        const filterUserDupplicate = userLogin?.filter((userLogin) => userLogin.userName === registerUser.userName)
        try {
            if (data.get('firstName') !== "" && data.get('lastName') !== "" && data.get('email') !== "" && data.get('password') !== "") {

                if (filterUserDupplicate.length > 0) {
                    CreateNotification.error('Thông báo', 'Đã tồn tại người dùng tên này')

                } else {
                    if (getConfirm === sentMail) {

                        LoginApi.registerUser(registerUser)?.then((response) => {
                            if (response?.data.success) {
                                CreateNotification.success('Thông báo', 'Đăng ký thành công')
                                history('/')
                            }
                        })
                    } else {
                        CreateNotification.error('Thông báo', 'Kiểm tra lại mã xác nhận mail')
                    }
                }

            } else {

                CreateNotification.error('Thông báo', 'Vui lòng điền đầy đủ thông tin')
            }


        } catch (error) {
            CreateNotification.error('Thông báo', 'Có lỗi xảy ra vui lòng thử lại')
        }

        // console.log(registerUser);
    };

    const handleSentMail = () => {
        let rand = Math.round(Math.random() * 4000)
        setMail(rand)
        console.log({ content: `Mã xác nhận: ${rand}`, email: getEmail.emailUser, subject: "Xác nhận đăng ký tài khoản" }, 998)
        try {
            if (!getEmail.emailUser) {
                CreateNotification.error('Thông báo', 'Điền mail trước đã')
            } else {
                LoginApi.sentMailConfirm({ content: rand, email: getEmail.emailUser, subject: "Xác nhận đăng ký tài khoản" }).then((res) => console.log(res, 444))
                CreateNotification.success('Thông báo', 'Đã gửi tới mail')
            }

        } catch (error) {
            CreateNotification.error('Thông báo', 'Có lỗi xảy ra vui lòng thử lại')
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up to app manager
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setGetEmail({ emailUser: e?.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            {/* <Grid item xs={12} style={{ display: 'flex' }} ref={form}>
                                <TextField

                                    required
                                    fullWidth
                                    id="confirm"
                                    label="Confirm email"
                                    type="email"
                                    name="user_email"
                                    autoComplete="email"
                                />
                                <Button className='btn bg-warning text-white format-btn' onClick={() => sendEmail()}><MailOutlineIcon /></Button>
                            </Grid> */}
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="confirm"
                                    label="Confirm email"
                                    name="confirm"
                                    autoComplete="email"
                                />
                                <Button className='btn bg-warning text-white format-btn' onClick={() => handleSentMail()}><MailOutlineIcon /></Button>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <AppRegistrationIcon className='mx-2' />   Đăng ký
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login-page" variant="body2">
                                    Bạn đã có tài khoản? Đăng nhập ngay
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}