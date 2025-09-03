import { el, div, View } from "/framework/core/core.js";
import Socket from "/framework/ext/Socket/Socket.js";


Socket.singleton();

View.body().init();



el("h1", "Select Camera");
const $select = el("select").attr("id", "cameraSelect");
const $video = el("video").attr("id", "video").attr("autoplay", true).attr("playsinline", true).style("width", "640px");

const video = $video.el;
const select = $select.el;

    async function listCameras() {
      try {
        console.log('Requesting camera permission...');
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('Permission granted, enumerating devices...');

        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log('Devices found:', devices);

        const cameras = devices.filter(device => device.kind === 'videoinput');
        console.log('Video input devices:', cameras);

        select.innerHTML = ''; // Clear dropdown
        cameras.forEach((camera, index) => {
          const option = document.createElement('option');
          option.value = camera.deviceId;
          option.text = camera.label || `Camera ${index + 1}`;
          select.appendChild(option);
        });

        if (cameras.length > 0) {
          startCamera(select.value);
        } else {
          console.log('No cameras found.');
        }
      } catch (err) {
        console.error('Error accessing cameras:', err);
      }
    }

    async function startCamera(deviceId) {
      try {
        if (window.stream) {
          window.stream.getTracks().forEach(track => track.stop());
        }

        console.log('Starting camera with deviceId:', deviceId);
        const constraints = { video: { deviceId: { exact: deviceId } } };
        window.stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = window.stream;
      } catch (err) {
        console.error('Error starting camera:', err);
      }
    }

    select.addEventListener('change', () => startCamera(select.value));

    listCameras();