import './profile.css';
import Tittle from '../tittle/tittle';
import icons from '../utils/icons';
import { useState , useEffect } from 'react';

function Profile() {

    const itens = [
        {id: 'name', Text: 'Nome', idInput: 'profile-name-input'},
        {id: 'email', Text: 'Email', idInput: 'profile-email-input'},
        {id: 'password', Text: 'Senha', idInput: 'profile-password-input'},
    ];

    const [isProfileMin, setIsProfileMin] = useState(false);
    
    useEffect(() => {
    const handleResizeProfile = () => {
        const windowWidth = window.innerWidth;
        const threshold = window.screen.width * 0.8;
        setIsProfileMin(windowWidth < threshold);
    };

    window.addEventListener('resize', handleResizeProfile);

    handleResizeProfile();

    // Remove o evento ao desmontar o componente
    return () => {
        window.removeEventListener('resize', handleResizeProfile);
    };
    }, []);

    return (
        <>
            <Tittle page="Profile"/>
            <div className={`profile-container ${isProfileMin ? 'min-profile' : ''}`}>
                <div id='profile-background'>
                    <div className='profile-background-data'>
                        <h1 id='user-name-tittle'>Nome do Usuário</h1>
                        <button className='profile-background-edit'>
                            <span>
                                Mudar imagem
                            </span>
                            <icons.Edit/>
                        </button>
                    </div>
                    <div id='profile-background-gradient'></div>
                    <img src="public/quarto.png" alt="imagem de fundo do perfil" />
                </div>
                <div id='profile-itens-container'>
                    <div className='profile-data-container window'>
                        {itens.map((item) => (
                            <div key={item.id} className='profile-item'>
                                <label htmlFor={item.idInput}>{item.Text}</label>
                                <div>
                                    <input type="text" id={item.idInput} name={item.idInput} placeholder={item.Text}/>
                                    <button className='profile-switch-button'>Alterar</button>
                                </div>
                            </div>
                        ))}   
                    </div>
                    <div className='profile-image-container window'>
                        <div>
                            <button className='profile-image-button'>Alterar Imagem</button>
                            <img src="../../test-profile.jpeg" alt="Profile" className='profile-image'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
      );
}

export default Profile;