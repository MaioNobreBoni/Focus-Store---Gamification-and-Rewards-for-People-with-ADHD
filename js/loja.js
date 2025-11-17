let pts = Number(localStorage.getItem("pts")) || 0;

let arrProdutos = [];
const raw = localStorage.getItem("produtos");
if (raw) {
    try {
        arrProdutos = JSON.parse(raw);
        if (!Array.isArray(arrProdutos)) arrProdutos = [];
    } catch(e) {
        console.error("JSON inválido, criando array vazio");
        arrProdutos = [];
        localStorage.setItem("produtos", JSON.stringify(arrProdutos));
    }
}
const missArea = document.getElementById("produtos-area");
const ptsLabel = document.getElementById("pts");
ptsLabel.textContent = `Pontos: ${pts}`;

console.log(arrProdutos);

if (arrProdutos.length <= 0) {
    const NCAreaP = document.createElement('div')
    const nonContent = document.createElement('h1');
    const botaoCriarNC = document.createElement('a');

    nonContent.classList.add("noncontent");
    botaoCriarNC.classList.add("botão-criar-NC");
    NCAreaP.classList.add("NCAreaP");
    
    nonContent.textContent = "Ops! Sem nenhum produto na loja.";
    botaoCriarNC.textContent = "+ Crie já";
    botaoCriarNC.setAttribute("href", "criar_missão.html");

    const body = document.body;
    body.appendChild(NCAreaP);
    NCAreaP.appendChild(nonContent);
    NCAreaP.appendChild(botaoCriarNC);
}

function criarQuest(mission, index) {
    const missContainer = document.createElement('div');
    const missContent = document.createElement('div');
    const missButtons = document.createElement('div');
    const missExclude = document.createElement('button');
    const missTitle = document.createElement('h1');
    const missPrise = document.createElement('h2');
    const missDesciption = document.createElement('p');
    const missComplete = document.createElement('button');

    missContainer.classList.add('miss-container');
    missContent.classList.add('miss-content');
    missButtons.classList.add('miss-buttons');
    missExclude.classList.add('miss-exclude');
    missTitle.classList.add('miss-title');
    missPrise.classList.add('miss-prise');
    missDesciption.classList.add('miss-description');
    missComplete.classList.add('miss-complete');

    missTitle.textContent = mission["titulo"];
    missPrise.textContent = `${mission["premio"]} pts`;
    missDesciption.textContent = mission["descricao"];
    missComplete.textContent = "Comprar";
    missExclude.textContent = "excluir";

    missContainer.appendChild(missContent);

    missContent.appendChild(missTitle);
    missContent.appendChild(missPrise);
    missContent.appendChild(missDesciption);
    missContent.appendChild(missButtons)
    missButtons.appendChild(missComplete);
    missButtons.appendChild(missExclude);

    missArea.appendChild(missContainer);

    missExclude.addEventListener('click', () => {
        arrProdutos.splice(index, 1);
        localStorage.setItem("produtos", JSON.stringify(arrProdutos));
        missContainer.remove();
    })

    missComplete.addEventListener('click', () => {
        let numpts = Number(mission["premio"])
        if (pts >= numpts) {
            pts -= numpts;

            ptsLabel.textContent = `Pontos: ${pts}`;
            localStorage.setItem("pts", pts);
        }
        else {
            alert("saldo insuficiente!")
        }
    })
}

arrProdutos.forEach((missao, index) => {
    criarQuest(missao, index);
})