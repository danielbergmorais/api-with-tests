import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';


describe("Login Form", () => {
    it("Rederização correta", () => {
        render(<LoginForm/>)

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Esqueci minha senha')).toBeInTheDocument();
        expect(screen.getByText('Crie sua conta aqui')).toBeInTheDocument();
        expect(screen.getByText('Email ou Senha incorretos!')).toBeInTheDocument();
    })
})