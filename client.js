window.__SKYWAY_KEY__ = '73c9b442-df7d-448f-a283-5d117794ba73';

let localStream;
const myVideo = document.getElementById('my-video');
const theirVideo = document.getElementById('their-video');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        myVideo.srcObject = stream;
        myVideo.play();
        localStream = stream;
    }).catch(error => {
        console.error('mediaDevice.getUserMedia() error:', error);
});

const peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3
});

peer.on('open', () => {
    document.getElementById('my-id').textContent = peer.id;
});

document.getElementById('call-btn').onclick = () => {
    const theirID = document.getElementById('their-id').value;
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
};

const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
        theirVideo.srcObject = stream;
        theirVideo.play();
    });
}

peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
});
