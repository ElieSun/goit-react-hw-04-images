import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
    
    state = {
        isModalOpen: false,
    };

    handleToggleModal = () => {
        this.setState(prevState => ({ isModalOpen: ! prevState.isModalOpen }));
    };
    
    render() {
        const { webformatURL, tags, largeImageURL } = this.props.image;
        return (
            <>
                <li className="gallery-item">
                    <img 
                        className="ImageGalleryItem-image"
                        src={webformatURL} 
                        alt={tags} 
                        onClick={this.handleToggleModal}
                    />
                </li>
                {this.state.isModalOpen && <Modal url={largeImageURL} onClose={this.handleToggleModal}/>}
            </>
        )
    }
}

ImageGalleryItem.protoTypes = {
    image: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })
};
