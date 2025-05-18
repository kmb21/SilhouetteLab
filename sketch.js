let cap;
let bg;
let behindcan;
let D = 127;
let av;
let avg;
let w_av;
let alpha = 0.01;
let t = 1;
let t2 = 2;
let runVar;
let D2 = 1;
let g1=g2=g3=g4 = true;



// function mouseDragged(){
//   D = cap.get(mouseX, mouseY)
// }


function setup() {
  createCanvas(1200,1200);
  cap = createCapture(VIDEO);

  
  fg = cap.get();

  cap.size(400, 300);
  avg = new Array(cap.width* cap.height*4).fill(0);
  avg2 = new Array(cap.width* cap.height*4).fill(0);
  gaus = new Array(cap.width* cap.height*4).fill(0);
  runVar = new Array(cap.width * cap.height*4).fill(0);
  cap.hide();

}


function draw() {
  background(220);
  // image(cap,0,0);

  if (key == 'b'){
    behindcan = cap.get();
   
    baseline(cap);
    image(behindcan,0,300,400, 300);
    g1 = false;
  } else if ( key == 'c'){
    bg = cap.get();
  } else if (key == 'a'){
    av = cap.get();
    g2 = false;
    average(av,cap);
    image(av,400,0, 400, 300);
  }
  else if (key == 'w'){
    w_av = cap.get();
    movingAverage(cap); 
    image(w_av, 800,0, 400,300);
    g3 = false;
  } 
  else if (key == 'g'){
    g_av = cap.get();
    gaussian(cap);
    image(g_av, 400,300,400,300);
    g4 = false;
  }
  placeholder();
  
  if (!g1){
    behindcan = cap.get();
    baseline(cap);
    image(behindcan, 0, 300, 400, 300);
  }
  if (!g2){
    av = cap.get();
    average(av,cap);
    image(av, 400, 0, 400, 300);
  }
  if (!g3){
    w_av = cap.get();
    movingAverage(cap); 
    image(w_av, 800,0, 400,300);}
  if (!g4){
    g_av = cap.get();
    gaussian(cap);
    image(g_av, 400,300,400,300);}
  image(cap,0,0);
  fill('orange');
  textSize(25);
  text("BASELINE", 0, 320);
  text("AVERAGE", 440, 40);
  text("MOVING AVERAGE", 840,40);
  text("GAUSSIAN", 420, 320);
}



function placeholder(){
  let temp = cap.get();
  temp.loadPixels();
  for (let i = 0; i < temp.pixels.length; i += 4) {
    temp.pixels[i] = 0; 
    temp.pixels[i + 1] = 0; 
    temp.pixels[i + 2] = 0;
  }
  temp.updatePixels();
  if (g1){image(temp, 0, 300, 400, 300);}
  
  if (g2){image(temp, 400, 0, 400, 300);}
  
  if (g3){image(temp, 800,0, 400,300);}
  
  if (g4){image(temp, 400,300,400,300);}
  
}
function baseline(cap){

  bg.loadPixels()
  cap.loadPixels()
  behindcan.loadPixels()

  for(let x= 0; x < cap.width; x++){
    for(let y = 0; y < cap.height; y++){
      let index = (x + y* cap.width) *4

      let red1 = bg.pixels[index]
      let green1 = bg.pixels[index+1]
      let blue1 = bg.pixels[index+2]

      let red2 = cap.pixels[index]
      let green2 = cap.pixels[index+1]
      let blue2 = cap.pixels[index+2]

      let dif = Math.sqrt(Math.pow(red1 - red2,2)+ Math.pow(green1 - green2,2)+ Math.pow(blue1-blue2,2))

      if (dif > D){
        behindcan.pixels[index] = red2;
        behindcan.pixels[index+1] = green2;
        behindcan.pixels[index+2] = blue2;
      }else{
        behindcan.pixels[index] = 0;
        behindcan.pixels[index+1] = 0;
        behindcan.pixels[index+2] = 0;
      }
    }
  }
  behindcan.updatePixels(); 
}

