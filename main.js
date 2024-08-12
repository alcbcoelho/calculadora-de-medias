let averageGrade = parseFloat(
  prompt(
    "Insira a média desejada (se nada for inserido, o valor padrão será 7):"
  )
);
if (!averageGrade) averageGrade = 7;

const registeredActivities = [];

const form = document.querySelector("form");
const inputFields = form.querySelectorAll("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (registeredActivities.includes(inputFields[0].value.toLowerCase())) {
    const alertMessage = `A atividade ${inputFields[0].value.toUpperCase()} já está catalogada.`;

    alert(alertMessage);
  } else {
    registeredActivities.push(inputFields[0].value.toLowerCase());

    createNewTableRow();
    updateTableFooter();

    inputFields.forEach((field) => (field.value = ""));
  }

  function calculateTotalAverage() {
    const trs = Array.from(document.querySelectorAll("tbody tr"));
    const totalAverage =
      trs
        .map((tr) => parseInt(tr.querySelectorAll("td")[1].innerHTML))
        .reduce((acc, curr) => acc + curr) / trs.length;

    return Number.isInteger(totalAverage)
      ? totalAverage
      : totalAverage.toFixed(2);
  }

  function createNewTableRow() {
    const tr = document.createElement("tr");
    const img = document.createElement("img");
    const tds = [];

    document
      .querySelectorAll("table th")
      .forEach((column) => tds.push(document.createElement("td")));

    inputFields.forEach(({ value }, index) => (tds[index].innerHTML = value));
    if (inputFields[1].value >= averageGrade) {
      img.src = "./images/aprovado.png";
      img.alt = "Emoji celebrando";
    } else {
      img.src = "./images/reprovado.png";
      img.alt = "Emoji triste";
    }
    tds[2].append(img);

    tds.forEach((td) => tr.append(td));
    document.querySelector("tbody").append(tr);
  }

  function updateTableFooter() {
    const [, totalAverageTd, approvalStatusTd] =
      document.querySelectorAll("tfoot tr td");

    const span = document.createElement("span");
    span.classList.add("resultado");

    totalAverageTd.innerHTML = calculateTotalAverage();
    if (calculateTotalAverage() >= averageGrade) {
      !span.classList.contains("aprovado") && span.classList.add("aprovado");
      span.classList.contains("reprovado") &&
        span.classList.remove("reprovado");

      span.innerText = "Aprovado";
    } else {
      !span.classList.contains("reprovado") && span.classList.add("reprovado");
      span.classList.contains("aprovado") && span.classList.remove("aprovado");

      span.innerText = "Reprovado";
    }
    approvalStatusTd.innerText = "";
    approvalStatusTd.append(span);
  }
});
