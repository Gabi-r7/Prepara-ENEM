import React, { useState } from 'react';
import {    useNavigate} from 'react-router-dom'
import './filter.css';
import Tittle from '../tittle/tittle';
import Tag from '../tag/tag';
import url from '../../url.ts';
import filters from './filter.json';


function Filter() {
    const navigate = useNavigate();

    const [selectedFilters, setSelectedFilters] = useState<{
        'filter-template': string;
        'filter-exibition': string;
        'filter-subject': string[];
        'filter-year': string[];
        'filter-order': string;
        'filter-remove': string;
    }>({
        'filter-template': '',
        'filter-exibition': '',
        'filter-subject': [],
        'filter-year': [],
        'filter-order': '',
        'filter-remove': '',
    });

    async function getQuestion() {
        const year = selectedFilters['filter-year'][0] ? Number(selectedFilters['filter-year'][0]) : null;
        const index = 1;

        const response = await fetch(`${url}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: year,
                index: index,
            }),
        });
        const data = await response.json();

        navigate('/question', { state: { data, exibition: selectedFilters['filter-exibition'], template: selectedFilters['filter-template'] } });
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { id, value } = event.target as { id: keyof typeof selectedFilters; value: string };
    
        setSelectedFilters((prevState) => {
            const selectedValue = filters.find(filter => filter.id === id)?.options.find(option => option.value === value)?.value || '';
            
            if (id === 'filter-year') {
                // Se "Todos" for selecionado, substitui todas as outras tags
                if (selectedValue === '0') {
                    return {
                        ...prevState,
                         [id]: ['0'],// Apenas "Todos" permanece
                    };
                }

                // Se outra tag for selecionada enquanto "Todos" está presente, remove "Todos"
                if (Array.isArray(prevState[id]) && prevState[id].includes('0')) {
                    return {
                        ...prevState,
                        [id]: selectedValue === '0' ? ['0'] : [selectedValue], // Mantém apenas "Todos" ou o novo valor
                    };
                }
            }

            return {
                ...prevState,
                [id]: Array.isArray(prevState[id])
                    ? (
                        // Adiciona apenas se não existir ainda
                        (prevState[id] as string[]).includes(selectedValue) || selectedValue === ''
                            ? prevState[id]
                            : [...(prevState[id] as string[]), selectedValue]
                    )
                    : selectedValue,
            };
        });
    }

    function handleRemoveTag(filterKey: keyof typeof selectedFilters, itemToRemove?: string) {
        setSelectedFilters((prevState) => ({
            ...prevState,
            [filterKey]: Array.isArray(prevState[filterKey])
                ? (prevState[filterKey] as string[]).filter(item => item !== itemToRemove)
                : '', // Limpa o valor (array ou string)
        }));
    }

    const handleStart = () => {
        getQuestion();
        window.scrollTo(0, 0); // Rola para o topo da página
    };

    return (
        <>
            <Tittle page='Filter' acessory={
                <>
                    <div className='filter-start-btn'>
                        <button onClick={handleStart}>Começar</button>
                    </div>
                </>
            }/>
            {(() => {
                const [showInfo, setShowInfo] = React.useState(true);
                const [openInfo, setOpenInfo] = React.useState(true);

                React.useEffect(() => {
                    const timer = setTimeout(() => setOpenInfo(false), 10000);
                    return () => clearTimeout(timer);
                }, []);

                if (!showInfo) return null;

                return (
                    <div className={`filter-info window${openInfo ? ' filter-info-open' : ''}`}>
                        <div className='filter-info-header'>
                            <h2>Informação - Instrução básica</h2>
                            <button
                                type="button"
                                onClick={() => setOpenInfo((prev) => !prev)}
                            >
                                {openInfo ? 'Fechar info' : 'Abrir info'}
                            </button>
                        </div>
                        <div className='filter-info-text'>
                            <p>
                                Para começar a usar o sistema, você deve selecionar os filtros desejados. 
                                Você pode escolher entre diferentes opções de filtro, como ano, assunto e outros critérios relevantes. Além de um timer para escolher o tempo de duração da prova.
                            </p>
                            <p>
                                Após fazer suas seleções, clique no botão "Começar" nofinal da pagina para iniciar a prova.
                            </p>
                        </div>
                    </div>
                );
            })()}
            <div id="filter-container">
                <div className="filter-container-select window">
                    {filters.map((filter) => {
                        if (filter.options.length > 0) {
                            return (
                                <div key={filter.id} className="filter-select-container">
                                    <label htmlFor={filter.id} className="filter-label">{filter.label}</label>
                                    <select
                                        id={filter.id}
                                        className="filter-select"
                                        value={
                                            Array.isArray(selectedFilters[filter.id as keyof typeof selectedFilters])
                                                ? '' // Define um valor padrão se for um array
                                                : selectedFilters[filter.id as keyof typeof selectedFilters]
                                        }
                                        onChange={handleSelectChange}
                                    >
                                        <option value="" disabled>
                                            Escolha uma opção
                                        </option>
                                        {filter.options.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                                disabled={option.disabled}
                                                hidden={option.hidden} // Adiciona a propriedade hidden
                                            >
                                                {option.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            {Object.values(selectedFilters).some((filter) => {
                if (Array.isArray(filter)) {
                    return filter.length > 0;
                }
                return !!filter;
            }) && (
                <>
                    <div className="filter-tags-container window">
                        {Object.entries(selectedFilters).map(([filterKey, selectedValue]) => {
                            if (Array.isArray(selectedValue) && selectedValue.length > 0) {
                                return (
                                    <Tag
                                        key={filterKey}
                                        label={filters.find(filter => filter.id === filterKey)?.label || ''}
                                        filterKey={filterKey as keyof typeof selectedFilters}
                                        selectedValues={selectedValue as string[]}
                                        options={(filters.find(filter => filter.id === filterKey)?.options || [])}
                                        onRemove={handleRemoveTag}
                                    />
                                );
                            } else if (typeof selectedValue === 'string' && selectedValue !== '') {
                                return (
                                    <Tag
                                        key={filterKey}
                                        label={filters.find(filter => filter.id === filterKey)?.label || ''}
                                        filterKey={filterKey as keyof typeof selectedFilters}
                                        selectedValues={Array.isArray(selectedValue) ? selectedValue : [selectedValue]}
                                        options={(filters.find(filter => filter.id === filterKey)?.options || [])}
                                        onRemove={handleRemoveTag}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </>
            )}
            <div className='filter-start-btn'>
                <button onClick={handleStart}>Começar</button>
            </div>
        </>
    );
}

export default Filter;