import * as React from 'react';
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
import LoginApi from '../../api/login/loginApi'
import CreateNotification from '../../common/notification/notification';
import { useSelector, useDispatch } from 'react-redux';
import { loginForm } from '../../component/redux/feature/auth';
import jwt_decode from "jwt-decode";
import Example from '../../common/loading/loading';
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

export default function SignIn() {
    const history = useNavigate();
    const [loadingLogin, setLoading] = React.useState(false)
    const dispatch = useDispatch()



    const handleUserLogin = (data) => {
        localStorage.setItem('user', data)
        try {
            const decodedToken = jwt_decode(data);

            if (!decodedToken) {
                console.log('error');
            }
            return decodedToken;
        } catch (error) {
            console.log(error);
        }


    }
    // console.log(loadingLogin, 565);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!data.get('userName') && !data.get('password')) {
            CreateNotification.error('Thông báo', "Chưa điền đầy đủ thông tin")
        } else {
            try {
                setLoading(true)
                await LoginApi.loginUser({
                    userName: data.get('userName'),
                    password: data.get('password'),
                })?.then((res) => {
                    if (res?.data?.success) {
                        setLoading(false)
                        // console.log('ok');
                        CreateNotification.success('Thông báo', "Login successfully")
                        const headerToken = handleUserLogin(res?.data?.accessToken)
                        dispatch(loginForm({ Auth: headerToken.userId }))
                        window.location.href = '/'
                    } else {
                        setLoading(false)
                        CreateNotification.error('Thông báo', "Login fail, please check and try again")
                        // localStorage.setItem('user', res?.data?.accessToken)
                    }
                })
            } catch (error) {
                setLoading(false)
                CreateNotification.error('Thông báo', "Login fail, please check and try again")
            }

        }


    };


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
                    <Box component="div" sx={{ display: 'flex', alignItems: "center" }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login to app manager
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="UserName"
                            name="userName"
                            autoComplete="userName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Ghi nhớ"
                        />
                        {
                            loadingLogin ?
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color='secondary'
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loadingLogin}
                                >
                                    <div className='p-2'>
                                        <Example color="white" width={30} height={30} />

                                    </div>


                                </Button> : <Button
                                    type="submit"
                                    fullWidth

                                    variant="contained"
                                    color='secondary'
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loadingLogin}
                                >

                                    Đăng nhập

                                </Button>
                        }

                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link href="/sign-up-page" variant="body2">
                                    {"Bạn chưa có tài khoản? Đăng ký ngay"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
