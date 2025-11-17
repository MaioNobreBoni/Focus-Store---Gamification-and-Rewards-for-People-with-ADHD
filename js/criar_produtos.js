try {
    const form = document.getElementById("criarForm");
    const criarMissaoFormBtn = document.querySelector(".botaoCF");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const titulo = form.titulo.value;
        const premio = form.premio.value;
        const descricao = form.descricao.value;

        const produto = {titulo, premio, descricao};

        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

        produtos.push(produto);

        localStorage.setItem("produtos", JSON.stringify(produtos));

        form.reset();
    });
}
catch (error) {
    console.error(error);
}