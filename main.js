document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        document.documentElement.style.setProperty('--bg-dark', isDark ? '#1e1e1e' : '#ffffff');
        document.documentElement.style.setProperty('--bg-lighter', isDark ? '#2d2d2d' : '#f0f0f0');
        document.documentElement.style.setProperty('--text-color', isDark ? '#ffffff' : '#1e1e1e');
    });

    // Copy button functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const textarea = document.getElementById(targetId);
            textarea.select();
            document.execCommand('copy');
            
            // Show feedback
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalIcon;
            }, 1000);
        });
    });

    // Clear button functionality
    document.getElementById('clear-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all code?')) {
            document.getElementById('html-code').value = '';
            document.getElementById('css-code').value = '';
            document.getElementById('js-code').value = '';
            document.getElementById('php-code').value = '';
            document.getElementById('python-code').value = '';
            updateOutput();
        }
    });

    // Run button functionality
    document.getElementById('run-btn').addEventListener('click', updateOutput);

    // Refresh button functionality
    document.getElementById('refresh-btn').addEventListener('click', updateOutput);

    function updateOutput() {
        const htmlCode = document.getElementById('html-code').value;
        const cssCode = document.getElementById('css-code').value;
        const jsCode = document.getElementById('js-code').value;
        const phpCode = document.getElementById('php-code').value;
        const pythonCode = document.getElementById('python-code').value;

        const outputFrame = document.getElementById('output-frame');
        const frameDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;

        frameDoc.open();
        frameDoc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <div id="php-output"></div>
                <div id="python-output"></div>
                <script>${jsCode}</script>
                <script>
                    // Simulate PHP output (in real implementation, this would require a server)
                    if ('${phpCode}'.trim()) {
                        document.getElementById('php-output').innerHTML = 
                            '<div style="background: #f8f9fa; padding: 10px; margin: 10px 0; border-radius: 4px;">' +
                            '<strong>PHP Output (Simulation):</strong><br>' +
                            '${phpCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}' +
                            '</div>';
                    }
                    
                    // Simulate Python output (in real implementation, this would require a server)
                    if ('${pythonCode}'.trim()) {
                        document.getElementById('python-output').innerHTML = 
                            '<div style="background: #f8f9fa; padding: 10px; margin: 10px 0; border-radius: 4px;">' +
                            '<strong>Python Output (Simulation):</strong><br>' +
                            '${pythonCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}' +
                            '</div>';
                    }
                </script>
            </body>
            </html>
        `);
        frameDoc.close();
    }

    // Add example code
    document.getElementById('html-code').value = '<div class="container">\n  <h1>Welcome to CodeEditor</h1>\n  <button onclick="showMessage()">Click me!</button>\n</div>';
    document.getElementById('css-code').value = '.container {\n  text-align: center;\n  padding: 20px;\n}\n\nh1 {\n  color: #61dafb;\n}\n\nbutton {\n  padding: 10px 20px;\n  background-color: #61dafb;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\nbutton:hover {\n  background-color: #4fa8d5;\n}';
    document.getElementById('js-code').value = 'function showMessage() {\n  alert("Hello from JavaScript!");\n}';
    document.getElementById('php-code').value = '<?php\n  echo "Hello from PHP!";\n?>';
    document.getElementById('python-code').value = 'print("Hello from Python!")';

    // Initial output
    updateOutput();
});