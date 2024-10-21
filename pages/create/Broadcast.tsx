import React, { useEffect, useRef } from 'react';
import { Button } from '../../components/shared';

let ml5: { objectDetector: (arg0: string, arg1: () => void) => any; };
if (typeof window !== 'undefined') {
  ml5 = require('ml5');
}

let bananaDetectedInPreviousCycle = false;

export default function Broadcast(props: { streamID: any; }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (video) {
          video.srcObject = mediaStream;
          video.play();
        }
        streamRef.current = mediaStream;
      } catch (err) {
        console.error('An error occurred:', err);
      }
    }

    if (canvas && video) {
      video.addEventListener('play', () => {
        function draw() {
          if (!video || video.paused || video.ended) return;
          context!.drawImage(video, 0, 0, canvas!.width, canvas!.height);
          requestAnimationFrame(draw);
        }
        draw();
      });
    }

    setupCamera();

    return () => {
      if (video && video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach((track: { stop: () => any; }) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let detectionInterval: string | number | NodeJS.Timeout | undefined;

    if (typeof window !== 'undefined' && ml5) {
      const modelLoaded = () => {
        console.log('Model Loaded!');
        detectionInterval = setInterval(() => {
          detect();
        }, 200);
      };

      const objectDetector = ml5.objectDetector('cocossd', modelLoaded);

      const detect = () => {
        if (!streamRef.current) return;
        objectDetector.detect(canvasRef.current, (err: any, results: { label: any; x: any; y: any; width: any; height: any; }[]) => {
          if (err) {
            console.error(err);
            return;
          }
          const ctx = canvasRef.current?.getContext('2d');
          // Check if any of the detected labels is a banana
          const isBananaDetected = results.some(result => result.label === 'banana');
          if (isBananaDetected) {
            // Option 1: Redirect the user
            // window.location.href = 'https://example.com';

            // Option 2: End the stream
            streamRef.current?.getTracks().forEach(track => track.stop());


            // Since we're redirecting or ending the stream, we don't need to draw anything on the canvas
            return;
          } else {
            // If no banana is detected, clear the previous drawings and redraw. This is necessary to update the canvas with new detections.
            ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height); // Clear the canvas for new drawings
            results.forEach(({ label, x, y, width, height }) => {
              ctx!.beginPath();
              ctx!.fillStyle = "#FF0000"; // Red for detected objects
              ctx!.fillText(label, x, y - 5); // Draw the label
              ctx!.rect(x, y, width, height); // Draw the bounding box
              ctx!.stroke(); // Complete the drawing
            });
          }
        });
      };
    }

    return () => {
      if (detectionInterval) clearInterval(detectionInterval);
    };
  }, []);

  const startStream = async () => {

    // objectDetector.detect(stream, (err:any, results:any) => {

    // const ctx = canvas.getContext('2d');
    // ctx?.clearRect(0, 0, canvas.width, canvas.height);
    // if (results && results.length) {
    //   results.forEach((detection:any) => {
    //     ctx?.beginPath();
    //     ctx ? ctx.fillStyle = "#FF0000" : null;
    //     const { label, x, y, width, height } = detection;
    //     ctx?.fillText(label, x, y - 5);
    //     ctx?.rect(x, y, width, height);
    //     ctx?.stroke();
    //   });
    // }
    // });
    const redirectUrl = `https://mia-prod-catalyst-0.lp-playback.studio:443/webrtc/${props.streamID}`;
    // we use the host from the redirect URL in the ICE server configuration
    const host = new URL(redirectUrl).host;
    console.log("host", host);
    const iceServers = [
      {
        urls: `stun:${host}`,
      },
      {
        urls: `turn:${host}`,
        username: "livepeer",
        credential: "livepeer",
      },
    ];

    // get user media from the browser (which are camera/audio sources)
    const mediaStream = streamRef.current;
    const peerConnection = new RTCPeerConnection({ iceServers });



    const newVideoTrack = mediaStream?.getVideoTracks?.()?.[0] ?? null;
    const newAudioTrack = mediaStream?.getAudioTracks?.()?.[0] ?? null;
    let videoTransceiver: any;
    let audioTransceiver: any;
    if (newVideoTrack) {
      videoTransceiver =
        peerConnection?.addTransceiver(newVideoTrack, {
          direction: "sendonly",
        }) ?? null;
    }

    if (newAudioTrack) {
      audioTransceiver =
        peerConnection?.addTransceiver(newAudioTrack, {
          direction: "sendonly",
        }) ?? null;
    }

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
     * We create an SDP offer here which will be shared with the server
     */
    const offer = await peerConnection.createOffer();
    /** https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setLocalDescription */
    await peerConnection.setLocalDescription(offer);
    console.log("establishing connection", offer);
    let ofr: any;
    /** Wait for ICE gathering to complete */
    ofr = await new Promise((resolve) => {
      /** Wait at most five seconds for ICE gathering. */
      setTimeout(() => {
        resolve(peerConnection.localDescription);
      }, 5000);
      peerConnection.onicegatheringstatechange = (_ev) => {
        if (peerConnection.iceGatheringState === "complete") {
          resolve(peerConnection.localDescription);
        }
      };
    });
    if (!ofr) {
      throw Error("failed to gather ICE candidates for offer");
    }
    /**
     * This response contains the server's SDP offer.
     * This specifies how the client should communicate,
     * and what kind of media client and server have negotiated to exchange.
     */


    const sdpResponse = await fetch(redirectUrl, {
      method: "POST",
      headers: {
        "content-type": "application/sdp"
      },
      //ignore ts error
      // eslint-disable-next-line 
      body: ofr.sdp,
    });
    console.log("sdp", sdpResponse);
    if (sdpResponse.ok) {
      const answerSDP = await sdpResponse.text();
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp: answerSDP })
      );
    }

  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} width="400" height="500" className="canvas"></canvas>
      <Button
        className="bg-primary border-primary text-background px-4 py-2.5"
        text="text-sm"
        onClick={() => startStream()}
      >
        Start Stream!
      </Button>
    </div>
  );
}