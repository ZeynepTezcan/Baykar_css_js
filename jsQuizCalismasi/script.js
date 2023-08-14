let sunucudanDonen;

var connection = new XMLHttpRequest();
connection.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //xml bağlantısı
        sunucudanDonen=JSON.parse(connection.responseText);
         soruGetir();
    }

};
//Sunucu bağlantısı için gerekli bilgileri ve aldığı verileri sunucudan gönderme komutu
connection.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
connection.send();

const timer = document.getElementById("timer");
const goruntulemeAlani=document.getElementById("quiz");
const cevapSecenekleri=document.querySelectorAll(".choice");
const mevcutSoru=document.getElementById("question");
const ids=document.getElementById("id");
const resultTable = document.getElementById("result-table");

let radios = document.querySelectorAll('input[type="radio"][name="choice"]');

const labelA=document.getElementById("labelA");
const labelB=document.getElementById("labelB");
const labelC=document.getElementById("labelC");
const labelD=document.getElementById("labelD");

const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const choiceC = document.getElementById("choiceC");
const choiceD = document.getElementById("choiceD");


const gonderButonu=document.getElementById("sendButton");

let cevaplar = [];

let countdown = 30;
let interval;
let sira=16; //şıklar boş gelmesin diye 16 dan başlattım 
let deger=0;


function soruGetir(){
    clearInterval(interval); // Önceki interval'ı temizle
    startCountdown();
    timeFonksiyondisabled();
    secimleriSifirla();
    setTimeout(timeFonksiyon, 10000);
    sira++;
    console.log(sunucudanDonen);
    let siradakiSoruIcerigi=sunucudanDonen[sira];
    let siradakiSoruIds=sunucudanDonen[deger];
    deger++;
    ids.innerText=siradakiSoruIds.id+"-";
    mevcutSoru.innerText=siradakiSoruIcerigi.title;

    let kelimeler = siradakiSoruIcerigi.title.split(" ");
    labelA.textContent = kelimeler[0];
    labelB.textContent = kelimeler[1];
    labelC.textContent = kelimeler[2];
    labelD.textContent = kelimeler[3];
    countdown = 30;
    timer.textContent = countdown;
    timer.style.color = "black";

    if(sira > 26) {
      clearInterval(interval);
      document.getElementById('results').style.display = 'block';
        goruntulemeAlani.innerHTML = `
            <h2>Sınavı tamamladınız</h2>
            <button onclick="location.reload()">Yeniden Başla</button>
            
        `
    }
}
function timeFonksiyondisabled(){

    choiceA.disabled = true;
    choiceB.disabled = true;
    choiceC.disabled = true;
    choiceD.disabled = true;
   }
function timeFonksiyon(){

    choiceA.disabled = false;
    choiceB.disabled = false;
    choiceC.disabled = false;
    choiceD.disabled = false;
   }

function startCountdown() {
    interval = setInterval(() => {
        countdown--;

        if (countdown < 10) {
            timer.style.color = "red";
        }

        timer.textContent = countdown;

        if (countdown === 0) {
            clearInterval(interval);
            soruGetir();
        }
    }, 1000);
    return interval;
};

function secimleriSifirla(){
    cevapSecenekleri.forEach(choice => choice.checked=false);
}


function secimiAl() {
    let secilenMetin = "";
    

    radios.forEach(function(radio) {
        if (radio.checked) {
            let labelForSelectedRadio = document.querySelector(`label[for="${radio.id}"]`);
            secilenMetin = labelForSelectedRadio.textContent;
        }
    });
    return secilenMetin;

}

gonderButonu.addEventListener('click', () =>{
    clearInterval(interval);
    startCountdown();
    const secilenMetin = secimiAl();
    displayResults();
        if(secilenMetin){


          if(sira < 26) {
              soruGetir();
          } else {
            clearInterval(interval);
            document.getElementById('results').style.display = 'block';
              goruntulemeAlani.innerHTML = `
                  <h2>Sınavı tamamladınız</h2>

  
                  <button onclick="location.reload()">Yeniden Başla</button>
                  
              `
              
          }
        }
        return sira;

  })

  function displayResults() {
    const secilenMetin = secimiAl();

    let tableBody = document.getElementById('result-table').querySelector('tbody');
    for (let i = sira-1; i < sira; i++) {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.textContent = deger;
        cell2.textContent = mevcutSoru.textContent;
        cell3.textContent = secilenMetin;
    }
}

