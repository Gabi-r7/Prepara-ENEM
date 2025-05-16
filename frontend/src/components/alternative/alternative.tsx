import React, { useState } from 'react';

interface AlternativaProps {
    alt: {
        id: number;
        letter: string;
        text: string;
        file?: string | null;
    };
    questionId: number;
    selectedAlternativeId: number | null;
    onSelect: (alternativeId: number) => void;
}

const Alternativa: React.FC<AlternativaProps> = ({ alt, questionId, selectedAlternativeId, onSelect }) => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const isSelected = selectedAlternativeId === alt.id;

    return (
        <li className={`alternative${isSelected ? ' selected-alt' : ''}`}>
            <div className='change-letter-color'>
                {[0, 1].map(idx => (
                    <div
                        key={idx}
                        className={`letter-color letter-color-${idx}`}
                        onClick={e => {
                            e.preventDefault();
                            setSelectedIdx(idx);
                        }}
                    />
                ))}
            </div>
            <label htmlFor={`question-${questionId}-alternative-${alt.id}`}>
                <button
                    className={
                        `letter-container` +
                        (selectedIdx !== null && !isSelected ? ` selected-letter-color-${selectedIdx}` : '') +
                        (isSelected ? ' is-alternative-selected' : '')
                    }
                    id={`question-${questionId}-alternative-${alt.id}`}
                    type="button"
                    onClick={() => onSelect(alt.id)}
                >
                    <strong className='letter'>{alt.letter}</strong>
                </button>
                <div className='alternative-text'>{alt.text}</div>
                {alt.file && (
                    <div>
                        <img src={alt.file} alt={`Imagem alternativa ${alt.letter}`} style={{ maxWidth: '100px', marginLeft: '10px' }} />
                    </div>
                )}
            </label>
        </li>
    );
};

export default Alternativa;