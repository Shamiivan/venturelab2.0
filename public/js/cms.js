document.getElementById('uploadImg').onclick = function () {
    alert(`You have to click the submit button to upload the video`);
    document.getElementById('image-form').style.display = 'block';
    document.getElementById('uploadImg').style.display = 'none';

};

document.getElementById('uploadVideo').onclick = function () {
    alert(`I sure hope you know what you're doing`);
    document.getElementById('video-form').style.display = 'block';
    document.getElementById('uploadVideo').style.display = 'none';

};