const insideImage=document.getElementById("inside-image");
const leftImage=document.getElementById("left-image");
const propertyDetailsPage=document.getElementById("property-details");
let iconText=document.getElementsByClassName("icon-text flex");
leftImage.width=10;
const imageArray = [
    "https://res.cloudinary.com/dw4e01qx8/f_auto,q_auto/images/i4fmrubzxnbi6mk4bd1t",
    "https://t3.ftcdn.net/jpg/08/02/63/52/360_F_802635257_9dMN6zw6oPwua5BPje9NhEwdGHNKjxjH.jpg",
    "https://img.freepik.com/premium-photo/luxury-interior-design-pool-villa-kitchen-area-whith-feature-island-counter_1108314-131613.jpg",
    "https://www.luxuryvillasstay.com/wp-content/uploads/2022/04/19.jpg",
    "https://archello.s3.eu-central-1.amazonaws.com/images/2020/01/05/Luxury-Contemporary-Villa-Interior-Design-1.1578228835.315.jpg"
];

const n = imageArray.length;
let i=0;

setInterval(()=>{
    insideImage.src=imageArray[i];
    i++;
    if(i==n){
        i=0;
    }
},1000)
 
let j=0;

setInterval(()=>{
    iconText[iconText.length-1].style.backgroundColor="white"
    if(j>0){
        iconText[j-1].style.backgroundColor="white";
    }
    else if(j===0){
        iconText[j].style.backgroundColor="rgb(233, 228, 226)";
    }
    if (iconText[j]) {
        iconText[j].style.backgroundColor = "rgb(233, 228, 226)";
    }
   j++;
   if(j===iconText.length){
    j=0;
    console.log("changed")
   }
},1500)


