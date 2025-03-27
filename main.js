document.getElementById('run-btn').addEventListener('click', function() {
    const htmlCode = document.getElementById('html-code').value;
    const cssCode = document.getElementById('css-code').value;
    const jsCode = document.getElementById('js-code').value;

    const outputFrame = document.getElementById('output-frame');
    const frameDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;

    frameDoc.open();
    frameDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `);
    frameDoc.close();
});

// Add some example code
document.getElementById('html-code').value = '<h1>Hello World</h1>\n<button onclick="showMessage()">Click me!</button>';
document.getElementById('css-code').value = 'h1 {\n    color: blue;\n}\n\nbutton {\n    padding: 10px;\n    background-color: #61dafb;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}';
document.getElementById('js-code').value = 'function showMessage() {\n    alert("Hello from JavaScript!");\n}';