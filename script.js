const SELIC = rs().then(data => data)

const getElementId = ( element ) => window.document.getElementById( element )

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

async function dataPoupanca() {
    const resultado = await calcTxPoupanca()
    return resultado
} 

async function dataSelic() {
    const selic = await calcTxSelic()
    return selic
} 

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

    return [ anos , meses, p.toFixed(2) ]
}

async function calcular(){

    let din =getElementId("dinheiro")

    let mes =getElementId("mes")

    let casa=getElementId("casa")

    let poup=getElementId("poup")

    let sel=getElementId("sel")

    let text=getElementId("text")

    let objetivo=Number(din.value)

    let mensal=Number(mes.value)

    let guardacasa=objetivo/mensal
    
    let contanocasa=parseInt(guardacasa/12)
    let contrestcasa=guardacasa%12

    if( contanocasa < 1 ){
        contanocasa = 0
    }else{
        contanocasa = contanocasa.toFixed()
    }

    console.log( guardacasa , contanocasa)

    const taxas = {
        selic: await dataSelic(),
        poupanca: await dataPoupanca()
    }    

    casa.innerHTML=`Guardando em casa: ${contanocasa} anos e ${contrestcasa} meses rendendo R$${objetivo}`

    const [ resPoupancaAno, resPoupancaMes, valorTotalPoupanca ] = calculoInvestimento( mensal, objetivo, taxas.poupanca.jurosMensal )
    const [ resSelicAno, resSelicMes, valorTotalSelic ] = calculoInvestimento( mensal, objetivo, taxas.selic.jurosMensal )

    poup.innerHTML=`Poupança: ${resPoupancaAno} anos e ${resPoupancaMes} meses e atingira R$${valorTotalPoupanca}`

    sel.innerHTML=`Tesouro SELIC: ${resSelicAno} anos e ${resSelicMes} meses e atingira R$${valorTotalSelic}`
    text.innerHTML=` O rendimento do Tesouro Direto como a SELIC ao mês supera o da poupança na maioria das vezes, por isso, é a hora de inserir títulos públicos em sua carteira de investimentos.`

}
function selic(){
    let sel=window.document.getElementById("restipo")
    sel.innerHTML=`O Tesouro Direto Selic é um título de dívida emitido pelo governo. Isso significa que ao investir nele, você estará emprestando dinheiro ao poder público.Essa é a principal função do Tesouro Direto para o emissor. Para o investidor que busca aplicar com a flexibilidade de poder resgatar o dinheiro quando quiser, sem perda de lucro, o Tesouro Direto tende a ser uma boa opção.`
    
}
function tesouropre(){
    let tpfx=window.document.getElementById("restipo")
    tpfx.innerHTML=`Anteriormente chamado de LTN (Letra do Tesouro Nacional), o Tesouro Prefixado é um título prefixado (como o próprio nome já deixa claro), o que significa que possui rentabilidade definida no momento da compra.

    Esse título possui fluxo de pagamento simples, ou seja, o investidor faz a aplicação e recebe o valor de face (valor investido somado à rentabilidade), na data de vencimento do título.
    
    Por se tratar de título prefixado, o investidor sabe exatamente o retorno do título se carregá-lo até a data de vencimento.
    
    Em outras palavras, se permanecer com o título até o momento do resgate, sem vendê-lo antecipadamente.`

}
function ipca(){
    let ipca=window.document.getElementById("restipo")
    ipca.innerHTML=`O Tesouro IPCA é um título público emitido pelo Governo.

    Seu objetivo é captar dinheiro de investidores para o Governo investir em áreas como infraestrutura, saúde e segurança.
    
    Ao aplicar nesse ativo, você estará emprestando dinheiro ao poder público. Em troca, ele paga uma taxa de juros que é híbrida. Ou seja, é uma combinação da inflação (IPCA) e de uma taxa prefixada.
    
    Esse ativo pode ser utilizado em estratégias de médio e longo prazo.
    
    Normalmente, o Tesouro IPCA é um investimento seguro e conservador. Afinal, ele é perfeito para manter o seu poder de compra no futuro. `

}
