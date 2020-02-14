
function selic(){
    let sel=window.document.getElementById("res")
    sel.innerHTML=`O Tesouro Direto Selic é um título de dívida emitido pelo governo. Isso significa que ao investir nele, você estará emprestando dinheiro ao poder público.Essa é a principal função do Tesouro Direto para o emissor. Para o investidor que busca aplicar com a flexibilidade de poder resgatar o dinheiro quando quiser, sem perda de lucro, o Tesouro Direto tende a ser uma boa opção.`
    
}
function tesouropre(){
    let tpfx=window.document.getElementById("res")
    tpfx.innerHTML=`Anteriormente chamado de LTN (Letra do Tesouro Nacional), o Tesouro Prefixado é um título prefixado (como o próprio nome já deixa claro), o que significa que possui rentabilidade definida no momento da compra.

    Esse título possui fluxo de pagamento simples, ou seja, o investidor faz a aplicação e recebe o valor de face (valor investido somado à rentabilidade), na data de vencimento do título.
    
    Por se tratar de título prefixado, o investidor sabe exatamente o retorno do título se carregá-lo até a data de vencimento.
    
    Em outras palavras, se permanecer com o título até o momento do resgate, sem vendê-lo antecipadamente.`

}
function ipca(){
    let ipca=window.document.getElementById("res")
    ipca.innerHTML=`O Tesouro IPCA é um título público emitido pelo Governo.

    Seu objetivo é captar dinheiro de investidores para o Governo investir em áreas como infraestrutura, saúde e segurança.
    
    Ao aplicar nesse ativo, você estará emprestando dinheiro ao poder público. Em troca, ele paga uma taxa de juros que é híbrida. Ou seja, é uma combinação da inflação (IPCA) e de uma taxa prefixada.
    
    Esse ativo pode ser utilizado em estratégias de médio e longo prazo.
    
    Normalmente, o Tesouro IPCA é um investimento seguro e conservador. Afinal, ele é perfeito para manter o seu poder de compra no futuro. `

}
function calcular(){
    let din =window.document.getElementById("dinheiro")

    let mes =window.document.getElementById("mes")

    let casa=window.document.getElementById("casa")

    let poup=window.document.getElementById("poup")

    let sel=window.document.getElementById("sel")

    let objetivo=Number(din.value)

    let mensal=Number(mes.value)

    let guardacasa=objetivo/mensal
    


    casa.innerHTML=`Guardando em casa: ${guardacasa} meses rendendo R$${objetivo}`

    //inicio calculo poupança
    
    let contp=0
    
    for (var p=mensal;p<objetivo;p+=mensal){
        let pouptaxa=p/100*0.24
        contp ++
        p+=pouptaxa
    }
    poup.innerHTML=`Poupança: ${contp} meses e atingira R$${p.toFixed(2)}`
    //fim poupança

    //inicio calculo selic
   
    let conts=0
    for (var s=mensal;s<objetivo;s+=mensal){
        let selictaxa=s/100*0.45
        conts++
        s+=selictaxa
    }
    sel.innerHTML=`Tesouro SELIC: ${conts} meses e atingira R$${s.toFixed(2)}`

}