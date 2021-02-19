# Academy Febbraio 2021

Questo progetto è un'applicazione web per il monitoraggio e l'analisi dei dati Covid19. Alimentato da dati di vita
reale.

Attenzione per far partire l'applicazione `npm start`.

## Table of Content

* [Pagine da sviluppare](#pagine-da-sviluppare)
* [Scheletro applicazione](#scheletro-applicazione)
* [Liberie](#liberie)
  + [`primereact`](#-primereact-)
  + [`bootstrap-grid`](#-bootstrap-grid-)
  + [`axios` o `fetch`](#-axios--o--fetch-)
  + [`Chart.js`](#-chartjs-)
* [Api](#api)
  + [1. GET /cases](#1-get--cases)
  + [2. GET /case-summary](#2-get--case-summary)
  + [3. GET /countries](#3-get--countries)
  + [4. POST /case](#4-post--case)
  + [5. DELETE /case](#5-delete--case)
  + [6. PUT /case](#6-put--case)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with
markdown-toc</a></i></small>

## Pagine da sviluppare

**Dashboard** (obbligatoria):

- Ricerca per range di date(from e to) e country;
- Visulizzazione di dati in una tabella;
- Visualizzazione di dati in grafici

Backoffice (facoltativa):

- Lista dei casi;
- Possibilità di aggiungere un caso;
- Possibilità di eliminare un caso.

## Scheletro applicazione

my-app

├── node_modules/

├── public/

│ ├── favicon.ico

│ ├── index.html

│ ├── robots.txt

│ └── manifest.json

├── src/

│ ├── abilities/

│ ├── assets/

│ ├── components/

│ ├── containers/

│ ├── css/

│ ├── router/

│ ├── store/

│ ├── translations/

│ ├── utils/

│ ├── App.js

│ ├── index.js

│ └── serviceWorker.js

├── Dockerfile

├── .gitignore

├── .env

├── cloudbuild.yaml

├── package.json

└── package-lock.json

Cartelle esterne:

**node_modules** - è la cartella dove risiedono i pacchetti installati da NPM o Yarn.

**public** - è la cartella dove risiedono i file statici che servono all’applicazione (i file che sono presenti in
public vengono utilizzati solamente da questa cartella), come:

**index.html**, React si appoggia per creare le pagine;

**src** - è la cartella dove risiedono i file dinamici. Tutti questi file vengono elaborati da Webpack.

Cartelle interne ad src:

**assets** - tutte le risorse che possono servire nell’applicazione, come ad esempio file JSON (per variabili comuni o
costruzione di form statici), immagini, etc…

**components** - sono i componenti di presentazione, sono responsabili della renderizzazione della pagina in base alle
“props” ricevute dal container.

**containers** - i container sono sempre dei componenti, ma sono a conoscenza dello “state” dell’applicazione ed è
connesso ad uno o più store di redux. I containers ricevono gli aggiornamenti dello stato di Redux e le azioni di invio,
solitamente non eseguono il rendering degli elementi DOM.

router - file che servono per creare la navigazione all’interno dell’applicazione.

store - se presente, contiene i file per la configurazione e creazione di action e reducer che servono per Redux.

File:

**package.json** - elenca i pacchetti da cui dipende il progetto, specifica le versioni di un pacchetto che il progetto
può utilizzare utilizzando regole di controllo delle versioni semantiche, rende la build riproducibile e quindi più
facile da condividere con altri sviluppatori.

**package-lock.json** - si genera automaticamente per qualsiasi operazione in cui npm modifica i node_modules o
package.json. Descrive l'albero che è stato generato, in modo tale che le installazioni successive siano in grado di
generare alberi identici, indipendentemente da aggiornamenti intermedi delle dipendenze.

**.gitignore** - in questo file sono presenti tutte i percorsi di cartelle e file che Git dovrebbe ignorare, perché non
interessanti oppure perché potrebbe creare conflitti tra i differenti ambienti (dev/qas/prod). Approfondimento nella
sezione .gitignore.

## Liberie

Le librerie che serviranno sono già tutte inserite nel file package.json.

### `primereact`

Framework di sviluppo. Ha moltissimi componenti già pronti che potranno aiutarvi nello sviluppo dell'applicazione.

Visualizzate il sito dei componenti di [primereact](https://www.primefaces.org/primereact/showcase/#/) per aiutarvi
nello sviluppo.

### `bootstrap-grid`

Questa è la griglia migliore per rendere responsive le vostre applicazioni.

Visualizzate il sito [https://getbootstrap.com/docs/4.0/layout/grid/](https://getbootstrap.com/docs/4.0/layout/grid/)
per capire come si utilizza la griglia.

### `axios` o `fetch`

Avete la possibilità di utilizzare sia axios che fetch. Axios è già installata, mentre fetch è disponibile di default.

Se utilizzate [axios](https://www.npmjs.com/package/axios) guardate questa libreria.

### `Chart.js`

Per poter utilizzare i componenti Chart di primereact é necessario installare questa
libreria: [chart.js](https://www.chartjs.org/).

Noi siamo sempre a disposizione per chiarimenti.

## Api

### 1. GET /cases

- **request**:
  - *queryStringParams*: ?from=01/01/2021&to=15/02/2021
- **response**:
  - *Status*: 200
  - *body*:
      ```json
      [
        {
            "id": 1,
            "dateRep": "2021-01-03T23:00:00.000Z",
            "dateRepString": "2021-01-03",
            "yearWeek": "2020-53",
            "casesWeekly": 111,
            "deathsWeekly": 222,
            "country": "Italy",
            "countryCode": "ITA",
            "continent": "EUR",
            "average": 2.22
        }
      ]
      ```
  - *Note*:
    1. Il body della response viene restituita ordinato per dateRep asc (dal pú vecchio al piú recente);

### 2. GET /case-summary

- **request**: null
- **response**:
  - *Status*: 200
  - *body*:
      ```json
      [
        {
          "country": "Italy",
          "countryCode": "ITA",
          "continent": "EUR",
          "totalCase": 23000,
          "totalDeaths": 23000
        }
      ]
      ```
  - *Note*:
    1. Il body della response contiene le informazioni raggruppate per country (sommatoria dei casi/morti per ciascuna
       nazione);

### 3. GET /countries

- **request**: null
- **response**:
  - *Status*: 200
  - *body*:
      ```json
      [
        {
          "country": "Italy", 
          "code": "ITA", 
          "continent": "EUR"
        }
      ]
      ```

### 4. POST /case

- **request**:
  - *body*:
    ```json
    { 
        "weeklyCases": 222, 
        "weeklyDeaths": 111, 
        "country": "Italy", 
        "countryCode": "ITA", 
        "continent": "EUR",
        "notificationRate": 3.24 
    }
    ```
- **response**:
  - *Status*: 201
  - *body*: null

### 5. DELETE /case

- **request**:
  - *pathParams*: /{caseId}
- **response**:
  - *Status*: 201
  - *body*: null

### 6. PUT /case

- **request**:
  - *body*:
    ```json
    {
        "id": 1, 
        "weeklyCases": 222, 
        "weeklyDeaths": 111, 
        "country": "Italy", 
        "countryCode": "ITA", 
        "continent": "EUR",
        "notificationRate": 3.24 
    }
    ```
- **response**:
  - *Status*: 201
  - *body*: null

[**Torna su**](#academy-febbraio-2021)