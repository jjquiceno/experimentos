document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
});

document.getElementById('add-text').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;
    const text = new fabric.Text(textInput, {
        left: 100,
        top: 100,
        fill: 'red'
    });
    canvas.add(text);
});
canvas.on('mouse:dblclick', function(event) {
    const target = canvas.findTarget(event.e);
    if (target && target.type === 'text') {
        const newText = prompt('Edita el texto:', target.text);
        if (newText !== null) {
            target.text = newText;
            canvas.renderAll();
        }
    }
});