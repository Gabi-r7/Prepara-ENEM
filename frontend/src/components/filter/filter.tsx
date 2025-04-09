import './filter.css';
import Tittle from '../tittle/tittle';

function Filter() {
    // Lista de filtros com suas opções
    const filters = [
        {
            id: 'filter-template',
            label: 'Gabarito',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true },
                { value: '1', text: 'Ao responder todas as questões' },
                { value: '2', text: 'Ao responder uma questão' },
            ],
        },
        {
            id: 'filter-year',
            label: 'Ano',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true },
                { value: '2023', text: '2023' },
                { value: '2024', text: '2024' },
            ],
        },
    ];

    return (
        <>
            <Tittle page="Filter" />

            <div className="filter-container window">
                {filters.map((filter) => (
                    <div className="filter-item" key={filter.id}>
                        <label className="filter-label" htmlFor={filter.id}>
                            {filter.label}
                        </label>
                        <select id={filter.id} defaultValue="">
                            {filter.options.map((option, index) => (
                                <option
                                    key={index}
                                    value={option.value}
                                    disabled={option.disabled || false}
                                    hidden={option.hidden || false}
                                >{option.text}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Filter;