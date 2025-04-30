import './profile.css';
import Tittle from '../tittle/tittle';

function Profile() {

    const itens = [
        {id: 'name', Text: 'Nome', idInput: 'profile-name-input'},
        {id: 'email', Text: 'Email', idInput: 'profile-email-input'},
        {id: 'password', Text: 'Senha', idInput: 'profile-password-input'},
    ];

    return (
        <>
            <Tittle page="Profile"/>
            <div className='profile-container'>
                <div className='profile-itens-container window'>
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
        </>
      );
}

export default Profile;