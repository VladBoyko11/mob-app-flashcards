import React, {useEffect} from "react";
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm} from "redux-form";
import {login} from "../../redux/authSlice";
import {connect, ConnectedProps} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Form, Button} from 'react-bootstrap'
import {Input} from "../common/FormControl";
import {setBasketThunk} from "../../redux/basketSlice";
import { RootState } from "../../redux/store";

const Login: React.FC<LoginPropsType> = (props) => {

    const submitForm: FormSubmitHandler = (formData: {email?: string, password?: string}) => {
        if(formData.email && formData.password) props.login({email: formData.email, password: formData.password})
    }

    useEffect(()=>{
        if(props.isAuth){
            props.setBasketThunk({userId: props.id})
        }
    }, [props.isAuth])

    const navigate = useNavigate()
    if(props.isAuth){
        navigate('/user', {replace: true})
        return null
    }

    const registrationAccount = () => {
        navigate('/registration', {replace: true})
        return null
    }

    return (
        <div>
            <h1>Login</h1>
            <div>If you don`t have account please <Button className={'btn-warning h-50'} onClick={registrationAccount}>registration it</Button></div>
            <LoginReduxForm {...props} onSubmit={submitForm}/>
        </div>
    )
}

const LoginForm:  React.FC<InjectedFormProps> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group>
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Field id="email" placeholder='email' name='email' component={Input}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Field id="password" placeholder='password' name='password' component={Input}/>
            </Form.Group>
                <div> <Button type='submit' variant="success">Login</Button> </div>
        </Form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id
})

const connector = connect(mapStateToProps, { login, setBasketThunk })
type ReduxPropsType = ConnectedProps<typeof connector>
type LoginPropsType = ReduxPropsType

export default connector(Login)