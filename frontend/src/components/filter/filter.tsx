import React, { useState } from 'react';
import './filter.css';
import Tittle from '../tittle/tittle';
import Tag from '../tag/tag';

import {Link} from 'react-router-dom'

function Filter() {

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

    const filters = [
        {
            id: 'filter-template',
            label: 'Gabarito',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true},
                { value: '1', text: 'Ao responder todas as questões' },
                { value: '2', text: 'Ao responder uma questão' },
            ],
        },
        {
            id: 'filter-exibition',
            label: 'Forma de exibição',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true},
                { value: '1', text: 'Questões em cascata' },
                { value: '2', text: 'Questão por página' },
            ],
        },
        {
            id: 'filter-subject',
            label: 'Disciplina',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true},
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
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true},
                {text: 'Todos', value: '0'},
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
            ],
        },
        {
            id: 'filter-order',
            label: 'Ordenar',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true},
                { value: '1', text: 'Mais novas' },
                { value: '2', text: 'Mais antigas' },
                { value: '3', text: 'Aleatório' },
            ],
        },
        {
            id: 'filter-remove',
            label: 'Remover',
            options: [
                { value: '', text: 'Escolha uma opção', disabled: true, hidden: true},
                { value: '1', text: 'Remover questões já respondidas' },
                { value: 'none', text: 'Nada' },
            ],
        },
    ];

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
                [id]: Array.isArray(prevState[id]) ? [...(prevState[id] as string[]), selectedValue] : selectedValue,
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

    return (
        <>
            <Tittle page="Filter" />

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
            <div>
                <Link to="/Question">Questões</Link> 
            </div>


        </>
    );
}

export default Filter;