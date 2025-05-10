import './essay.css';
import Tittle from '../tittle/tittle';
import './essayScript.js';
import { generateTheme } from './essayScript';

function Essay() {
    const handleGenerateTheme = async () => {
            const responseJson = await generateTheme();
    };
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
                            <div className="essay-text-content" contentEditable="true">

                            </div>
                        </div>
                    </div>
                </div>
                <div className='ads'>
                    
                </div>
            </div> 
        </>
        
      );
}

export default Essay;''