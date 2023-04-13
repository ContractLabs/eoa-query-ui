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
  const [isDone, setDone] = useState(false);
  const [links, setLinks] = useState<any[] | null>([]);
  const { data: signer } = useSigner();

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setLoading(true);
    const nonce = 1;
    const message = `Date: ${date?.getTime()}\nNonce: ${nonce}`
    const signature = await signer?.signMessage(message);
    console.log(message);
    if (signature && message) {
      fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signature, message })
      })
        .then(response => response.json())
        .then(data => {
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          throw error;
        });
    }
  };

  const handleGet = async (event: any) => {
    event.preventDefault();
    const address = await signer?.getAddress();
    console.log(address);
    if (address) {
      fetch('/api/get-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address })
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            setDone(true);
            setLinks(data.data);
          }
        })
        .catch(error => {
          setLoading(false);
          throw error;
        });
    }
  }

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
        <DateTimePicker minDate={new Date()} onChange={value => setDate(value)}  value={date} />
        <button onClick={handleSubmit} type="submit" disabled={loading}>{ loading ? "Loading..." : "Submit" }</button>
      </div>
      <div className='results'>
        <button className='get-btn' onClick={handleGet}>
          Get link download
        </button>
        {isDone && links?.length !== 0 ? (
          <div className='links'>
            <table>
              <thead>
                <tr>
                  <th>Datetime</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {links?.map(link => (
                  <tr key={link.name}>
                    <td>{new Date(parseInt(link.name)).toUTCString()}</td>
                    <td><a href={link.link} target='_blank' rel="noreferrer">{link.link}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='links'>The file is not ready!</div>
        )}
      </div>
    </div>
  );
}

export default App;

