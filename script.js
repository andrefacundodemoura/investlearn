const SELIC = rs().then(data => data)

// Função para simplificar o getElementById
const getElementId = ( element ) => window.document.getElementById( element )

// Implementação do slide para escolher o valor do objetivo
const slideObjetivo = getElementId( 'slideObjetivo' )
const textoValorObjetivo = getElementId( 'valorInicialObjetivo' )

let valueObjetivo = 1000;

slideObjetivo.addEventListener( 'input', ( ) => {
    textoValorObjetivo.innerHTML = slideObjetivo.value
    valueObjetivo = Number(slideObjetivo.value)
} )

// Implementação do slide para escolher o valor do objetivo
const slideMes = getElementId( 'mes' )
const valorPorMes = getElementId( 'valorPorMes' )

let valueMes = 100;

slideMes.addEventListener( 'input', ( ) => {
    valorPorMes.innerHTML = slideMes.value
    valueMes = Number(slideMes.value)
} )

// Code transforma taxa Selic em Poupança
async function calcTxPoupanca() {
    const taxaSelic = await SELIC
    const jurosAnul = (taxaSelic.valor/100*70).toFixed(3)
    const jurosMensal = ((Math.pow( 1+(jurosAnul/100), 1/12 ) -1)*100).toFixed(3)
    return {
        titulo: 'Poupança',
        data: taxaSelic.data,
        jurosAnul,
        jurosMensal
    }
} 

// Taxa Selic
async function calcTxSelic() {
    const taxaSelic = await SELIC
    const jurosAnul = taxaSelic.valor
    const jurosMensal = ((Math.pow( 1+(jurosAnul/100), 1/12 ) -1)*100).toFixed(3)
    return {
        titulo: 'Selic',
        data: taxaSelic.data,
        jurosAnul,
        jurosMensal
    }
} 

// Função para pegar Objeto com dados da Poupança
async function dataPoupanca() {
    const resultado = await calcTxPoupanca()
    return resultado
} 

// Função para pegar Objeto com dados da Selic
async function dataSelic() {
    const selic = await calcTxSelic()
    return selic
}

// Função para fazer o calculo dos investimentos
/**
 * Aqui eu peguei a sua logica de calculo do rendimento e transformei em uma
 * função, para poder usar em varios locais do code sem ter que ficar fazendo
 * sempre o mesmo code. 
 * 
 * Ela recebe o Valor mensal, valor do objetivo e a taxa ( como o calculo é igual
 * e só muda a taxa fica mais facil de fazer correções )
 * 
 * Como já estava em função eu só alterei aqui o problema de arredondamento e tanto as
 * Poupança quanto a Selic já ficaram certas.
 */
const calculoInvestimento = ( valorMensal, valorObjetivo, taxa ) => {
    let contp=1
    let anos;
    let meses;
    
    for (var p=valorMensal;p<valorObjetivo;p+=valorMensal){
        let pouptaxa=p/100*taxa
        contp ++
        p+=pouptaxa
    }

    anos = parseInt(contp/12)
    meses = (contp%12).toFixed()

    return [ anos , meses, p.toFixed(2) ]  // O retorno da função é um array, em vez de colocar as variaveis direto no resultado
                                           // pegamos desse array, assim evita de ter o risco de fazer modificações em variaveis que não eram para ser modificadas
}

// Função para tornar mais dinamica a resposta, tirando textos que não fariao sentido
// ex: 0 Anos
const textoResultadoDaSimulacao = ( opcao, anos, meses, valorTotal ) =>{
    let texto = `${ opcao }: `
    const textoAnos = `${ anos } anos`
    const textoMeses= `${ meses } meses`

    if( anos > 0 && meses > 0 ){
        texto += `${ textoAnos } e ${ textoMeses }`
    }else if( anos > 0 ){
        texto += textoAnos
    }else if( meses > 0 ){
        texto += textoMeses
    }

    texto += ` rendendo R$ ${ valorTotal }.`

    return texto
}

