import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
    return (
        <div className='ButtonSection'>
            <button className="Button" type="button" onClick={onLoadMore}>Load More</button>
        </div>
    )
};

Button.protoTypes = {
    onLoadMore: PropTypes.func.isRequired
};
