import React, { useEffect, useRef, useState } from 'react';

const AudioFilter = ({ stream, isFilterOn }) => {
  const audioContextRef = useRef();
  const sourceNodeRef = useRef();
  const filterNodeRef = useRef();
  const gainNodeRef = useRef();

  useEffect(() => {
    if (!stream) return;

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream);
    filterNodeRef.current = audioContextRef.current.createBiquadFilter();
    gainNodeRef.current = audioContextRef.current.createGain();

    filterNodeRef.current.type = 'lowpass';
    filterNodeRef.current.frequency.value = 200;
    gainNodeRef.current.gain.value = 0.75;

    sourceNodeRef.current.connect(filterNodeRef.current);
    filterNodeRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stream]);

  useEffect(() => {
    if (filterNodeRef.current && gainNodeRef.current) {
      if (isFilterOn) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current.connect(filterNodeRef.current);
        filterNodeRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);
      } else {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current.connect(audioContextRef.current.destination);
      }
    }
  }, [isFilterOn]);

  return null;
};

export default AudioFilter;