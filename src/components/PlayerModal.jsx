import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function PlayerModal({ channel, onClose }) {
  const videoRef = useRef();

  useEffect(() => {
    let hls;
    if (videoRef.current) {
      if (Hls.isSupported() && channel.url.endsWith(".m3u8")) {
        hls = new Hls();
        hls.loadSource(channel.url);
        hls.attachMedia(videoRef.current);
        return () => hls.destroy();
      } else {
        videoRef.current.src = channel.url;
      }
    }
    return () => { if (hls) hls.destroy(); }
  }, [channel]);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()}>
        <video ref={videoRef} controls autoPlay style={{width:"100%"}} />
        <div style={{marginTop:10}}>{channel.name}</div>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}