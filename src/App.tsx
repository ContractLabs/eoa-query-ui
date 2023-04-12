import React, { useState } from 'react';
// import Calendar from 'react-calendar';
import './App.css';
import { useSigner } from 'wagmi';
import 'react-clock/dist/Clock.css';
import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { DateTimePicker } from 'react-datetime-picker';
import { ConnectButton } from '@rainbow-me/rainbowkit';


function App() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const { data: signer } = useSigner();

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setLoading(true);
    const nonce = new Date().getTime();
    const message = `
      Message: 
        Date: ${date?.toUTCString() as string}
        Nonce: ${nonce}
    `
    const signature = signer?.signMessage(message);
    console.log(signature);
    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ signature })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className='App'>
      <div className='connection'>
        <ConnectButton/>
      </div>
      <div className='selection'>
        <div className='selected'>
          <span>Date: {date?.toDateString()}</span>
          <span>Time: {date?.toTimeString()}</span>
        </div>
        {/* <Calendar onClickDay={value => setDate(value)} minDate={new Date()} /> */}
        <DateTimePicker minDate={new Date()} onChange={value => setDate(value)}  value={date} />
        <button onClick={handleSubmit} type="submit" disabled={loading}>{ loading ? "Loading..." : "Submit" }</button>
      </div>
    </div>
  );
}

export default App;

