import './essay.css';
import Tittle from '../tittle/tittle';
import url from '../../url.ts';
import { marked } from 'marked';

function Essay() {
    document.addEventListener('DOMContentLoaded', () => {
        const generateButton = document.getElementById("theme-generate-button");
        const themeTitle = document.getElementById("theme-text-title");
        const themeContent = document.getElementById("theme-text-content");
        const essayContent = document.getElementById("essay-text-content");
        const motivatingContent = document.getElementById("motivating-text-content");
        });

        async function handleGenerateTheme() {
            const response = await fetch('/essay/generate-theme', {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        };

        async function handleSendEssay() {
            let essayText = document.getElementById('essay-text-content')?.innerHTML;
            let themeText = document.getElementById('theme-text-content')?.innerHTML;
            //user info will be added here
            const response = await fetch(`${url}/essay/send-essay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    essayText,
                    themeText,
                    // user info will be added here
                }),
            });
            const data = await response.json();
            console.log(data);
            console.log('feedback:', data.feedback);
            
            const feedbackContent = document.querySelector('.feedback-content');
            if (feedbackContent) {
                const feedbackHtml = await marked(data.feedback);
                feedbackContent.innerHTML = feedbackHtml;
            }
        }

    return (
        <> 
            <Tittle page="Essay"/>
            <div className="all-content">
                <div className='main-container'>
                    <button id='theme-generate-button' className="btn btn-generate" onClick={handleGenerateTheme}>Gerar tema</button>
                    <div className="theme-text">
                        <h2 id='theme-text-title' className="theme-text-title">Tema:</h2>
                        <p id='theme-text-content' className="theme-text-content">Tema gerado aqui</p>
                    </div>
                    <div className="motivating-text">
                        <h2 className="motivating-text-title">Textos motivadores</h2>
                        <p className="motivating-text-content">Texto motivador aqui</p>
                    </div>
                    <div className="essay-text">
                        <h2 className="essay-text-title">Digite seu texto: </h2>
                        <div className='show-essay-text'> 
                            <div id='essay-text-content' className="essay-text-content" contentEditable="true">

                            </div>
                        </div>
                    </div>
                    <button id='essay-text-button' className="btn btn-essay" onClick={handleSendEssay}>Enviar redação</button>
                    <div className='feedback'>
                        <h2 className="feedback-title">Feedback</h2>
                        <p className="feedback-content">Feedback aqui</p>
                    </div>
                </div>
                <div className='ads'>
                    
                </div>
            </div> 
        </>
        
    );

}

export default Essay;''