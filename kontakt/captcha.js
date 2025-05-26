function randomCaptchaText(length = 6) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let text = '';
    for (let i = 0; i < length; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
}

function drawCaptcha(text) {
    const canvas = document.getElementById('captcha-canvas');

    canvas.width = 160;
    canvas.height = 46;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 20; i++) {
        ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    for (let i = 0; i < text.length; i++) {
        ctx.save();
        ctx.font = `${28 + Math.random() * 8}px Arial`;
        ctx.fillStyle = `rgb(${80 + Math.random()*100},${80 + Math.random()*100},${80 + Math.random()*100})`;
        ctx.translate(20 + i * 22, 30 + Math.random() * 8);
        ctx.rotate((Math.random() - 0.5) * 0.4);
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
    }
}

let captchaText = randomCaptchaText();
drawCaptcha(captchaText);

document.getElementById('refresh-captcha').onclick = function() {
    captchaText = randomCaptchaText();
    drawCaptcha(captchaText);
};

document.querySelector('.kontakt').addEventListener('submit', function(e) {
    const input = document.getElementById('captcha-input').value.trim();
    if (input !== captchaText) {
        alert('Nieprawidłowy kod z obrazka.');
        e.preventDefault();
        captchaText = randomCaptchaText();
        drawCaptcha(captchaText);
    }
});