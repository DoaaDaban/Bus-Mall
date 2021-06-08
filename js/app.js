'use strict';

let allImgElements=document.getElementById('allImages');

let leftImageElement=document.getElementById('left-image');
let midImageElement=document.getElementById('mid-image');
let rightImageElement=document.getElementById('right-image');


let maxAttempts=25;
let userAttemptsCounter=0;

let leftImageIndex; 
let midImageIndex; 
let rightImageIndex; 

Product.allProducts=[];

let pNames=[];
let pVotes=[];
let pShown=[];

function Product(nameProd,filePath){
this.nameProd=nameProd;
this.filePath=filePath;
this.timesImgShown=0;
this.votes=0;

Product.allProducts.push(this);


pNames.push(this.nameProd);

}

//console.log(pNames)

new Product('bag','img/bag.jpg');
new Product('banana','img/banana.jpg');
new Product('bathroom','img/bathroom.jpg');
new Product('boots','img/boots.jpg');
new Product('breakfast','img/breakfast.jpg');
new Product('bubblegum','img/bubblegum.jpg');
new Product('chair','img/chair.jpg');
new Product('cthulhu','img/cthulhu.jpg');
new Product('dog-duck','img/dog-duck.jpg');
new Product('dragon','img/dragon.jpg');
new Product('pen','img/pen.jpg');
new Product('pet-sweep','img/pet-sweep.jpg');
new Product('scissors','img/scissors.jpg');
new Product('shark','img/shark.jpg');
new Product('sweep','img/sweep.png');
new Product('tauntaun','img/tauntaun.jpg');
new Product('unicorn','img/unicorn.jpg');
new Product('usb','img/usb.gif');
new Product('water-can','img/water-can.jpg');
new Product('wine-glass','img/wine-glass.jpg');


//console.log(Product.allProducts);



function generateRandomIndex() {
    return Math.floor(Math.random() * Product.allProducts.length); 
  }
  
  let notRepeatProd=[];
  
  function renderThreeImages() {

    leftImageIndex=generateRandomIndex();
     midImageIndex=generateRandomIndex();
     rightImageIndex=generateRandomIndex();

    while ((leftImageIndex===midImageIndex) || (leftImageIndex===rightImageIndex) || (midImageIndex===rightImageIndex) || 
    (notRepeatProd.includes(leftImageIndex)) || (notRepeatProd.includes(midImageIndex)) || (notRepeatProd.includes(rightImageIndex)) ){

      leftImageIndex=generateRandomIndex();
       midImageIndex=generateRandomIndex();
       rightImageIndex=generateRandomIndex();
    }

     notRepeatProd=[leftImageIndex,midImageIndex,rightImageIndex];
     console.log(notRepeatProd)

    // for(let i=0;i<notRepeatProd.length;i++){
    //  if(notRepeatProd[i]===notRepeatProd[i-1]){    
    //   notRepeatProd[i]===notRepeatProd[i].generateRandomIndex();
    //     }
    // }

    leftImageElement.src=Product.allProducts[leftImageIndex].filePath;
    Product.allProducts[leftImageIndex].timesImgShown++;

    midImageElement.src=Product.allProducts[midImageIndex].filePath;
    Product.allProducts[midImageIndex].timesImgShown++;

    rightImageElement.src=Product.allProducts[rightImageIndex].filePath;
    Product.allProducts[rightImageIndex].timesImgShown++;


}

    renderThreeImages();
   //console.log( renderThreeImages().midImageElement);

    //add event listner

    allImgElements.addEventListener('click',userClick);

    // leftImageElement.addEventListener('click',userClick);
    // midImageElement.addEventListener('click',userClick);
    // rightImageElement.addEventListener('click',userClick);


 function userClick(event){
   //  console.log(event.target.id);
     userAttemptsCounter++;
    // console.log(userAttemptsCounter);

    if(userAttemptsCounter<=maxAttempts){
     if(event.target.id='left-image'){
         Product.allProducts[leftImageIndex].votes++;
     }
     else if(event.target.id='mid-image'){
        Product.allProducts[midImageIndex].votes++;
    }
    else if(event.target.id='right-image'){
        Product.allProducts[rightImageIndex].votes++;
    }

    //console.log(Product.allProducts.votes)
  //  console.log(Product.allProducts[allImgElements].votes)
    renderThreeImages();
    }
    
    else{
        // if 25 attemps over ,show result, rmv event listner
        // let prodList=document.getElementById('listOfProducts');

        // for(let i=0;i<Product.allProducts.length;i++){
            
        //     let prodResult=document.createElement('li');

        //     prodList.append(prodResult);
        //     prodResult.textContent=`${Product.allProducts[i].nameProd} has ${Product.allProducts[i].votes} votes,and was seen ${Product.allProducts[i].timesImgShown} times.`;
       
       
        allImgElements.removeEventListener('click',userClick);

       updateProdStorage();

       for(let i=0;i<Product.allProducts.length;i++){
           pVotes.push(Product.allProducts[i].votes);
           pShown.push(Product.allProducts[i].timesImgShown);
         
       }

        chart();
        
        }
    }

    
 //butt

 let but=document.getElementById('button');

 but.addEventListener('click',butClick);
 
 function butClick(event){
 
     let prodList=document.getElementById('listOfProducts');
 
     for(let i=0;i<Product.allProducts.length;i++){
         
         let prodResult=document.createElement('li');
 
         prodList.append(prodResult);
 
        prodResult.textContent=`${Product.allProducts[i].nameProd} has ${Product.allProducts[i].votes} votes,and was seen ${Product.allProducts[i].timesImgShown} times.`;
     
     }

     button.removeEventListener('click', butClick);

 }

 
 //========================================================lab12 Chartjs=======================================================

