Paquetes usados: 

npm install --save mongoose @nestjs/mongoose
npm install --save-dev @types/mongoose
npm install --save @nestjs/axios
npm install --save axios


Se usó MongoDB con mongoose para maximizar la productividad.
La cadena de conexión es: 'mongodb://localhost:27017/walletMaster?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

Al obtener una billetera de la base de datos, el balance lo obtiene en el momento usando etherScan.
Agrego una llamada para obtener el precio del ETH en USD desde etherScan.


Llamadas disponibles en API:

ruta /wallets
-----------------------------------------------------------------------------------------------------------------------------------------
POST
pametro: 'address': string,
pametro 'description': string
  
Inserta una billetera con valores por defecto además de los proporcionados.
Valida que la dirección sea válida usando etherScan. Obtiene la fecha de su primer consulta y la guarda en el objeto en la base de datos.

-----------------------------------------------------------------------------------------------------------------------------------------
GET
Obtiene una lista con las billeteras guardadas, obteniendo el balance en el momento.

-----------------------------------------------------------------------------------------------------------------------------------------

GET /walletdate 
parametro: 'walletAddress'

Obtiene la fecha de la primer transacción usando etherScan.

-----------------------------------------------------------------------------------------------------------------------------------------

GET /walletbalance
parametro: 'walletAddress'

Obtiene el balance desde etherScan en ETH, en USD y en EURO. Para USD y EURO usa el exchange rate guardado.

-----------------------------------------------------------------------------------------------------------------------------------------
GET /singlewallet
parametro: 'walletAddress'

Devuelve una billetera con su balance obtenido en el momento.

-----------------------------------------------------------------------------------------------------------------------------------------

PATCH /favorite
pametro: 'walletAddress': string,
pametro 'favorite': boolean

Actualiza el estado de favorito para una Billetera. Devuelve el objeto.

-----------------------------------------------------------------------------------------------------------------------------------------

PATCH /usdex
pametro: 'walletAddress': string,
pametro 'usdex': number

Actualiza el exchange en usd para una Billetera. Devuelve el objeto.

-----------------------------------------------------------------------------------------------------------------------------------------
PATCH /eurex
pametro: 'walletAddress': string,
pametro 'eurex': number

Actualiza el exchange en eur para una Billetera. Devuelve el objeto.

-----------------------------------------------------------------------------------------------------------------------------------------

Delete
pametro: 'walletAddress': string,

Borra una Billetera.

-----------------------------------------------------------------------------------------------------------------------------------------

GET /etherscanprice

Obtiene el precio del ETH en USD.

-----------------------------------------------------------------------------------------------------------------------------------------

