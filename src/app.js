const pages = require('./pages/index');
const share = require('./share/index');
const Button = require('./share/components/button/index')

// Inicializa a aplicação
(function() {
    document.appendChild(Button); // Errado
})();
