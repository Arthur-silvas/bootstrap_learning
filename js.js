document.getElementById("formReserva")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const reserva = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        entrada: document.getElementById("entrada").value,
        saida: document.getElementById("saida").value,
        observacoes: document.getElementById("observacoes").value,
        adultos: document.getElementById("adultos").value,
        criancas: document.getElementById("criancas").value
    };

    fetch("http://localhost:3000/cadastros", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reserva)
    })
    .then(response => response.json())
    .then(() => {
        alert("Reserva enviada com sucesso!");
        document.getElementById("formReserva").reset();
    })
    .catch(() => {
        alert("Erro ao enviar reserva.");
    });
});

if (document.getElementById("tabelaReservas")) {
    fetch("http://localhost:3000/cadastros")
        .then(response => response.json())
        .then(dados => {
            const tabela = document.getElementById("tabelaReservas");

            dados.forEach((reserva, index) => {
                const linha = document.createElement("tr");

                linha.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${reserva.nome}</td>
                    <td>${reserva.email}</td>
                    <td>${reserva.entrada}</td>
                    <td>${reserva.saida}</td>
                    <td>${reserva.adultos ?? 0}</td>
                    <td>${reserva.criancas ?? 0}</td>
                `;

                tabela.appendChild(linha);
            });
        });
}

/* validação de entrada */

const hoje = new Date().toISOString().split('T')[0];
document.getElementById('entrada').setAttribute('min', hoje);
document.getElementById('saida').setAttribute('min', hoje )