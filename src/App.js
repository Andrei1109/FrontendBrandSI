import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Statistics from './Statistics';
import Posts from './Posts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const App = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataBrand,setDataBrand]= useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 0,
            method: 'socialinsider_api.get_brands',
            params: {
              projectname: 'API_test',
            },
          }),
        });

        const data = await response.json();

        if (data && data.result) {
          setBrands(data.result);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleBrandSelect = (event) => {
    const selectedBrandName = event.target.value;

    const selectedBrand = brands.find((brand) => brand.brandname === selectedBrandName);
    setDataBrand(selectedBrand)
    if (selectedBrand) {
      localStorage.setItem('selectedBrand', JSON.stringify(selectedBrand));
      setSelectedBrand(selectedBrandName);
    }
  };

  useEffect(() => {
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');
  

    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 7); // One week ago
    const defaultEndDate = new Date();

    const parsedStartDate = storedStartDate ? new Date(storedStartDate) : defaultStartDate;
    const parsedEndDate = storedEndDate ? new Date(storedEndDate) : defaultEndDate;

    setStartDate(parsedStartDate);
    setEndDate(parsedEndDate);

    localStorage.setItem('startDate', parsedStartDate.toISOString());
    localStorage.setItem('endDate', parsedEndDate.toISOString());

    const storedBrand = localStorage.getItem('selectedBrand');
    
    if (storedBrand) {
      const parsedBrand = JSON.parse(storedBrand);
      setDataBrand(parsedBrand)
      setSelectedBrand(parsedBrand.brandname);
    }
  }, []);
  // Save dates to local storage
  return (
    <Router>
      <div className="container">
        <h1 className="heading">List of Brands</h1>
        <div className="header">
          <div className="datepickers">
            <div className="datepicker-item">
              <p>Start Date:</p>
              <DatePicker
                className="datepicker"
                selected={startDate}
                onChange={(date) => { setStartDate(date); localStorage.setItem('startDate', date.toISOString()); }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div className="datepicker-item">
              <p>End Date:</p>
              <DatePicker
                className="datepicker"
                selected={endDate}
                onChange={(date) => { setEndDate(date); localStorage.setItem('endDate', date.toISOString()); }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          <select className="brand-select" value={selectedBrand} onChange={handleBrandSelect}>
        <option value="">Select a brand</option>
        {brands.map((brand) => (
          <option key={brand.brandname} value={brand.brandname}>
            {brand.brandname}
          </option>
        ))}
      </select>
        </div>
        {selectedBrand && (
          <div className="selected-brand-info">
            <nav className="navbar">
              <Link to="/posts" className={`nav-btn ${activeTab === 'posts' ? 'active' : ''}`}>
                Posts
              </Link>
              <Link
                to="/statistics"
                className={`nav-btn ${activeTab === 'statistics' ? 'active' : ''}`}
              >
                Statistics
              </Link>
            </nav>
            <Routes>
              <Route path="/posts" element={<Posts brands={dataBrand} startDate={startDate} endDate={endDate}/>} />
              <Route path="/statistics" element={<Statistics brands={dataBrand}  startDate={startDate} endDate={endDate} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );



};

export default App;
