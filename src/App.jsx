import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import Header from './sections/header.jsx';
import CallList from './sections/call-list.jsx';
import Footer from './sections/footer.jsx';
import CallDetails from './sections/call-details.jsx';

import './css/app.css';

const axios = require('axios').default;

const retrieveCallsPath = 'https://aircall-job.herokuapp.com/activities';
const retrieveCallPath = 'https://aircall-job.herokuapp.com/activities/';
const updateCallPath = 'https://aircall-job.herokuapp.com/activities/'


const App = () => {
  const [selectedPage, setSelectedPage] = useState('Activity');
  const [activityCallList, setActivityCallList] = useState([]);
  const [archivedCallList, setArchivedCallList] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);

  const retrieveCalls = () => {
    axios.get(retrieveCallsPath)
      .then(response => {
        setActivityCallList((response.data.filter(call => call.is_archived === false)).map((call) => Object.assign(call, { showDetails: false })));
        setArchivedCallList(response.data.filter(call => call.is_archived === true));
        console.log('Call List', response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  const retrieveCall = (callId) => {
    axios.get(retrieveCallPath + callId)
      .then(response => {
        console.log('Retrieved Call', response)
      })
      .catch(e => {
        console.log(e);
      })
  }

  const handleSuccessfulUpdate = (call, param) => {
    if (param) {
      setActivityCallList(activityCallList.filter((activityCall) => activityCall.id !== call.id));
      setArchivedCallList([...archivedCallList, call]);
    } else {
      setActivityCallList([...activityCallList, call]);
      setArchivedCallList(archivedCallList.filter((archivedCall) => archivedCall.id !== call.id));
    }
  }

  const updateCall = (callId, param) => {
    axios.post(updateCallPath + callId, {
      is_archived: param
    }).then(response => {
      // Successfully archived call
      handleSuccessfulUpdate(response.data, param);
    }).catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    retrieveCalls();
  }, [])


  const renderActivity = () => {
    const pageTitle = 'Activity';
    return (
      <div className='render-container'>
        <div className='header-call-list-container'>
          <Header pageTitle={pageTitle} retrieveCall={retrieveCall}/>
          {activityCallList.length > 0 ? <CallList setSelectedPage={setSelectedPage} setSelectedCall={setSelectedCall} callList={activityCallList} updateCall={updateCall}/> : null}
        </div>
        <Footer setSelectedPage={setSelectedPage} selectedPage={selectedPage}/>
      </div>
    )
  }

  const renderArchive = () => {
    const pageTitle = 'Archive';
    return (
      <div className='render-container'>
        <div className='header-call-list-container'>
          <Header pageTitle={pageTitle} retrieveCall={retrieveCall}/>
          {archivedCallList.length > 0 ?  <CallList setSelectedPage={setSelectedPage} setSelectedCall={setSelectedCall} callList={archivedCallList} updateCall={updateCall}/> : null}
        </div>
        <Footer setSelectedPage={setSelectedPage} selectedPage={selectedPage}/>
    </div>
    )
  }

  const renderProfile = () => {
    const pageTitle = 'Profile';
    return (
      <div className='render-container'>
        <div className='header-call-list-container'>
          <Header pageTitle={pageTitle} retrieveCall={retrieveCall}/>
        </div>
        <Footer setSelectedPage={setSelectedPage} selectedPage={selectedPage}/>
    </div>
    )
  }

  const renderCallDetails = () => {
    const pageTitle = 'Details';
    return (
      <div className='render-container'>
        <div className='header-call-list-container'>
          <Header pageTitle={pageTitle} retrieveCall={retrieveCall}/>
          {selectedCall ? <CallDetails setSelectedPage={setSelectedPage} updateCall={updateCall} selectedCall={selectedCall}/> : null}
        </div>
        <Footer setSelectedPage={setSelectedPage} selectedPage={selectedPage}/>
    </div>
    )
  }


  return (
    <div className='container'>
      {selectedPage === 'Activity' ? renderActivity() : null}
      {selectedPage === 'Archived' ? renderArchive() : null}
      {selectedPage === 'Profile' ? renderProfile() : null}
      {selectedPage === 'CallDetails' ? renderCallDetails() : null}
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App/>);

export default App;