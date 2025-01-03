import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginForm = () => {
    return (
        <div className='wrapper'>
            <form action="" method='post'>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" name="login" id="login" placeholder='E-mail' required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" name="password" id="password" placeholder='Senha' required />
                    <FaLock className='icon'/>
                </div>

                <div className="remeber-forgot">
                    <label> <input type="checkbox" name="remeber" id="remember" /> Lembrar senha</label>
                    <a href='#'>Esqueci minha senha</a>
                </div>
                <p className='error-login' style={{display: 'none'}}>Email ou Senha incorretos!</p>
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