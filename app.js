const flows = {
  current: {
    summary: "4 etapas · 2 repasses sem contexto",
    bottleneck: "A solicitação circula entre áreas sem um registro único de evidências e sem atualização clara para quem pediu ajuda.",
    principle: "Manter contexto, responsável e próximo passo visíveis ao longo de todo o fluxo.",
    steps: [
      ["Entrada", "Pedido chega por canais diferentes.", "Pessoa solicitante", false],
      ["Triagem", "Informações incompletas voltam para coleta.", "Atendimento", false],
      ["Análise", "O caso é repassado sem histórico estruturado.", "Especialista", false],
      ["Retorno", "A resolução é comunicada sem registrar aprendizado.", "Atendimento", false]
    ]
  },
  future: {
    summary: "4 etapas · contexto e responsabilidade contínuos",
    bottleneck: "O desenho proposto reduz repasses sem contexto e explicita o que falta para avançar.",
    principle: "Usar um registro único, critérios de prioridade e comunicação de status com linguagem simples.",
    steps: [
      ["Registrar", "Capturar necessidade, impacto e evidências.", "Solicitante + atendimento", true],
      ["Priorizar", "Aplicar critérios transparentes de impacto.", "Atendimento", true],
      ["Investigar", "Registrar hipótese, teste e decisão.", "Responsável técnico", true],
      ["Resolver", "Confirmar resultado e registrar aprendizado.", "Atendimento + solicitante", true]
    ]
  }
};

const flowContainer = document.querySelector("#flow");
const buttons = [...document.querySelectorAll(".version")];

function render(version) {
  const flow = flows[version];
  document.querySelector("#flow-summary").textContent = flow.summary;
  document.querySelector("#bottleneck").textContent = flow.bottleneck;
  document.querySelector("#principle").textContent = flow.principle;
  flowContainer.replaceChildren();
  for (const [index, [title, description, owner, improved]] of flow.steps.entries()) {
    const step = document.createElement("article");
    step.className = `flow-step${improved ? " improved" : ""}`;
    const number = document.createElement("span");
    number.className = "step-index";
    number.textContent = `ETAPA 0${index + 1}`;
    const heading = document.createElement("h2");
    heading.textContent = title;
    const detail = document.createElement("p");
    detail.textContent = description;
    const responsible = document.createElement("span");
    responsible.className = "owner";
    responsible.textContent = owner;
    step.append(number, heading, detail, responsible);
    flowContainer.append(step);
  }
  for (const button of buttons) {
    const active = button.dataset.version === version;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

for (const button of buttons) {
  button.addEventListener("click", () => render(button.dataset.version));
}

render("current");
