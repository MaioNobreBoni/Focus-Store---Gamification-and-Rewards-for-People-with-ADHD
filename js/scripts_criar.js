try {
    const form = document.getElementById("criarForm");
    const criarMissaoFormBtn = document.querySelector(".botaoCF");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const titulo = form.titulo.value;
        const premio = form.premio.value;
        const descricao = form.descricao.value;

        const missao = {titulo, premio, descricao};

        const missoes = JSON.parse(localStorage.getItem("missoes")) || [];

        missoes.push(missao);

        localStorage.setItem("missoes", JSON.stringify(missoes));

        form.reset();
    });
}
catch (error) {
    console.error(error);
}