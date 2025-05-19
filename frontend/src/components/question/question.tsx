import './questions.css'
import Tittle from '../tittle/tittle';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Alternativa from '../alternative/alternative';
import icons from '../utils/icons';

function Question() {
    const [page, setPage] = useState(0);
    const [inputValue, setInputValue] = useState('1');
    const [finished, setFinished] = useState(false);

    const location = useLocation();
    const data = location.state?.data;
    const ano = data?.ano;
    const questoes = data?.questoes;
    const initialExibition = location.state?.exibition;
    const [exibition, setExibition] = useState(initialExibition);
    const template = data?.template;

    // Lista de respostas: { ano, questionId, alternativeId }
    const [selectedAnswers, setSelectedAnswers] = useState<
        { ano: string | number, questionId: number, alternativeId: number }[]
    >([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setInputValue(String(page + 1));
    }, [page]);

    if (!questoes || questoes.length === 0) {
        return (
            <>
                <Tittle page='Question'/>
                <div>Nenhuma questão encontrada.</div>
            </>
        );
    }

    // Função para obter a alternativa selecionada para uma questão
    const getSelectedAlternativeId = (questionId: number) => {
        const found = selectedAnswers.find(
            (ans) => ans.questionId === questionId && ans.ano === ano?.ano
        );
        return found ? found.alternativeId : null;
    };

    // Função para atualizar a resposta selecionada (igual para ambos os modos)
    const handleSelectAlternative = (questionId: number, alternativeId: number) => {
        setSelectedAnswers((prev) => {
            const filtered = prev.filter(
                (ans) => !(ans.questionId === questionId && ans.ano === ano?.ano)
            );
            return [
                ...filtered,
                { ano: ano?.ano, questionId, alternativeId }
            ];
        });
    };

    function scrollToTopButton() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Ao terminar no modo 1, muda para modo 2 e mantém respostas
    const handleFinish = () => {
        if (exibition === '1') {
            setExibition('2');
            setFinished(true);

            if (selectedAnswers.length > 0) {
                const last = selectedAnswers[selectedAnswers.length - 1];
                const lastIndex = questoes.findIndex((q: any) => q.id === last.questionId);
                setPage(lastIndex !== -1 ? lastIndex : 0);
                setInputValue(String((lastIndex !== -1 ? lastIndex : 0) + 1));
                setTimeout(() => {
                    const el = document.getElementById(`question-${lastIndex}`);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else {
                setPage(0);
                setInputValue('1');
            }
        } else {
            setFinished(true);
        }
    };

    return (
        <>
            <Tittle page='Question' acessory={
                <>
                <div className='navigation-buttons'>
                    <button
                        id='prev'
                        onClick={() => {
                            if (exibition === '1') {
                                const newPage = Math.max(Number(inputValue) - 2, 0);
                                setInputValue(String(newPage + 1));
                                setTimeout(() => {
                                    const el = document.getElementById(`question-${newPage}`);
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }, 0);
                            } else {
                                setPage((prev) => Math.max(prev - 1, 0));
                            }
                        }}
                        disabled={Number(inputValue) <= 1}
                    >
                        <icons.DoubleArrowLeft />
                    </button>
                    <input
                        id='page-input'
                        type="text"
                        placeholder="N.º da questão"
                        value={inputValue}
                        onChange={e => {
                            const val = e.target.value;
                            setInputValue(val);
                            const num = Number(val);
                            if (!isNaN(num) && num >= 1 && num <= questoes.length) {
                                if (exibition === '1') {
                                    setTimeout(() => {
                                        const el = document.getElementById(`question-${num - 1}`);
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }, 0);
                                } else {
                                    setPage(num - 1);
                                }
                            }
                        }}
                        onBlur={() => setInputValue(String(page + 1))}
                    />
                    <button
                        id='next'
                        onClick={() => {
                            if (exibition === '1') {
                                const newPage = Math.min(Number(inputValue), questoes.length - 1);
                                setInputValue(String(newPage + 1));
                                setTimeout(() => {
                                    const el = document.getElementById(`question-${newPage}`);
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }, 0);
                            } else {
                                setPage((prev) => Math.min(prev + 1, questoes.length - 1));
                            }
                        }}
                        disabled={Number(inputValue) >= questoes.length}
                    >
                        <icons.DoubleArrowRight />
                    </button>
                </div>
                </>
            }/>
            {exibition == '1' && (
                <div className="questions-container">
                    {questoes.map((question: any, idx: number) => (
                        <div
                            key={question.id}
                            className="question window"
                            id={`question-${idx}`}
                        >
                            <h2>{question.title}</h2>
                            <ReactMarkdown>{question.context}</ReactMarkdown>
                            {question.alternativesIntroduction && (
                                <p className='alternativeIntroduction'><strong>{question.alternativesIntroduction}</strong></p>
                            )}
                            <ul className="alternatives">
                                {question.alternativas?.map((alt: any) => (
                                    <Alternativa
                                        key={alt.id}
                                        alt={alt}
                                        questionId={question.id}
                                        selectedAlternativeId={getSelectedAlternativeId(question.id)}
                                        onSelect={(alternativeId) => handleSelectAlternative(question.id, alternativeId)}
                                        finished={finished}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            {exibition == '2' && (
                <>
                    <div className="questions-container">
                        <div key={questoes[page].id} className="question window">
                            <h2>{questoes[page].title}</h2>
                            <ReactMarkdown>{questoes[page].context}</ReactMarkdown>
                            {questoes[page].alternativesIntroduction && (
                                <p className='alternativeIntroduction'><strong>{questoes[page].alternativesIntroduction}</strong></p>
                            )}
                            <ul className="alternatives">
                                {questoes[page].alternativas?.map((alt: any) => (
                                    <Alternativa
                                        key={alt.id}
                                        alt={alt}
                                        questionId={questoes[page].id}
                                        selectedAlternativeId={getSelectedAlternativeId(questoes[page].id)}
                                        onSelect={(alternativeId) => handleSelectAlternative(questoes[page].id, alternativeId)}
                                        finished={finished}
                                    />
                                ))}
                            </ul>
                            <div className="navigation-buttons window">
                                <button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                    disabled={page === 0}
                                >
                                    <icons.DoubleArrowLeft />
                                    Anterior
                                </button>
                                <input
                                    id='page-input-question'
                                    type="text"
                                    placeholder="N.º da questão"
                                    value={inputValue}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setInputValue(val);
                                        const num = Number(val);
                                        if (!isNaN(num) && num >= 1 && num <= questoes.length) {
                                            setPage(num - 1);
                                        }
                                    }}
                                    onBlur={() => setInputValue(String(page + 1))}
                                />
                                <button
                                    onClick={() => setPage((prev) => Math.min(prev + 1, questoes.length - 1))}
                                    disabled={page === questoes.length - 1}
                                >
                                    Proxima
                                    <icons.DoubleArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <button
                className="scroll-to-top-btn"
                onClick={scrollToTopButton}
                aria-label="Rolar para o topo"
            >
                <icons.ArrowUp />
            </button>
            {!finished && (
                <button
                    className="finish-btn"
                    onClick={handleFinish}
                >
                    Terminar
                </button>
            )}
            {finished && (
                <div className="results-list window">
                    <h2>Resultados</h2>
                    <ul>
                        {questoes.map((q: any, idx: number) => {
                            const userAnswer = selectedAnswers.find(
                                (ans) => ans.questionId === q.id && ans.ano === ano?.ano
                            );
                            const correctAlt = q.alternativas.find((alt: any) => alt.isCorrect);
                            const userAlt = q.alternativas.find((alt: any) => alt.id === userAnswer?.alternativeId);

                            return (
                                <li key={q.id} style={{ marginBottom: '1.5rem' }}>
                                    <div><strong>Questão {idx + 1}:</strong> {q.title}</div>
                                    <div>
                                        <span style={{ color: 'green' }}>
                                            Correta: {correctAlt ? `${correctAlt.letter} - ${correctAlt.text}` : 'Não definida'}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ color: userAlt && userAlt.id === correctAlt?.id ? 'green' : 'red' }}>
                                            Sua resposta: {userAlt ? `${userAlt.letter} - ${userAlt.text}` : <em>Não respondida</em>}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}

export default Question;