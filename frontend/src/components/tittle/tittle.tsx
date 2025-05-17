import './tittle.css';
import icons from '../utils/icons';

interface TittleProps {
    page: keyof typeof TrasnlatePages;
    acessory?: React.ReactNode;
    acessoryName?: React.ReactNode;
}

const TrasnlatePages = {
    Home: 'Inicio',
    Settings: 'Configurações',
    Help: 'Ajuda',
    Profile: 'Perfil',
    Question: 'Questões',
    Login: 'Login',
    Filter: 'Filtro',
    Ranking: 'Ranking',
    Essay: 'Redação',
}

function Tittle({ page, acessory}: TittleProps) {
    const IconComponent = icons[page] || icons.Help;
    return (
        <>
            <div className={`tittle tittle-${page}`}>
                <h1>
                    <span className="tittle-icon">
                        <IconComponent />
                    </span>
                    {String(TrasnlatePages[page])}
                </h1>
                <div className='acessory-component'>
                    {acessory}
                </div>
            </div>
        </>
    );
}

export default Tittle;