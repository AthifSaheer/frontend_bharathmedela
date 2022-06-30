import React, { useState, useEffect } from "react";
import "./../styles/TalkToTeacher.scss";

// the following imports are only needed when you're recording
// audio-only using the videojs-wavesurfer plugin
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.js";

// register videojs-wavesurfer plugin
import "videojs-wavesurfer/dist/css/videojs.wavesurfer.css";
import Wavesurfer from "videojs-wavesurfer/dist/videojs.wavesurfer.js";
// Audio
import "video.js/dist/video-js.min.css"; // imp
import videojs from "video.js"; // imp
import RecordRTC from "recordrtc"; // imp
import "videojs-record/dist/css/videojs.record.css"; // imp
import Record from "videojs-record/dist/videojs.record.js";
import axios from "axios";

import { useHistory } from "react-router-dom";

WaveSurfer.microphone = MicrophonePlugin;

export default function TalkToTeacher() {
  const history = useHistory();
  const [isAudio, setIsAudio] = useState(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    try {
      if (isAudio === false) {
        let options = {
          // video.js options
          controls: true,
          bigPlayButton: false,
          loop: false,
          fluid: false,
          width: 320,
          height: 240,
          plugins: {
            // videojs-record plugin options
            record: {
              image: false,
              audio: true,
              video: true,
              maxLength: 10 * 60,
              displayMilliseconds: true,
              debug: true,
            },
          },
        };

        let player = videojs("myVideo", options, function () {
          // print version information at startup
          const msg =
            "Using video.js " +
            videojs.VERSION +
            " with videojs-record " +
            videojs.getPluginVersion("record");
          videojs.log(msg);
          console.log("videojs-record is ready!");
        });
        // error handling
        player.on("deviceError", function () {
          console.log("device error:", player.deviceErrorCode);
        });

        player.on("error", function (element, error) {
          console.error(error);
        });

        // user clicked the record button and started recording
        player.on("startRecord", function () {
          console.log("started recording!");
        });

        // user completed recording and stream is available
        player.on("finishRecord", async () => {
          // the blob object contains the recorded data that
          // can be downloaded by the user, stored on server etc.
          await axios
            .post("http://127.0.0.1:8000/api/getVideoFromStudent", player.recordedData)
            .then((res) => {})
            .catch((e) => {
              //
            });
          setMsg("Video has been uploaded");
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
          console.log("finished recording: ", player.recordedData);
        });
      } else if (isAudio === true) {
        let options = {
          controls: true,
          bigPlayButton: false,
          width: 600,
          height: 300,
          fluid: false,
          plugins: {
            wavesurfer: {
              backend: "WebAudio",
              waveColor: "#36393b",
              progressColor: "black",
              displayMilliseconds: true,
              debug: true,
              cursorWidth: 1,
              hideScrollbar: true,
              plugins: [
                // enable microphone plugin
                WaveSurfer.microphone.create({
                  bufferSize: 4096,
                  numberOfInputChannels: 1,
                  numberOfOutputChannels: 1,
                  constraints: {
                    video: false,
                    audio: true,
                  },
                }),
              ],
            },
            record: {
              audio: true,
              video: false,
              maxLength: 100000,
              displayMilliseconds: true,
              debug: true,
            },
          },
        };

        let player = videojs("myAudio", options, function () {
          // print version information at startup
          const msg =
            "Using video.js " +
            videojs.VERSION +
            " with videojs-record " +
            videojs.getPluginVersion("record");
          videojs.log(msg);
          console.log("videojs-record is ready!");
        });
        // error handling
        player.on("deviceError", function () {
          console.log("device error:", player.deviceErrorCode);
        });

        player.on("error", function (element, error) {
          console.error(error);
        });

        // user clicked the record button and started recording
        player.on("startRecord", function () {
          console.log("started recording!");
        });

        // user completed recording and stream is available
        player.on("finishRecord", async () => {
          // the blob object contains the recorded data that
          // can be downloaded by the user, stored on server etc.
          await axios
            .post("api/getAudioFromStudent", player.recordedData)
            .then((res) => {})
            .catch((e) => {
              //
            });
          setMsg("Audio has been uploaded");
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
          console.log("finished recording: ", player.recordedData);
        });
      }
    } catch (e) {
      // nothng
    }
  }, [isAudio]);
  return (
    <div className="__TalkToTeacher">
      {isAudio === null ? (
        <div className="options">
          <input
            type="button"
            className="btn"
            value="Record Video"
            onClick={() => {
              setIsAudio(false);
            }}
          />
          <input
            type="button"
            className="btn"
            value="Record Audio"
            onClick={() => {
              setIsAudio(true);
            }}
          />
        </div>
      ) : isAudio ? (
        <audio id="myAudio" class="video-js vjs-default-skin"></audio>
      ) : (
        <video
          id="myVideo"
          playsinline
          class="video-js vjs-default-skin"
        ></video>
      )}
      {<span className="msg">{msg}</span>}
    </div>
  );
}
