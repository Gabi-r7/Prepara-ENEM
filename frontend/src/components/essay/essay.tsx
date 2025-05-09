import './essay.css';
import Tittle from '../tittle/tittle';

function Essay() {
    return (
        <> 
            <Tittle page="Essay"/>
            <div className="all-content">
                <div className='main-container'>
                    <button className="btn btn-generate">Gerar tema</button>
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