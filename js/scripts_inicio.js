let pts = Number(localStorage.getItem("pts")) || 0;

let arrMissoes = [];
const raw = localStorage.getItem("missoes");
if (raw) {
    try {
        arrMissoes = JSON.parse(raw);
        if (!Array.isArray(arrMissoes)) arrMissoes = [];
    } catch(e) {
        console.error("JSON inválido, criando array vazio");
        arrMissoes = [];
        localStorage.setItem("missoes", JSON.stringify(arrMissoes));
    }
}
const missArea = document.getElementById("missoes-area");
const ptsLabel = document.getElementById("pts");
ptsLabel.textContent = `Pontos: ${pts}`;

console.log(arrMissoes);

if (arrMissoes.length <= 0) {
    const NCArea = document.createElement('div')
    const nonContent = document.createElement('h1');
    const botaoCriarNC = document.createElement('a');

    nonContent.classList.add("noncontent");
    botaoCriarNC.classList.add("botão-criar-NC");
    NCArea.classList.add("NCArea");
    
    nonContent.textContent = "Ops! Sem nenhuma missão ativa.";
    botaoCriarNC.textContent = "+ Crie já";
    botaoCriarNC.setAttribute("href", "criar_missão.html");

    const body = document.body;
    body.appendChild(NCArea);
    NCArea.appendChild(nonContent);
    NCArea.appendChild(botaoCriarNC);
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
    missComplete.textContent = "Concluír";
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
        arrMissoes.splice(index, 1);
        localStorage.setItem("missoes", JSON.stringify(arrMissoes));
        missContainer.remove();
    })

    missComplete.addEventListener('click', () => {
        let numpts = Number(mission["premio"])
        pts += numpts;

        ptsLabel.textContent = `Pontos: ${pts}`;
        arrMissoes.splice(index, 1);
        localStorage.setItem("pts", pts);
        localStorage.setItem("missoes", JSON.stringify(arrMissoes));
        missContainer.remove();
    })
}

arrMissoes.forEach((missao, index) => {
    criarQuest(missao, index);
})