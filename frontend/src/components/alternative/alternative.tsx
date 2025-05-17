import React, { useState, useEffect } from 'react';
import './alternative.css';
import icons from '../utils/icons';

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
    finished?: boolean;
}

const Alternativa: React.FC<AlternativaProps> = ({
    alt, questionId, selectedAlternativeId, onSelect, finished
}) => {
    const [isRed, setIsRed] = useState(false);

    const isSelected = selectedAlternativeId === alt.id;

    // Sempre que a alternativa for selecionada, remove o vermelho
    useEffect(() => {
        if (isSelected && isRed) {
            setIsRed(false);
        }
    }, [isSelected, isRed]);

    return (
        <li className={`alternative${isSelected ? ' selected-alt' : ''}${finished ? ' finished-questions' : ''}`}>
            {!isSelected && (
                <div className='change-red-letter'>
                    <div
                        className='red-letter'
                        onClick={() => setIsRed(prev => !prev)}
                    ><icons.Cut /></div>
                </div>
            )}
            <label htmlFor={`question-${questionId}-alternative-${alt.id}`}>
                <button
                    className={
                        `letter-container` +
                        (isRed && !isSelected ? ` selected-letter-red` : '') +
                        (isSelected ? ' is-alternative-selected' : '')
                    }
                    id={`question-${questionId}-alternative-${alt.id}`}
                    type="button"
                    onClick={() => onSelect(alt.id)}
                    disabled={finished}
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