// src/components/sign-in/sign-in.component.js

import React from "react";
import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.components";
import CustomButton from "../custom-button/custom-button.components";
import { signInWithGoogle, signInWithEmailAndPassword } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.error('Error signing in:', error.message);
        }
    };

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        onChange={this.handleChange}
                        value={this.state.email}
                        label='Email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        onChange={this.handleChange}
                        value={this.state.password}
                        label='Password'
                        required
                    />
                    <div className='btn'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign In with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
