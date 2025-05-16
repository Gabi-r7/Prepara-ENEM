import './questions.css'
import Tittle from '../tittle/tittle';
import { useLocation } from 'react-router-dom';

function Question() {
    const location = useLocation();
    const data = location.state?.data;
    const ano = data?.ano;
    const questoes = data?.questoes;

    if (!questoes || questoes.length === 0) {
        return (
            <>
                <Tittle page='Question'/>
                <div>Nenhuma questão encontrada.</div>
            </>
        );
    }

    return (
        <>
            <Tittle page='Question'/>
            <h2 className='window'>{`Ano - ${ano?.ano}`}</h2>
            <div className="question-container window">
                {questoes.map((questao: any) => (
                    <div key={questao.id} className="questao-bloco">
                        <h3>Questão {questao.id}</h3>
                        <p>{questao.pergunta}</p>
                        {questao.texto_auxiliar && (
                            <div>
                                <strong>Texto Auxiliar:</strong>
                                <p>{questao.texto_auxiliar}</p>
                            </div>
                        )}
                        {questao.imagem_auxiliar && (
                            <div>
                                <img src={questao.imagem_auxiliar} alt="Imagem auxiliar" />
                            </div>
                        )}
                        <h4>Alternativas:</h4>
                        <ul>
                            {questao.alternativas?.map((alt: any) => (
                                <li key={alt.id}>
                                    <strong>{alt.letra}:</strong> {alt.texto}
                                    {alt.imagem_auxiliar && (
                                        <div>
                                            <img src={alt.imagem_auxiliar} alt={`Imagem alternativa ${alt.letra}`} />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Question;