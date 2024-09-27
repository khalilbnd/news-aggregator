import { useEffect, useState } from 'react';
import Header from './Header';
import './style.css';
import { requests } from '../../services/config';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // <-- Import the CSS here
import { socket } from '../../socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const theme = useSelector((state: RootState) => state.settingReducer.theme);

  const [searchText, setSearchText] = useState('')

  // Fetch initial news data
  useEffect(() => {
    setLoading(true); // Optionally set loading state
    requests.get('/api/news')
      .then((res) => {
        console.log(res);
        setPageIndex(res.page);
        setData(res.data);
      })
      .catch(err => {
        toast.error('Failed to load data'); // Display an error toast in case of failure
      })
      .finally(() => {
        setLoading(false); // Reset loading state after fetching
      });
  }, []);

  // Socket event listeners
  useEffect(() => {
    if(searchText == ''){
      
      const handleMessage = (data) => {
        console.log(data);
      };
  
      const handleNews = (d) => {
        console.log(d);
        setData((prevData) => [d, ...prevData]); // Use functional update for prev state
        toast.success(`${d.title}`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
  
      // Register event listeners
      socket.on('message', handleMessage);
      socket.on('news', handleNews);
  
      // Clean up the listeners
      return () => {
        socket.off('message', handleMessage);
        socket.off('news', handleNews);
      };
    }
  }, [socket]);


  // Search news data
  useEffect(()=>{
    if(searchText != ''){
      setLoading(true);
      requests.get(`/api/news?title=${searchText}`)
        .then((res) => {
          setPageIndex(res.page);
          setData(res.data);
        })
        .catch(err => {
          toast.error('Failed to load data'); // Display an error toast in case of failure
        })
        .finally(() => {
          setLoading(false); // Reset loading state after fetching
        });
    }
    else {
      setLoading(true); // Optionally set loading state
      requests.get('/api/news')
        .then((res) => {
          console.log(res);
          setPageIndex(res.page);
          setData(res.data);
        })
        .catch(err => {
          toast.error('Failed to load data'); // Display an error toast in case of failure
        })
        .finally(() => {
          setLoading(false); // Reset loading state after fetching
        })
    }

  }, [searchText])

  // Load more news data
  const loadMore = () => {
    setLoading(true);
    requests.get(`/api/news?page=${pageIndex + 1}`)
      .then((res) => {
        setPageIndex(res.page);
        setData((prevData) => [...prevData, ...res.data]); // Use functional update to preserve previous state
        toast.success(`${res.data.length} news loaded`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(err => {
        toast.error('Error loading more data'); // Display an error toast in case of failure
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <div id="main" style={{backgroundColor: theme == 'light' ? "white" : "black"}}>
      <Header changeText={setSearchText}/>

      <h1 style={{color: theme == 'light' ? 'black' : 'white'}}>Latest News</h1>
      <div id="content">
        {data.map((article, index) => (
          <div key={index} className='news-container' style={{backgroundColor: theme == 'light' ? "lightgray" : "#272727"}}>
            <img src={'https://seeklogo.com/images/B/bbc-news-logo-8648ABD044-seeklogo.com.png'} className='img' alt="News"/>
            <h3 style={{color: theme == 'light' ? 'black' : 'white'}}>{article.title}</h3>
            <a href={article.link} target='_blank' rel='noopener noreferrer'>{article.source.name}</a>
            <p>{new Date(article.pubDate).toDateString()} - {new Date(article.pubDate).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>

      <Button 
        disabled={loading} 
        variant="contained" 
        style={{ backgroundColor: loading ? 'grey' : theme == 'light' ? 'black' : 'white', fontWeight: '700', color: theme == 'light' ? 'white' : 'black' }} 
        onClick={loadMore} 
        size='large'
      >
        {loading ? 'Loading...' : 'Load More'}
      </Button>

      {/* Toast Container for displaying notifications */}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Home;
