// const fetch = require( 'node-fetch' )
const url = "https://gateway.gr1d.io/sandbox/bancocentral/selic/v1"

const rs = () => fetch( url, {
    headers:{

        'accept': 'application/json',
        'X-Api-Key': '561098b3-a4e0-4604-b8b0-3be65e1e733f'
    }
} ).then((res) => res.json()).then( json => json[ json.length-1 ] )

// module.exports = rs()

/**
 * 
 * GET "https://gateway.gr1d.io/sandbox/bancocentral/selic/v1/" 
 * 
 * -H "accept: application/json" 
 * -H "X-Api-Key: 561098b3-a4e0-4604-b8b0-3be65e1e733f"
 * 
 */
