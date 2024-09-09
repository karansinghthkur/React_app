import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

const AudioStream = ({ onStreamChange }) => {
  const [peer, setPeer] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const localAudioRef = useRef();
  const remoteAudioRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setLocalStream(stream);
        localAudioRef.current.srcObject = stream;
        onStreamChange(stream);

        const newPeer = new Peer({ initiator: window.location.hash === '#init', trickle: false, stream });
        setPeer(newPeer);

        newPeer.on('signal', data => {
          const stringifiedData = JSON.stringify(data);
          console.log('Signal data to share:', stringifiedData);
        });

        newPeer.on('stream', stream => {
          setRemoteStream(stream);
          remoteAudioRef.current.srcObject = stream;
          setConnectionEstablished(true);
        });
      });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onStreamChange]);

  const connectPeers = () => {
    const signalData = prompt('Enter the signal data from the other peer:');
    peer.signal(JSON.parse(signalData));
  };

  const handleAudioInputChange = (event) => {
    const deviceId = event.target.value;
    navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: deviceId } } })
      .then(stream => {
        setLocalStream(stream);
        localAudioRef.current.srcObject = stream;
        onStreamChange(stream);
        peer.replaceTrack(peer.streams[0].getAudioTracks()[0], stream.getAudioTracks()[0], peer.streams[0]);
      });
  };

  return (
    <div>
      <h2>Audio Streaming</h2>
      <div>
        <label htmlFor="audioInput">Audio Input: </label>
        <select id="audioInput" onChange={handleAudioInputChange}>
          {/* Audio input options will be populated dynamically */}
        </select>
      </div>
      <div>
        <label htmlFor="audioOutput">Audio Output: </label>
        <select id="audioOutput" onChange={(e) => {
          remoteAudioRef.current.setSinkId(e.target.value);
        }}>
          {/* Audio output options will be populated dynamically */}
        </select>
      </div>
      <audio ref={localAudioRef} muted autoPlay />
      <audio ref={remoteAudioRef} autoPlay />
      {!connectionEstablished && <button onClick={connectPeers}>Connect to Peer</button>}
      {connectionEstablished && <p>Connected to peer!</p>}
    </div>
  );
};

export default AudioStream;