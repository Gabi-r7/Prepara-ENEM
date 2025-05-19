import { useState } from 'react';
import './login.css';
import url from '../../url';
import Tittle from '../tittle/tittle';
import icons from '../utils/icons';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
    };

    return (
      <>
         <div className='signUp-container'> 
                <div className='signUp-content'>
                    <Tittle page="Login"/>
                    <div id='credenciais'className='window'>
                        <div id='cad-login'>
                            <icons.Profile/>
                            <input type="text" placeholder='Digite seu Login' />
                        </div>

                        <div id='cad-password'>
                            <icons.Lock/>
                            <input type="text" placeholder='Digite sua senha'/>
                        </div>
                    </div>
                    <div id='login-redirect' className='window'>
                        <Link to="/login"><p>Já possui uma conta? </p><p id='login-link'>Faça login aqui</p></Link>
                    </div>
                </div>
            </div>
           
      </>
      );
}

export default Login;