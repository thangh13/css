function timestamp(i) {

// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
let date = new Date((i-200000000+2000000)) ;
// Hours part from the timestamp
  let hours = date.getHours();
// Minutes part from the timestamp
let minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
let seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
   const n = formattedTime;
   return (n);
};
getData();
const fs = require('fs');
const { CanvasRenderService } = require('chartjs-node-canvas');
const width = 1500; //px
const height = 1500; //px
const canvasRenderService = new CanvasRenderService(width, height);

   async function getData() {
                      let response = await fetch('https://mkw-socket.vndirect.com.vn/mkwsocket/liquidity?index=PRE-VNINDEX');
      const data = await response.json();
      console.log(data);
      length = data.data.length;
      console.log(length);
      labels = [];
      values = [];

      for (i = 0; i < length; i++) {
         labels.push(data.data[i].time);

         values.push((data.data[i].value));
      };
      for (i = 0; i < length; i++) {
         labels[i] = timestamp(labels[i]);
      };
            let responsepre = await fetch('https://mkw-socket.vndirect.com.vn/mkwsocket/liquidity?index=VNINDEX');
      const datapre = await responsepre.json();
      console.log(datapre);
      length = datapre.data.length;
      console.log(length);
      labelspre = [];
      valuespre = [];

      for (i = 0; i < length; i++) {
         labelspre.push(datapre.data[i].time);
         valuespre.push(datapre.data[i].value);
      };
      for (i = 0; i < length; i++) {
         labelspre[i] = timestamp(labelspre[i]);
      };
         setInterval(response, 200);
   setInterval(datapre, 200);
      let  chrt = document.getElementById("bar-chart");
      new Chart(chrt, {
         type: 'line',
         data: {
            labels: labels,
            datasets: [
               {
                  label: "Phiên trước"
                  ,
                  backgroundColor: 'rgba(0, 128, 128, 0.3)',
                  data: (values)
               }, {
               label: "Phiên hôm nay",
                  backgroundColor:'rgba(88, 10, 18, 0.3)',
                   filter: "blur(10px)",
                  data: (valuespre)
               }
            ],
         },
         fill : true,
         borderColor: 'red',
         pointDot: false,
       options: {
              plugins: {
                 // Change options for ALL axes of THIS CHART
                 streaming: {
                    duration: 20000
                 }
              },
           scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Thời gian giao dịch',
                                fontColor:'yellow',
                                fontSize:10
                            },
                            ticks: {
                               fontColor: "white",
                               fontSize: 14
                              }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'GTGD (Tỷ đồng)',
                                fontColor: 'yellow',
                                fontSize:10
                            },
                            ticks: {
                                  fontColor: "white",
                                  fontSize: 14
                            }
                        }]
                 },
                 legend: { display: false},
         title: {

            display: true,
            text: 'Thanh khoản thị trường,
            fontColor: 'white',


         },

         }
   });
      chrt.update();
                chart.update();
response.update();
responsepre.update();
setInterval(getData, 10000);
};
   setInterval(getData, 10000);