function chart(){

 let ctx = document.getElementById('myChart');
 let myChart = new Chart(ctx, {
     type: 'bar',
     data: {
         labels:pNames,
         datasets: [{
             label: '# of Votes',
             data: pVotes,
             backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 //'rgba(54, 162, 235, 0.2)',
                //  'rgba(255, 206, 86, 0.2)',
                //  'rgba(75, 192, 192, 0.2)',
                //  'rgba(153, 102, 255, 0.2)',
                //  'rgba(255, 159, 64, 0.2)'
             ],
             borderColor: [
                 'rgba(255, 99, 132, 1)',
                 // 'rgba(54, 162, 235, 1)',
                //  'rgba(255, 206, 86, 1)',
                //  'rgba(75, 192, 192, 1)',
                //  'rgba(153, 102, 255, 1)',
                //  'rgba(255, 159, 64, 1)'
             ],
             borderWidth: 1
         },
         {
            label: '# of Shown',
            data: pShown,
            backgroundColor: [
                //'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                //'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }
        
        
        ],
         
     },
       options: {
         scales: {
             y: {
                 beginAtZero: true
             }
         }
     }
 });
 
}

//=========================================================lab13 local storage======================================


// put my product data on local storage after convert my objects to strings then call it after votes
function updateProdStorage(){
  //console.log(Product.allProducts);
// covert these objects to strings , using json.stringfy
let stringProducts= JSON.stringify(Product.allProducts);
 console.log(stringProducts);

 // add stringPr to local storage
 let localStorStrings= localStorage.setItem('BussMall SProducts',stringProducts);
}


// get the data from local storage then retreive to objects (convert them again from strings to objects). 

function gettingProdStorage(){
    let localStorObjects= localStorage.getItem('BussMall SProducts');
    localStorObjects= JSON.parse(localStorObjects);

 // then make the array of objects Product.allProduct equal to the object items(products) insid local storage (fill the array),
// if its not the first time we visit the web page(!=null).
      if( localStorObjects != null){
    //put local storage inside our array to keep them when refreshing 
       Product.allProducts= localStorObjects;
       }
}

gettingProdStorage();