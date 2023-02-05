import { Searchbar } from "./Searchbar/Searchbar";
import { Component } from "react";
import { fetchImages } from 'services/apiServices';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

export class App extends Component {

  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    totalImages: 0,
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImages(query, page).then(resp => {
        if (!resp)
          return null;
        this.setState(prev => ({ 
            images: page === 1 ? [...resp.hits] : [...prev.images, ...resp.hits],
            totalImages: resp.totalHits, 
          })); 
        }).finally(() => {this.setState({isLoading: false })});
    }
  }

  handleSubmit =  (query) => {
    this.setState({ query, isLoading: true, page: 1 });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }))
  };

  renderButtonOrLoader = () => {
    return this.state.isLoading ? ( 
            <Loader/> 
            ) : ( 
              !!this.state.images.length && 
              this.state.images.length < this.state.totalImages &&
              (<Button onLoadMore={this.handleLoadMore}/> )
            )
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit}/>
        <ImageGallery images={this.state.images}/>
        {this.renderButtonOrLoader()}
      </> 
    )
  }
}
