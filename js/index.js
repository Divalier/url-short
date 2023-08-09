let mylink = "";
let myid = 1;
let dispaly = "true";
let menudisplay = () => {
  if (dispaly === "false") {
    document.getElementById("menus").style.display = "none";
    dispaly = "true";
  } else {
    document.getElementById("menus").style.display = "flex";
    dispaly = "false";
  }
};
let myurl = (urlcont) => {
  let out = (document.getElementById("output").innerHTML +=
    '<div class="out flex row jbetween w"><div><p>' +
    mylink +
    '</p></div><div class="outc flex row jcenter ascenter"><div class="shorted"><p id="' +
    myid +
    '">' +
    urlcont.result.short_link +
    '</p></div><div class="flex h jcenter ascenter"><button onclick="copy(this)" value="' +
    myid +
    '">Copy</button></div></div></div>');
};
let shortl = async (link) => {
  await fetch("https://api.shrtco.de/v2/shorten?url=" + link)
    .then((resp) => {
      if (!resp.ok) {
        alert("check your  url");
        throw new Error("Network response was not ok");
      } else {
        return resp.json();
      }
    })
    .then((ulr) => {
      let urlcont = ulr;
      myurl(urlcont);
    });
};

let short = () => {
  mylink = document.getElementById("shortin").value;
  myid += 1;
  shortl(mylink);
};

let copy = (element) => {
  let text = document.getElementById(element.value).innerHTML;
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      element.innerHTML = "copied!";
      element.style.backgroundColor = "hsl(255, 11%, 22%)";
    } catch (err) {
      element.innerHTML = "reload";
      element.style.backgroundColor = "red";
    }
  };
  copyContent();
};
