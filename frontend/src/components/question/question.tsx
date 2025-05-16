import './questions.css';
import Tittle from '../tittle/tittle';
import url from '../../url.ts';
import { useState } from 'react';

type QuestionType = {
    id: number;
    pergunta: string;
    // adicione outros campos conforme necessário
};

function Question() {
    const [data, setData] = useState<QuestionType | null>(null);

    async function getQuestion() {
        const response = await fetch(`${url}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: 1,
                index: 1,
            }),
        });
        const result = await response.json();
        setData(result);
        console.log('data:', result);
    }

    return (
        <>  
            <Tittle page="Question"/>
            <button onClick={getQuestion}>Buscar Questão</button>
            <div>
                
                {data
                    ? <p className='questions.pergunta' key={data.id}>{data.pergunta}</p>
                    : 'Loading...'}
            </div>  
        </>
    );
}

export default Question;