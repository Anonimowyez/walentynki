const player=document.getElementById("player");
const musicPlaylist=["music/1.mp3","music/2.mp3","music/3.mp3","music/4.mp3","music/5.mp3"];
let track=0;

function enterSite(){
  document.getElementById("intro").classList.remove("active");
  document.getElementById("main").classList.add("active");
  playMusic();hearts();startMiniGame();
}

function playMusic(){
  player.src=musicPlaylist[track];
  player.play();
  player.onended=()=>{track=(track+1)%musicPlaylist.length;playMusic();};
}

// Tarot
const tarotTexts = [
  "Twoje uczucia rosną w ciszy, gotowe, by rozkwitnąć",
  "Nadzieja przyciąga to, co jeszcze ukryte",
  "W twoim sercu kryje się magia, która przyciąga prawdę",
  "Tajemnice serca są początkiem fascynacji",
  "Spotkanie dusz może zdarzyć się w najmniej oczekiwanym momencie",
  "Cierpliwość buduje fundamenty każdej relacji",
  "Czasem nagłe emocje potrafią przemienić świat",
  "Subtelne gesty mają moc większą niż słowa",
  "Serce odważne przyciąga serce prawdziwe",
  "Drogę do jego myśli wskaże intuicja",
  "Uczucia, które jeszcze się nie ujawniły, wkrótce rozświetlą wszystko",
  "Każdy krok zbliża was do siebie",
  "Tajemnica rodzi fascynację i ciekawość",
  "Słuchaj swojego serca, ono zna odpowiedź",
  "Namiętność rośnie w subtelnych spojrzeniach",
  "Los może zmienić wszystko jednym dniem",
  "Milczenie czasem jest początkiem miłości",
  "Nadzieja nie zna granic",
  "Drobne znaki są ważniejsze, niż myślisz",
  "Szczerość uczuć w sercu jest nie do zatrzymania",
  "Małe gesty tworzą wielką magię",
  "Prawdziwe spotkanie rodzi się w spojrzeniu",
  "Serce, które czuje, odnajdzie drugie serce",
  "Pragnienia czekają na odpowiedni moment, by rozkwitnąć",
  "Cierpliwość jest tajemnicą każdej miłości",
  "Marzenia serca mają moc przyciągania",
  "To, co ukryte, może rozkwitnąć w odpowiednim czasie",
  "Milczenie czasem mówi więcej niż słowa",
  "Coś zaczyna się w sercu, zanim stanie się słowem",
  "Twoje uczucia świecą w jego świecie, nawet jeśli nie widzi ich jeszcze"
];
let usedTexts=[];
function drawCards(){
  const cards=document.querySelectorAll(".tarot-card");
  let available=tarotTexts.filter(t=>!usedTexts.includes(t));
  cards.forEach(card=>{
    if(available.length===0){usedTexts=[];available=tarotTexts.slice();}
    const index=Math.floor(Math.random()*available.length);
    card.querySelector(".card-back").innerText=available[index];
    usedTexts.push(available[index]);
    available.splice(index,1);
    card.classList.remove("flipped");
  });
}
function flipCard(el){ el.classList.toggle("flipped"); }

// Mini gra
let miniTexts=["Jesteś wyjątkowa","Twój uśmiech rozświetla dzień","Cieszę się, że jesteś obok","Cieszę się, że jesteś obok","Czasem wystarczy sama obecność"];
let caught=0;
function startMiniGame(){
  const area=document.getElementById("gameArea");
  area.innerHTML="";
  caught=0;
  const areaRect=area.getBoundingClientRect();
  
  for(let i=0;i<5;i++){
    const h=document.createElement("div");
    h.className="mini-heart";
    h.innerText="❤️";
    const top=Math.random()*(areaRect.height-30);
    const left=Math.random()*(areaRect.width-30);
    h.style.top=top+"px";
    h.style.left=left+"px";
    h.onclick=function(){
      this.style.display="none";
      const msg=document.getElementById("gameMessage");
      msg.innerText=miniTexts[i];
      caught++;
      if(caught===5){ msg.innerText="💖 Wszystkie serduszka złapane! pięknieee! 💖"; }
    };
    area.appendChild(h);
  }
}
function resetMiniGame(){ startMiniGame(); document.getElementById("gameMessage").innerText=""; }

// Miś GIF
const bearImages=["bear1.gif","bear2.gif"];
let bearIndex=0;
function yesClicked(){
  bearIndex=(bearIndex+1)%bearImages.length;
  document.querySelector(".bear").src=bearImages[bearIndex];
  alert("Yay! 💖 Oliwia will be my valentine!");
}
function noClicked(){const btn=document.getElementById("noBtn");btn.classList.add("puff");setTimeout(()=>btn.style.display="none",600);}

// Sekret
function showPasswordInput(){ document.getElementById("showSecretBtn").style.display="none"; document.getElementById("passwordContainer").style.display="flex"; }
function unlockSecret(){
  const pw=document.getElementById("password").value;
  if(pw==="Córeczka2007"){
    document.getElementById("main").classList.remove("active");
    document.getElementById("secretPage").classList.add("active");
    player.src="music/secret.mp3";player.play();
  } else {alert("Niepoprawne hasło!");}
}
function backToMain(){
  document.getElementById("secretPage").classList.remove("active");
  document.getElementById("main").classList.add("active");
  playMusic();
}

// Serduszka w tle
function hearts(){
  setInterval(()=>{
    const h=document.createElement("div");h.className="heart";h.innerText="❤️";
    h.style.left=Math.random()*100+"vw";
    h.style.fontSize=(Math.random()*20+10)+"px";
    document.getElementById("hearts").appendChild(h);
    setTimeout(()=>h.remove(),6000);
  },400);
}

