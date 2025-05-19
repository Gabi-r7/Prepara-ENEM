interface FooterQuestionProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    questoes: any[];
    finished: boolean;
    handleFinish: () => void;
    template: string;
    icons: any;
    toggleAnswerKey: (questionId: number) => void;
    exibition: string;
}

function FooterQuestion({
    page,
    setPage,
    inputValue,
    setInputValue,
    questoes,
    finished,
    handleFinish,
    template,
    icons,
    toggleAnswerKey,
    exibition
}: FooterQuestionProps) {

    return (
        <div className="question-footer">
            {!finished && template == '1' && (
                <button
                    className="finish-btn"
                    onClick={handleFinish}
                >
                    Terminar
                </button>
            )}
            {template == '2' && (
                <button
                    className="response-question"
                    onClick={() => toggleAnswerKey(questoes[page]?.id)}
                >
                    <p>Responder</p>
                    <icons.Send />
                </button>
            )}
            {exibition == '2' && (
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
            )}
        </div>
    )
}

export default FooterQuestion;