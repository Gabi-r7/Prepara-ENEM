import './signUp.css';
import Tittle from '../tittle/tittle';
import icons from '../utils/icons';
import {Link} from 'react-router-dom'

function SignUp() {
    return (
        <>
            <div className='signUp-container'> 
                <div className='signUp-content'>
                    <Tittle page="SignUp"/>
                    <div id='credenciais'className='window'>
                        <div id='cad-login'>
                            <icons.Profile/>
                            <input type="text" placeholder='Digite seu Login' />
                        </div>
                        <div id='cad-email'>
                            <icons.Email/>
                            <input type="text" placeholder='Digite seu E-mail'/>
                        </div>
                        <div id='cad-password'>
                            <icons.Lock/>
                            <input type="text" placeholder='Digite sua senha'/>
                        </div>
                        <div id='cad-password-confirm'>
                            <icons.Lock/>
                            <input type="text" placeholder='Confirme sua senha'/>
                        </div>
                    </div>
                    <div id='login-redirect' className='window'>
                        <Link to="/login"><p>Já possui uma conta? </p><p id='login'>Faça login aqui</p></Link>
                    </div>
                </div>
            </div>
           
        </>
      );
}

export default SignUp;