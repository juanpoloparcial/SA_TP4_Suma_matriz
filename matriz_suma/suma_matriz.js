document.getElementById("dimensionForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
  
    const container = document.getElementById("matrices");
    container.innerHTML = ""; // limpiar
  
    ["Matriz 1", "Matriz 2"].forEach((title, idx) => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${title}</h3>`;
      const table = document.createElement("table");
      for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
          const td = document.createElement("td");
          td.innerHTML = `<input type="number" required name="m${idx + 1}-${i}-${j}">`;
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      div.appendChild(table);
      container.appendChild(div);
    });
  
    document.getElementById("sumarBtn").style.display = "block";
  });
  
  document.getElementById("sumarBtn").addEventListener("click", async () => {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const matriz1 = [], matriz2 = [];
  
    for (let i = 0; i < rows; i++) {
      matriz1[i] = [];
      matriz2[i] = [];
      for (let j = 0; j < cols; j++) {
        const v1 = document.querySelector(`[name="m1-${i}-${j}"]`).value;
        const v2 = document.querySelector(`[name="m2-${i}-${j}"]`).value;
  
        if (v1 === "" || v2 === "" || isNaN(v1) || isNaN(v2)) {
          alert("Todos los campos deben tener valores numéricos.");
          return;
        }
  
        matriz1[i][j] = Number(v1);
        matriz2[i][j] = Number(v2);
      }
    }
  
    // Enviar al servidor
    const res = await fetch("/sumar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matriz1, matriz2 })
    });
  
    const data = await res.json();
    mostrarResultado(data.resultado);
  });
  
  function mostrarResultado(matriz) {
    const div = document.getElementById("resultado");
    div.innerHTML = "";
  
    const table = document.createElement("table");
    matriz.forEach(fila => {
      const tr = document.createElement("tr");
      fila.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  
    div.appendChild(table);
  }
  