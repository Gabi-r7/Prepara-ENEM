import './signUp.css';
import Tittle from '../tittle/tittle';

function SignUp() {
    return (
        <>
            <Tittle page="SignUp"/>
            <div id='credenciais'>
                <input type="text" placeholder='Digite seu Login' />
                <input type="text" placeholder='Digite seu E-mail'/>
                <input type="text" placeholder='Digite sua senha'/>,
                <input type="text" placeholder='Confirme sua senha'/>
            </div>

        </>
      );
}

export default SignUp;