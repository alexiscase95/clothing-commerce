import { useState } from "react";
import { signInWithGooglePopUp, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component";
import './sign-in.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
}

export const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert('incorrect password for email')
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email")
                    break;
                default:
                    console.log(error)
            }
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email} required />
                <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password} required />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}