function average(av,cap){

  av.loadPixels();
  cap.loadPixels();



  for(let x= 0; x < cap.width; x++){
    for(let y = 0; y < cap.height; y++){
      let index = (x + y* cap.width) *4

      let red2 = cap.pixels[index]
      let green2 = cap.pixels[index+1]
      let blue2 = cap.pixels[index+2]

      avg[index] += (red2 - avg[index]) / t
      avg[index+1] += (green2 - avg[index+1]) / t
      avg[index+2] += (blue2 - avg[index+2]) / t

      let dif = Math.sqrt(Math.pow(avg[index] - red2,2)+ Math.pow(avg[index+1] - green2,2)+ Math.pow(avg[index+2]-blue2,2)) 
      

      
      if (dif > D){
        av.pixels[index] = red2;
        av.pixels[index+1] = green2;
        av.pixels[index+2] = blue2;
      }else{
        av.pixels[index] = 0;
        av.pixels[index+1] = 0;
        av.pixels[index+2] = 0;
      }
    }
  }
  t+=1
  av.updatePixels()


}

function movingAverage(cap){
  w_av.loadPixels();
  cap.loadPixels();


  for(let x= 0; x < cap.width; x++){
    for(let y = 0; y < cap.height; y++){
      let index = (x + y* cap.width) *4

      let red2 = cap.pixels[index]
      let green2 = cap.pixels[index+1]
      let blue2 = cap.pixels[index+2]

      avg2[index] += (red2 - avg2[index]) * alpha
      avg2[index+1] += (green2 - avg2[index+1]) * alpha
      avg2[index+2] += (blue2 - avg2[index+2]) * alpha

      let dif = Math.sqrt(Math.pow(avg2[index] - red2,2)+ Math.pow(avg2[index+1] - green2,2)+ Math.pow(avg2[index+2]-blue2,2)) 


      if (dif > D){
        w_av.pixels[index] = red2;
        w_av.pixels[index+1] = green2;
        w_av.pixels[index+2] = blue2;
      }else{
        w_av.pixels[index] = 0;
        w_av.pixels[index+1] = 0;
        w_av.pixels[index+2] = 0;
      }
    }
  }
  w_av.updatePixels()

}

function gaussian(cap) {
  g_av.loadPixels();
  cap.loadPixels();

  for (let x = 0; x < cap.width; x++) {
    for (let y = 0; y < cap.height; y++) {
      let index = (x + y * cap.width) * 4;

      let red2 = cap.pixels[index];
      let green2 = cap.pixels[index + 1];
      let blue2 = cap.pixels[index + 2];

      let temp1 = gaus[index];
      let temp2 = gaus[index + 1];
      let temp3 = gaus[index + 2];

      gaus[index] += (red2 - gaus[index]) / t2;
      gaus[index + 1] += (green2 - gaus[index + 1]) / t2;
      gaus[index + 2] += (blue2 - gaus[index + 2]) / t2;

      runVar[index] += (red2 - temp1) * (red2 - gaus[index]);
      runVar[index + 1] += (green2 - temp2) * (green2 - gaus[index + 1]);
      runVar[index + 2] += (blue2 - temp3) * (blue2 - gaus[index + 2]);

      let dif = Math.sqrt(Math.pow((red2 - gaus[index]) / Math.sqrt(runVar[index] / (t2-1)), 2) +
                Math.pow((green2 - gaus[index + 1]) / Math.sqrt(runVar[index + 1] /(t2-1)), 2) +
                Math.pow((blue2 - gaus[index + 2]) / Math.sqrt(runVar[index + 2] / (t2-1)), 2));

      if (dif > D2) {
        g_av.pixels[index] = red2;
        g_av.pixels[index + 1] = green2;
        g_av.pixels[index + 2] = blue2;
      } else {
        g_av.pixels[index] = 0;
        g_av.pixels[index + 1] = 0;
        g_av.pixels[index + 2] = 0;
      }
    }
  }

  g_av.updatePixels();
  t2 += 1; 
}


