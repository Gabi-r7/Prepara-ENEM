import './essay.css';
import Tittle from '../tittle/tittle';

function Essay() {
    return (
        <> 
            <Tittle page="Essay"/>
            <div className="main-container">
                <button className="btn btn-generate">Gerar tema</button>
                <div className="motivating-text">
                    <h2 className="motivating-text-tittle">Textos motivadores</h2>
                    <p className="motivating-text-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="essay-text">
                    <h2 className="essay-text-tittle">Texto dissertativo argumentativo</h2>
                    <p className="essay-text-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    
                </div>
            </div> 
        </>
        
      );
}

export default Essay;''