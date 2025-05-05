import './tag.css';

interface TagProps {
    label: string;
    filterKey: "filter-exibition" | "filter-template" | "filter-checkbox-random" | "filter-checkbox-answered" | "filter-subject" | "filter-year";
    selectedValues: string[]; // Alterado para aceitar múltiplos valores
    options: { value: string; text: string }[];
    onRemove: (filterKey: "filter-exibition" | "filter-template" | "filter-checkbox-random" | "filter-checkbox-answered" | "filter-subject" | "filter-year", itemToRemove: string) => void;
}

const Tag: React.FC<TagProps> = ({ label, filterKey, selectedValues, options, onRemove }) => {
    return (
        <div>
            <span className="filter-tag-label">{label}</span>
            {selectedValues.map((value) => (
                <div key={value} className="filter-tag-item">
                    <span className="filter-tag">
                        {options.find(option => option.value === value)?.text || value}
                    </span>
                    <button className="remove-tag-button" onClick={() => onRemove(filterKey, value)}>
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Tag;