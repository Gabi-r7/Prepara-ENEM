import './questions.css'
import Tittle from '../tittle/tittle';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Alternativa from '../alternative/alternative';

function Question() {
    const [selectedAlternativeId, setSelectedAlternativeId] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            <h2 className='questions-year-tittle window'>{`Ano - ${ano?.ano}`}</h2>
            <div className="questions-container">
                {questoes.map((question: any) => (
                    <div key={question.id} className="question window">
                        <h2>{question.title}</h2>
                        <ReactMarkdown>{question.context}</ReactMarkdown>
                        {question.alternativesIntroduction && (
                            <p><strong>{question.alternativesIntroduction}</strong></p>
                        )}
                        <ul className="alternatives">
                            {question.alternativas?.map((alt: any) => (
                                <Alternativa
                                    key={alt.id}
                                    alt={alt}
                                    questionId={question.id}
                                    selectedAlternativeId={selectedAlternativeId}
                                    onSelect={setSelectedAlternativeId}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Question;