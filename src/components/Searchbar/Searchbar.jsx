import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(event.currentTarget.query.value);
    };

    return ( 
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleFormSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>
                <input
                    className="SearchForm-input"
                    type="text"
                    name="query"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
};

Searchbar.protoTypes = {
    onSubmit: PropTypes.func.isRequired,
};
