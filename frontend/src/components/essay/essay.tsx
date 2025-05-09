import './essay.css';
import Tittle from '../tittle/tittle';
import './essayScript.js';

function Essay() {
    return (
        <> 
            <Tittle page="Essay"/>
            <div className="all-content">
                <div className='main-container'>
                    <button id='theme-generate' className="btn btn-generate">Gerar tema</button>
                    <div className="theme-text">
                        <h2 id='theme-text-tittle' className="theme-text-tittle">Tema:</h2>
                        <p id='theme-text-content' className="theme-text-content">Tema gerado aqui</p>
                    </div>
                    <div className="motivating-text">
                        <h2 className="motivating-text-tittle">Textos motivadores</h2>
                        <p className="motivating-text-content">Texto motivador aqui</p>
                    </div>
                    <div className="essay-text">
                        <h2 className="essay-text-tittle">Digite seu texto: </h2>
                        <div className='show-essay-paper'> 
                            <div className="essay-paper-content" contentEditable="true">

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