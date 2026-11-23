const fluxos = {
  atual: {
    resumo: "4 etapas · 2 repasses sem contexto",
    gargalo: "A solicitação circula entre áreas sem um registro único de evidências e sem atualização clara para quem pediu ajuda.",
    principio: "Manter contexto, responsável e próximo passo visíveis ao longo de todo o fluxo.",
    etapas: [
      ["Entrada", "Pedido chega por canais diferentes.", "Pessoa solicitante", false],
      ["Triagem", "Informações incompletas voltam para coleta.", "Atendimento", false],
      ["Análise", "O caso é repassado sem histórico estruturado.", "Especialista", false],
      ["Retorno", "A resolução é comunicada sem registrar aprendizado.", "Atendimento", false]
    ]
  },
  proposta: {
    resumo: "4 etapas · contexto e responsabilidade contínuos",
    gargalo: "O desenho proposto reduz repasses sem contexto e explicita o que falta para avançar.",
    principio: "Usar um registro único, critérios de prioridade e comunicação de situação com linguagem simples.",
    etapas: [
      ["Registrar", "Capturar necessidade, impacto e evidências.", "Solicitante + atendimento", true],
      ["Priorizar", "Aplicar critérios transparentes de impacto.", "Atendimento", true],
      ["Investigar", "Registrar hipótese, teste e decisão.", "Responsável técnico", true],
      ["Resolver", "Confirmar resultado e registrar aprendizado.", "Atendimento + solicitante", true]
    ]
  }
};

const containerFluxo = document.querySelector("#fluxo");
const botoes = [...document.querySelectorAll(".versao")];

function desenhar(versao) {
  const fluxo = fluxos[versao];
  document.querySelector("#resumo-fluxo").textContent = fluxo.resumo;
  document.querySelector("#gargalo").textContent = fluxo.gargalo;
  document.querySelector("#principio").textContent = fluxo.principio;
  containerFluxo.replaceChildren();
  for (const [indice, [titulo, descricao, responsavel, melhorado]] of fluxo.etapas.entries()) {
    const etapa = document.createElement("article");
    etapa.className = `etapa-fluxo${melhorado ? " melhorado" : ""}`;
    const numero = document.createElement("span");
    numero.className = "indice-etapa";
    numero.textContent = `ETAPA 0${indice + 1}`;
    const cabecalho = document.createElement("h2");
    cabecalho.textContent = titulo;
    const detalhe = document.createElement("p");
    detalhe.textContent = descricao;
    const responsavelEl = document.createElement("span");
    responsavelEl.className = "responsavel";
    responsavelEl.textContent = responsavel;
    etapa.append(numero, cabecalho, detalhe, responsavelEl);
    containerFluxo.append(etapa);
  }
  for (const botao of botoes) {
    const ativo = botao.dataset.versao === versao;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  }
}

for (const botao of botoes) {
  botao.addEventListener("click", () => desenhar(botao.dataset.versao));
}

desenhar("atual");

