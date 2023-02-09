import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImages } from 'services/apiServices';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { useEffect, useState } from 'react';

export default function App () {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (query === '')
      return ;
    fetchImages(query, page).then(resp => {
      if (!resp)
        return null;
      if (page === 1)
        setImages([...resp.hits])
      else
        setImages(prevState => [...prevState, ...resp.hits])
      setTotalImages(resp.totalHits); 
    }).finally(() => setIsLoading(false))
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query)
    query === '' ? setIsLoading(false) : setIsLoading(true)
    setPage(1)
    setImages([])
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  }

  const renderButtonOrLoader = () => {
    return isLoading ? ( 
            <Loader/> 
            ) : ( 
              !!images.length && 
                images.length < totalImages &&
              (<Button onLoadMore={handleLoadMore}/> )
            )
  }

  return (
      <>
        <Searchbar onSubmit={handleSubmit}/>
        <ImageGallery images={images}/>
        {renderButtonOrLoader()}
      </> 
    )
}

