document.getElementById('consultar').addEventListener('click', function () {
    var cnpj = document.getElementById('cnpj').value;
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = '<div class="loading"></div>';

    var cnpjNumeros = cnpj.replace(/\D/g, '');

    if (cnpjNumeros.length !== 14) {
        alert('CNPJ inválido. Por favor, insira um CNPJ com 14 dígitos.');
        return;
    }

    fetch('https://api-publica.speedio.com.br/buscarcnpj?cnpj=' + cnpjNumeros)

        .then(response => response.json())
        .then(data => {
            resultado.innerHTML = '';

            if (data.status === "ERROR") {
                resultado.innerHTML = '<div class="alert alert-danger" role="alert">Não foi possível localizar esse CNPJ. Sinto muito 😞</div>';
            } else {
                resultado.innerHTML = `<div class="card mt-3">
                                       <div class="card-body">
                                           <h5 class="card-title">${data["RAZAO SOCIAL"]} (${data.CNPJ})</h5>
                                           <p class="card-text">Nome Fantasia: ${data["NOME FANTASIA"]}</p>
                                           <p class="card-text">Status: ${data.STATUS}</p>
                                           <p class="card-text">CNAE Principal: ${data["CNAE PRINCIPAL DESCRICAO"]} (${data["CNAE PRINCIPAL CODIGO"]})</p>
                                           <p class="card-text">Data de Abertura: ${data["DATA ABERTURA"]}</p>
                                           <p class="card-text">Telefone: (${data.DDD}) ${data.TELEFONE}</p>
                                           <p class="card-text">Email: ${data.EMAIL}</p>
                                           <p class="card-text">Endereço: ${data["TIPO LOGRADOURO"]} ${data.LOGRADOURO}, ${data.NUMERO}, ${data.COMPLEMENTO}, ${data.BAIRRO}, ${data.MUNICIPIO}-${data.UF}, ${data.CEP}</p>
                                       </div>
                                   </div>`;
            }
        });
});
