import './filter.css';
import Tittle from '../tittle/tittle';
import icons from '../utils/icons';

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
            id: 'filter-exibition',
            label: 'Forma de exibição',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true },
                { value: '1', text: 'Questões em cascata' },
                { value: '2', text: 'Questão por página' },
            ],
        },
        {
            id: 'filter-subject',
            label: 'Disciplina',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true },
                { value: '1', text: 'Ciências humanas' },
                { value: '2', text: 'Ciências da natureza' },
                { value: '3', text: 'Linguagens' },
                { value: '4', text: 'Matemática' },
            ],
        },
        {
            id: 'filter-year',
            label: 'Ano',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true },
                {text: '2009', value: '2009'},
                {text: '2010', value: '2010'},
                {text: '2011', value: '2011'},
                {text: '2012', value: '2012'},
                {text: '2013', value: '2013'},
                {text: '2014', value: '2014'},
                {text: '2015', value: '2015'},
                {text: '2016', value: '2016'},
                {text: '2017', value: '2017'},
                {text: '2018', value: '2018'},
                {text: '2019', value: '2019'},
                {text: '2020', value: '2020'},
                {text: '2021', value: '2021'},
                {text: '2022', value: '2022'},
                {text: '2023', value: '2023'},
                {text: '2024', value: '2024'},
            ],
        },
    ];

    const IconComponent = icons['Checked'];

    return (
        <>
            <Tittle page="Filter" />

            <div id='filter-container'>
                <div className="filter-container-select window">
                    {filters.map((filter) => (
                        <div className="filter-item" key={filter.id}>
                            <label className="filter-select-label" htmlFor={filter.id}>
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
                <div className="filter-container-checkbox window">
                    <div>   
                        <input id='filter-checkbox-random'type="checkbox" className="filter-checkbox-input" />
                        <label htmlFor='filter-checkbox-random' className="filter-checkbox-label">
                            Questões aleatórias
                            <IconComponent className="filter-checkbox-icon" />
                        </label>
                    </div>
                    <div>
                        <input id='filter-checkbox-answered' type="checkbox" className="filter-checkbox-input" />
                        <label htmlFor='filter-checkbox-answered' className="filter-checkbox-label">
                            Questões ja respondidas
                            <IconComponent className="filter-checkbox-icon" />
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;