async function calcular(){

    const din =getElementId("dinheiro")

    const mes =getElementId("mes")

    const casa=getElementId("casa")

    const poup=getElementId("poup")

    const sel=getElementId("sel")

    const text=getElementId("text")

    const objetivo=  valueObjetivo // Number(din.value)

    const mensal=Number(mes.value)

    const guardacasa=objetivo/mensal
    
    const contanocasa=parseInt(guardacasa/12)
    const contrestcasa=(guardacasa%12).toFixed()

    console.log( typeof valueObjetivo, valueObjetivo )

    // Aqui estou chamando as funções para pegar as taxas
    // Criei um objeto para ficar mais declarativa e poder adcionar mais opções se for preciso
    const taxas = {
        selic: await dataSelic(),
        poupanca: await dataPoupanca()
    }   

    casa.innerHTML= textoResultadoDaSimulacao( 'Guardando em casa', contanocasa, contrestcasa, objetivo )

    // Aqui estou fazendo uma desestruturação - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao
    // Assim vc pode criar varias variaveis baseadas em um array
    // A função calculoInvestimento retorna um array com os 3 valores.
    const [ resPoupancaAno, resPoupancaMes, valorTotalPoupanca ] = calculoInvestimento( mensal, objetivo, taxas.poupanca.jurosMensal )
    
    const [ resSelicAno, resSelicMes, valorTotalSelic ] = calculoInvestimento( mensal, objetivo, taxas.selic.jurosMensal )

    poup.innerHTML = textoResultadoDaSimulacao( 'Poupança', resPoupancaAno, resPoupancaMes, valorTotalPoupanca )
    sel.innerHTML = textoResultadoDaSimulacao( 'Tesouro SELIC', resSelicAno, resSelicMes, valorTotalSelic )

    text.innerHTML=` O rendimento do Tesouro Direto como a SELIC ao mês supera o da poupança na maioria das vezes, por isso, é a hora de inserir títulos públicos em sua carteira de investimentos.`

}
function selic(){
    const sel = getElementId("restipo")
    sel.innerHTML=`O Tesouro Direto Selic é um título de dívida emitido pelo governo. Isso significa que ao investir nele, você estará emprestando dinheiro ao poder público.Essa é a principal função do Tesouro Direto para o emissor. Para o investidor que busca aplicar com a flexibilidade de poder resgatar o dinheiro quando quiser, sem perda de lucro, o Tesouro Direto tende a ser uma boa opção.`
    
}
function tesouropre(){
    const tpfx = getElementId("restipo")
    tpfx.innerHTML=`Anteriormente chamado de LTN (Letra do Tesouro Nacional), o Tesouro Prefixado é um título prefixado (como o próprio nome já deixa claro), o que significa que possui rentabilidade definida no momento da compra.

    Esse título possui fluxo de pagamento simples, ou seja, o investidor faz a aplicação e recebe o valor de face (valor investido somado à rentabilidade), na data de vencimento do título.
    
    Por se tratar de título prefixado, o investidor sabe exatamente o retorno do título se carregá-lo até a data de vencimento.
    
    Em outras palavras, se permanecer com o título até o momento do resgate, sem vendê-lo antecipadamente.`

}
function ipca(){
    const ipca = getElementId("restipo")
    ipca.innerHTML=`O Tesouro IPCA é um título público emitido pelo Governo.

    Seu objetivo é captar dinheiro de investidores para o Governo investir em áreas como infraestrutura, saúde e segurança.
    
    Ao aplicar nesse ativo, você estará emprestando dinheiro ao poder público. Em troca, ele paga uma taxa de juros que é híbrida. Ou seja, é uma combinação da inflação (IPCA) e de uma taxa prefixada.
    
    Esse ativo pode ser utilizado em estratégias de médio e longo prazo.
    
    Normalmente, o Tesouro IPCA é um investimento seguro e conservador. Afinal, ele é perfeito para manter o seu poder de compra no futuro. `

}
