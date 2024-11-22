const routes = {
    404: "/SPA/404.html",  // Caminho da página de erro 404
    "/SPA/": "SPA/index.html", // Caminho da página inicial
    "/SPA/about": "SPA/about.html", // Caminho da página "about"
    "/SPA/contato": "SPA/contato.html" // Caminho da página "contato"
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();

    // Atualiza a URL sem recarregar a página
    window.history.pushState({}, "", event.target.href);

    // Carrega o conteúdo com base na nova URL
    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;  // Obtém o caminho atual da URL
    const route = routes[path] || routes[404];  // Seleciona a rota correta ou a rota 404

    // Tenta buscar o conteúdo da rota
    const response = await fetch(route);
    
    // Se a resposta não for bem-sucedida (status não for 200), carrega a página 404
    if (response.status === 200) {
        const html = await response.text();
        document.getElementById("main").innerHTML = html;
    } else {
        // Carrega a página de erro 404
        const response404 = await fetch(routes[404]);
        const html404 = await response404.text();
        document.getElementById("main").innerHTML = html404;
    }
};

// Ouve eventos de voltar/avançar no navegador
window.onpopstate = handleLocation;

// Define a função `route` globalmente
window.route = route;

// Carrega o conteúdo ao iniciar a página
handleLocation();
