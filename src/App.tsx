import React, { useState } from 'react';
import './App.css';
import { useSigner } from 'wagmi';
import 'react-clock/dist/Clock.css';
import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { DateTimePicker } from 'react-datetime-picker';
import { ConnectButton } from '@rainbow-me/rainbowkit';


function App() {
  const apiURL = process.env.API;
  const submitEndpoint = '/api/submit';
  const getLinkEndpoint = '/api/get-links';
  const [date, setDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false);
  const [links, setLinks] = useState<any[] | null>([]);
  const { data: signer } = useSigner();

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setLoading(true);
    const nonce = Math.floor(Math.random() * 10000);
    const message = `Date: ${date?.getTime()}\nNonce: ${nonce}`;
    let signature: string | undefined = "";
    if (!signer) {
      alert("Please connect wallet to submit");
      setLoading(false);
    }
    try {
      signature = await signer?.signMessage(message);
    } catch (error) {
      setLoading(false);
    }
    if (signature && message) {
      fetch(`${apiURL}${submitEndpoint}`, {
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
    if (!signer) {
      alert("Please connect wallet to get file links");
      setLoading(false);
    }
    const address = await signer?.getAddress();
    if (address) {
      fetch(`${apiURL}${getLinkEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address })
      })
        .then(response => response.json())
        .then(data => {
          setDone(true);
          setLinks(data.data);
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

