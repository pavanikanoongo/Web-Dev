const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const container = document.getElementById("container");
const imageDiv = document.getElementById("image-div");

const imageArray = [
    "https://www.surfertoday.com/images/stories/sunrise-sunset-facts.jpg",
    "https://www.rwongphoto.com/images/640/RW6955-2_web.jpg",
    "https://www.wallartprints.com.au/blog/wp-content/uploads/2017/10/hummingbird-nature-pictures-98278440.jpg",
    "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2ZsMjMxNDY4ODE2NTQtaW1hZ2Uta295NWoyeG4uanBn.jpg",
    "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892070/EducationHub/photos/grand-canyon-colorado-river.jpg"
];

const n = imageArray.length;
const containerWidth = 80;
const imageDivWidth = n * containerWidth;
imageDiv.style.width = imageDivWidth;




let curposition = 0;

leftBtn.addEventListener("click", () => {
    if (curposition == 0) {
        curposition = n - 1;
    }
    else {
        curposition--;
    }
    showImg();
})
rightBtn.addEventListener("click", () => {
    if (curposition == n - 1) {
        curposition = 0;
    }
    else {
        curposition++;
    }
    showImg();
})

function showImg() {
    let transformXDistance = -curposition * containerWidth;
    imageDiv.style.transform = `translateX(${transformXDistance}vw)`;
}