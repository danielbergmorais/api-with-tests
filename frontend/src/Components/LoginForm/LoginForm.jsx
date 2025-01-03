import React, { useState, useEffect }  from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from "axios";
import './LoginForm.css';


const LoginForm = () => {
    const initialValues = {
        email: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formSuccess, setFormSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handeSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if(Object.keys(formErrors).length === 0) {
            try {

                const jsonData = JSON.stringify(formValues);
                const customConfig = {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post('http://localhost:4000/auth/signin', jsonData, customConfig);

                if(response.data && response.data.success) {
                    setFormSuccess(response.data.message);
                }

            } catch (err) {
                console.log(err.response.data)
                if( err.response.data && !err.response.success){
                    setFormErrors({login: err.response.data.message});
                }
            }
        }
    };

    const validate = (values) => {
        
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email é obrigatorio!";
        } else if (!regex.test(values.email)) {
            errors.email = "Este formato é inválido para email!";
        }
        if (!values.password) {
            errors.password = "Senha é obrigatória!";
        } else if (values.password.length < 4) {
            errors.password = "Senha deve conter mais de 4 caracteres.";
        }
        return errors;
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    return (
        <div className='wrapper'>
            <form action="" method='post' onSubmit={handeSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder='E-mail' 
                        required 
                        value={formValues.email}
                        onChange={handleChange}
                        />
                    <FaUser className='icon' />
                </div>
                <p className='error-login' >
                        {formErrors.email}
                    </p>
                <div className="input-box">
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder='Senha' 
                        required 
                        value={formValues.password}
                        onChange={handleChange}
                        />
                    <FaLock className='icon'/>
                 
                </div>
                <p className="login-success">
                    {formSuccess}
                </p>
                <p className='error-login' >
                    {formErrors.password} {formErrors.login}
                </p>
                <div className="remember-forgot">
                    <label> <input type="checkbox" name="remember" id="remember" /> Lembrar senha</label>
                    <a href='#'>Esqueci minha senha</a>
                </div>
              
                <button type="submit">
                    Entrar
                </button>

                <div className="register-link">
                    <p>Não é cadastrado? <a href='#'>Crie sua conta aqui</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;