import React, { useState, useEffect } from 'react';
import AudioStream from './AudioStream';
import AudioFilter from './AudioFilter';
import AudioVisualizer from './AudioVisualizer';

function App() {
  const [stream, setStream] = useState(null);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [audioInputs, setAudioInputs] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const inputs = devices.filter(device => device.kind === 'audioinput');
        const outputs = devices.filter(device => device.kind === 'audiooutput');
        setAudioInputs(inputs);
        setAudioOutputs(outputs);
      });
  }, []);

  useEffect(() => {
    if (audioInputs.length > 0) {
      const inputSelect = document.getElementById('audioInput');
      audioInputs.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Microphone ${inputSelect.length + 1}`;
        inputSelect.appendChild(option);
      });
    }

    if (audioOutputs.length > 0) {
      const outputSelect = document.getElementById('audioOutput');
      audioOutputs.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Speaker ${outputSelect.length + 1}`;
        outputSelect.appendChild(option);
      });
    }
  }, [audioInputs, audioOutputs]);

  return (
    <div className="App">
      <h1>Audio Streaming App</h1>
      <AudioStream onStreamChange={setStream} />
      <AudioFilter stream={stream} isFilterOn={isFilterOn} />
      <AudioVisualizer stream={stream} />
      <button onClick={() => setIsFilterOn(!isFilterOn)}>
        {isFilterOn ? 'Turn Off Filter' : 'Turn On Filter'}
      </button>
    </div>
  );
}

export default App;