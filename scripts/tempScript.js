function test() {
  const divs = document.getElementsByClassName("card");

  for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", (event) => {
      divs[i].classList.toggle("enlarge");
    });
  }
}
