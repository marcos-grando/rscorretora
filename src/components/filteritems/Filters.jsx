import React, { useMemo } from 'react';

function Filters({ filters, setFilters, datadb, closeFilter, filterRef }) {
    const locaisUnicos = useMemo(() => [...new Set(datadb.map(emp => emp?.local))], [datadb]);
    const statusUnicos = useMemo(() => [...new Set(datadb.map(emp => emp?.status))], [datadb]);

    const choiceFilter = (category, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: prevFilters[category].includes(value)
                ? prevFilters[category].filter(item => item !== value)
                : [...prevFilters[category], value]
        }));
    };

    return (
        <div ref={filterRef} className="filter-content">
            <div className="close-filter" onClick={closeFilter}>
                <i className="fas fa-times"></i>
            </div>
            <p className='title'>Filtrar busca por:</p>
            <div className="local-filter">
                <p>Localização</p>
                {locaisUnicos.map(local => (
                    <label key={local}>
                        <input
                            type="checkbox"
                            checked={filters.local.includes(local)}
                            onChange={() => choiceFilter('local', local)}
                        />
                        {local}
                    </label>
                ))}
            </div>
            <div className="status-filter">
                <p>Situação</p>
                {statusUnicos.map(status => (
                    <label key={status}>
                        <input
                            type="checkbox"
                            checked={filters.status.includes(status)}
                            onChange={() => choiceFilter('status', status)}
                        />
                        {status}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filters;
