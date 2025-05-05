import React, { useState } from 'react';
import './filter.css';
import Tittle from '../tittle/tittle';
import icons from '../utils/icons';
import Tag from '../tag/tag';

import {Link} from 'react-router-dom'

function Filter() {

    const [selectedFilters, setSelectedFilters] = useState({
        'filter-template': '',
        'filter-exibition': '',
        'filter-subject': [],
        'filter-year': [],
        'filter-checkbox-random': false,
        'filter-checkbox-answered': false,
    });

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
            ],
        },
    ];

    

    const IconComponent = icons['Checked'];

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { id, value } = event.target;
    
        setSelectedFilters((prevState) => {
            if (Array.isArray((prevState[id as keyof typeof prevState] as string[]))) {
                const currentArray = prevState[id as keyof typeof prevState] as string[];
    
                // Verifica se o valor já existe no array
                if (!currentArray.includes(value)) {
                    return {
                        ...prevState,
                        [id]: [...currentArray, value], // Adiciona o novo valor apenas se não existir
                    };
                }
    
                return prevState; // Retorna o estado atual se o valor já existir
            }
    
            return {
                ...prevState,
                [id]: value,
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

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>){
        const { id, checked } = event.target;

        setSelectedFilters((prevState) => ({
            ...prevState,
            [id]: checked,
        }));
    }

    return (
        <>
            <Tittle page="Filter" />

            <div id="filter-container">
                <div className="filter-container-select window">
                    {filters.map((filter) => (
                        <div className="filter-item" key={filter.id}>
                            <label className="filter-select-label" htmlFor={filter.id}>
                                {filter.label}
                            </label>
                            <select
                                id={filter.id}
                                defaultValue=""
                                onChange={handleSelectChange}
                            >
                                {filter.options.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                        disabled={option.disabled || false}
                                        hidden={option.hidden || false}
                                    >
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="filter-container-checkbox window">
                    <div>
                        <input
                            id="filter-checkbox-random"
                            type="checkbox"
                            className="filter-checkbox-input"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="filter-checkbox-random" className="filter-checkbox-label">
                            Questões aleatórias
                            <IconComponent className="filter-checkbox-icon" />
                        </label>
                    </div>
                    <div>
                        <input
                            id="filter-checkbox-answered"
                            type="checkbox"
                            className="filter-checkbox-input"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="filter-checkbox-answered" className="filter-checkbox-label">
                            Questões já respondidas
                            <IconComponent className="filter-checkbox-icon" />
                        </label>
                    </div>
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
                        {/* {selectedFilters['filter-subject'].length > 0 && (
                            <Tag
                                label="Anos"
                                filterKey="filter-subject"
                                selectedValues={selectedFilters['filter-subject']}
                                options={filters.find(f => f.id === 'filter-subject')?.options || []}
                                onRemove={handleRemoveTag}
                            />
                        )}
                        {selectedFilters['filter-year'].length > 0 && (
                            <Tag
                                label="Anos"
                                filterKey="filter-year"
                                selectedValues={selectedFilters['filter-year']}
                                options={filters.find(f => f.id === 'filter-year')?.options || []}
                                onRemove={handleRemoveTag}
                            />
                        )}
                        {selectedFilters['filter-template'] !== "" && (
                            <Tag
                                label="Gabarito"
                                filterKey="filter-template"
                                selectedValues={[selectedFilters['filter-template']]} // Passa o valor como um array
                                options={filters.find(f => f.id === 'filter-template')?.options || []}
                                onRemove={handleRemoveTag}
                            />
                        )}
                        {selectedFilters['filter-exibition'] != "" && (
                            <Tag
                                label="Forma de exibição"
                                filterKey="filter-exibition"
                                selectedValues={[selectedFilters['filter-exibition']]}
                                options={filters.find(f => f.id === 'filter-exibition')?.options || []}
                                onRemove={handleRemoveTag}
                            />
                        )} */}
                        {Object.entries(selectedFilters).map(([filterKey, selectedValue]) => {
                            // Encontra o filtro correspondente
                            const filter = filters.find(f => f.id === filterKey);

                            // Verifica se o filtro existe e se há valores selecionados
                            if (!filter || (Array.isArray(selectedValue) && selectedValue.length === 0) || (!Array.isArray(selectedValue) && selectedValue === "")) {
                                return null;
                            }

                            // Gera as tags dinamicamente
                            return (
                                <Tag
                                    key={filterKey}
                                    label={filter.label}
                                    filterKey={filterKey as keyof typeof selectedFilters}
                                    selectedValues={
                                        Array.isArray(selectedValue) 
                                        ? (selectedValue as string[]).filter((val) => typeof val === 'string') 
                                        : (typeof selectedValue === 'string' ? [selectedValue] : [])
                                    }
                                    options={filter.options}
                                    onRemove={handleRemoveTag}
                                />
                            );
                        })}
                        {}
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