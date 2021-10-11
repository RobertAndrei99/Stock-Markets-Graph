let apiLink = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=';
let market = 'TSCO' ;
let apiKey = '&apikey=DSHWMDWY55ABHXIL' ;
let canvas = document.getElementById('canvas') ;
canvas.height = 70;
let xLabels = [] ;
let priceLabels = [] ;
let emptyArray = [] ;
let button ;
async function getData() {
 xLabels.length = 0 ;
 priceLabels.length = 0 ;
 let apiUrl = apiLink + market + apiKey ;
 let response = await fetch(apiUrl);
 let data = await response.json() ;
 let date = data['Time Series (Daily)']
 let years ;
 try {
  years = Object.keys(date);
 }
 catch(error) {
   alert("Ops something went wrong please try again with a valid market symbol");
 }
 let j = 0 ;
 for ( i in date ) {
  let price = parseFloat(date[i]['1. open']).toFixed(2) ;
  priceLabels.unshift(price) ;
  xLabels.unshift(years[j]) ;
  ++j ;
 }
}
chart() ;
async function chart() {
   await getData() ;
   let myChart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: xLabels,
        datasets: [{
            label: market + ' STOCK MARKET PRICE' ,
            data: priceLabels ,
            backgroundColor: [
                 '#E9E6DD' ,
            ],
            borderColor:
                '#5C5B59',
            borderWidth: 1
        }]
      },
        options: {
          fill : true
  },
})
button = document.getElementById('submit') ;
button.onclick = async function searchMarket() {
market = document.getElementById('stockName').value ;
await getData() ;
myChart.data.labels = xLabels ;
myChart.data.datasets.data = priceLabels ;
market.toUpperCase()
myChart.data.datasets[0].label = market.toUpperCase() + ' STOCK MARKET PRICE';
myChart.update();
};
};
let symbol = [] ;
let nameOfMarket = [] ;
async function csvData() {
 let response = await fetch('100markets.csv') ;
 let data = await response.text() ;
 let dataToArray = data.split("\n") ;
 dataToArray.forEach(element => {
    let row = element.split(",") ;
    symbol.push(row[0]) ;
    nameOfMarket.push(row[1]) ;
 });

}
async function createTable() {
await csvData() ;
for ( let i = 0 ; i < 100 ; i++) {
$('#marketList').append(`
 <tr>
    <td> ` + nameOfMarket[i] + `</td>
    <td id = "tabelCell">` + symbol[i] + `</td>
  </tr>
  `) ;
}
}
createTable() ;
