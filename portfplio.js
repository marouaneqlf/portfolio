const toggleButton = document.getElementById("toggle-mode"); 
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
    // if (document.body.getElementById.toggle("dark-mode")) {
    //     color = "white";
    // }else{
    //     color = "black";
    // }
});
window.onload = () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};
const sr = ScrollReveal({
    origin:'bottom',
    distance:'30px',
    duration:3000,
    Delay:900,
    reset:true,
});
sr.reveal('.button-grop',{origin:'bottom'});
const letext = ScrollReveal({
    origin:'bottom',
    distance:'30px',
    duration:3000,
    Delay:900,
    reset:true,
});
sr.reveal('.about-text',{origin:'top'});
//dowlowd cv
function downlowd() {
    let button = document.getElementById('download');
    let loader = document.getElementById('loader');
    window.scrollTo(0, 0);
    loader.style.display = "inline-block";
    loader.disabled=true;
    setTimeout(() => {
      let link = document.createElement("a");
      link.href = "Black Modern Professional Resume.pdf";
        link.download = "my_cv.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        loader.style.display = "none";
        button.disled=false;
        (2000);
    }
    );
}