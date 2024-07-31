// Manipulando a DOM do HTML
const balanco = document.getElementById('balanco')
const dinheiro_mais = document.getElementById('dinheiro-mais')
const dinheiro_menos = document.getElementById('dinheiro-menos')
const lista = document.getElementById('lista')
const formulario = document.getElementById('formulario')
const texto = document.getElementById('texto')
const quantidade = document.getElementById('quantidade')

// console.log(balanco)
// console.log(dinheiro_mais)
// console.log(dinheiro_menos)
// console.log(lista)
// console.log(formulario)
// console.log(texto)
// console.log(quantidade)

/*
// const substituida por let
let transacoes = [
	{ id: 1, texto: 'Manutenção', quantidade: -250 },
	{ id: 2, texto: 'Salario', quantidade: 1414 },
	{ id: 3, texto: 'Mercado', quantidade: 310 },
	{ id: 4, texto: 'Hora Extra', quantidade: 4100 },
	{ id: 5, texto: 'Conta de Luz', quantidade: -80 }
]
	*/

// Armazenamento local (browser)
const transacoesArmazemLocal = JSON.parse(localStorage.getItem('transacoes'))
let transacoes = localStorage.getItem('transacoes') !== null ? transacoesArmazemLocal : []

function atualizarArmazemLocal() {
	localStorage.setItem('transacoes', JSON.stringify(transacoes))
}

// Inicializar a função
function inicializar() {
	lista.innerHTML = ''
	transacoes.forEach(adicionarTransacaoDOM)
	atualizarValores()
}

inicializar()

// Adicionar a transação ao DOM
function adicionarTransacaoDOM(transacao) {
	// console.log(transacao) // Debug do transacoes.forEach(adicionarTransacaoDOM)
	const sinal = transacao.quantidade < 0 ? '-' : '+'
	const item = document.createElement('li')

	item.classList.add(transacao.quantidade < 0 ? 'menos' : 'mais')
	item.innerHTML = `${transacao.texto}<span>${sinal}${Math.abs(transacao.quantidade)}</span> <button class="botao-apagar" onclick="removerTransacao(${transacao.id})">x</button>`

	lista.appendChild(item)
}

// Remover transação
function removerTransacao(id) {
	transacoes = transacoes.filter((transacao) => transacao.id !== id)

	atualizarArmazemLocal()
	inicializar()
}

// Adicionar transação 
formulario.addEventListener("submit", adicionarTransacao)

function adicionarTransacao(e) {
	// console.log("Adicionar transação chamado!!") // para debugar
	e.preventDefault()
	if (texto.value.trim() === '' || quantidade.value.trim() === '' || isNaN(quantidade.value.trim())) {
		alert('Por favor insira um texto e uma quantidade valida!')
	} else {
		const transacao = {
			id: gerarID(),
			texto: texto.value,
			quantidade: +quantidade.value
		}
		transacoes.push(transacao)
		adicionarTransacaoDOM(transacao)

		atualizarValores()
		atualizarArmazemLocal()

		texto.value = ''
		quantidade.value = ''
	}
}

function gerarID() {
	return Math.floor(Math.random() * 100000000)
}

// Atualizar valores
function atualizarValores() {
	const quantidades = transacoes.map((transacao) => transacao.quantidade)
	const total = quantidades.reduce((soma, item) => (soma += item), 0).toFixed(2)
	const ganhos = quantidades.filter((item) => item > 0).reduce((soma, item) => (soma += item), 0).toFixed(2)
	const despesas = (quantidades.filter((item) => item < 0).reduce((soma, item) => (soma += item), 0) * -1).toFixed(2)
	balanco.innerText = `${total}`
	dinheiro_mais.innerText = `${ganhos}`
	dinheiro_menos.innerText = `${despesas}`
}

