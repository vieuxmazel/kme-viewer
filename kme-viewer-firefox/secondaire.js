window.addEventListener('load', function () {
    alert("It's loaded!")
  })

  function addEvents(){
    document.getElementsByClassName("ol-oaycontainer-stopevent")[0].addEventListener('click', getKME_SuisseMobile); //
    document.getElementsByClassName('menu')[0].addEventListener('mouseover', getPosition, false);
}