
Frontend for the trading application
====================================


### To run the project you need to do the following:

### `npm install`
Install npm modules.


### `npm start`
Run the application in developer mode.


### `npm run build`
Build the app for production to the `build` map.

## KRAV 2 Frontend

Jag valde att fortsätta jobba med React för att implemntera projektet. Anledningen att jag känner mig ganska bekväm med det och med att jobba med komponenter. Jag har försökt dela upp det mesta av koden i olika mindre komponenter och tycker att jag har lyckats rätt så bra med det. Jag hade inte så många problem med genomförandet av frontenden. Det blev lite strul när jag skulle drifsätta på servern, jag fick 500 bad request hela tiden men tillslut upptäckte jag att jag hade olika ports än den servern lyssnar på i config filen.

Jag har valt att använda bootstrap för att få till en bra layout och hyffsat responsiv applikation. Hela applekationen inklusive trading charts grafen är responsiv och fungerar på olika skärmstorleker. Pris grafen skapade jag med hjälp ApexCharts, de erbjuder väldigt coola och snygga charts som man kan lätt anpassa efter behov och använda. De har också väldigt lätförstålig dokumentation som visar hur man skapar graf charten i react applikationen.För att kunna få graf datan från backend i realtid har jag använt mig av paketet socket.io client.

## Om kursen 

Jag är väldigt nöjd med kursen då allting har varit intressant att lära sig. Jag gillade att man kunde själv välja vilket ramverk man vill jobba med! Jag gillade mitt val av ramverket React eftersom det kändes inte så svårt att komma igång med och för jag fick lära mig mycket nytt. Tycker att kursen var den bästa hittillss. Kursen får 100/10!
