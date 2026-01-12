//nav meni
let menu = document.querySelector("#navbarNav");
const nizText = ["Home", "About", "Store", "Staff", "Contact", "FAQ", "Author", "ZIP"];
const nizLink = ["index.html", "#about", "#store", "#staff", "#contact", "#faq", "author.html", "CafeDelight.7z"];

let ulTag = document.createElement("ul");
ulTag.className = "navbar-nav gap-lg-3";

for (let i = 0; i < nizText.length; i++) {
    let liTag = document.createElement("li");
    liTag.className = "nav-item";

    let aTag = document.createElement("a");
    aTag.className = "nav-link";
    aTag.href = nizLink[i];
    aTag.textContent = nizText[i];

    liTag.appendChild(aTag);
    ulTag.appendChild(liTag);
}
menu.appendChild(ulTag);

ulTag.lastElementChild.firstElementChild.setAttribute("download", "");

//home slider sa slikama
const nizSlike = ['kahve', 'pic1', 'kafaaparat']; //niz sa imenima slika
let slika = document.getElementById("home");
let index = 0;

function promeniSliku(){
  slika.style.backgroundImage = 'url("assets/img/' + nizSlike[index] + '.jpg")'; //putanja + slika iz niza uz pomoc indeksa + .jpg, znaci nizSlike[0] = assets/img/kahve.jpg
  index = (index + 1) % nizSlike.length; //beskonacni loop za slike (pomeri se na jednu sliku, kada stigne do kraja, vraca se na pocetak pa sve tako...)
}

promeniSliku();
setInterval(promeniSliku, 3000); //slike se menjaju na svake tri sekunde

//modal za about sekciju
const modal = document.getElementById("box"); 
const btn = document.getElementById("taster");
const span = document.getElementsByClassName("close")[0]; 

btn.onclick = function(){
  modal.style.display = "block";  //kada se pritisne dugme modal je vidljiv
};

span.onclick = function(){
  modal.style.display = "none"; //kada se pritisne "x" modal nije vidljiv
}

window.onclick = function(event){
  if(event.target == modal){
    modal.style.display = "none"; //kada se pritisne bilo gde van modala izlazi se
  }
};

//store sekcija
const storeItems = [
  {
    title: "Espresso",
    desc: "A bold shot of pure energy, crafted for those who love intensity in every sip.",
    price: "2.50€",
    img: "assets/img/espresso.jpg"
  },
  {
    title: "Capuccino",
    desc: "A creamy harmony of espresso, steamed milk, and froth that warms the soul.",
    price: "3.30€",
    img: "assets/img/cappuccino.jpg"
  },
  {
    title: "Matcha Latte",
    desc: "A vibrant green blend of Japanese tea and milk, soothing yet full of flavor.",
    price: "4.70€",
    img: "assets/img/matcha2.jpg"
  }
];

const container = document.getElementById("storeCards");
storeItems.forEach(item => {
  const cardHolder = document.createElement("div");
  cardHolder.className = "col-md-4";
  const card = document.createElement("div");
  card.className = "card h-100 shadow-sm";

  //slika napitka
  const image = document.createElement("img");
  image.src = item.img;
  image.alt = item.title;
  image.className = "card-img-top";

  //telo kartice
  const cardBody = document.createElement("div");
  cardBody.className = "card-body text-center";

  //naslov
  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = item.title;

  //tekst (opis)
  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = item.desc;

  //cena
  const price = document.createElement("p");
  price.className = "fw-bold";
  price.textContent = item.price;

  cardBody.append(h5, text, price);
  card.append(image, cardBody);
  cardHolder.appendChild(card);
  container.appendChild(cardHolder);
});

//blago povecanje velicine kartice u store sekciji uz pomoc mouseovera i mouseouta
const storeCards = document.querySelectorAll('#store .card');

storeCards.forEach(card => {
  card.addEventListener('mouseover', () => {    //kada se predje misem preko kartice, ona se poveca
    card.style.transform = 'scale(1.05)';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
  });

  card.addEventListener('mouseout', () => {      //kada se mis pomeri van kartice, ona se vraca u normalno stanje 
    card.style.transform = 'scale(1)';
    card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  });
});

//validacija forme (kontakt sekcija)
document.getElementById("dugme").addEventListener("click", provera);

function provera(){
  let objIme, objEmail, objRezervacija, objPoruka;
  let i=0;  //brojac greski

  objIme = document.querySelector("#imePrezime");
  objEmail = document.querySelector("#email");
  objRezervacija = document.querySelector("#ddlLista");
  objPoruka = document.querySelector("#taPolje");

    // ime i prezime
  let reImePrezime = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,19})+$/;

  if(!reImePrezime.test(objIme.value)){
      objIme.nextElementSibling.classList.add("prikaz2"); //.prikaz2 - klasa koja ima display: block
      objIme.classList.add("crveno");                     //.crveno - klasa koja daje crvenu borduru
      i++;
  }
  else{
      objIme.nextElementSibling.classList.remove("prikaz2");
      objIme.classList.remove("crveno");
  }

    // email
  let reEmail = /^[\w\d\.]+@[\w\d\.]+\.[a-zA-Z\d]{2,}$/

  if(!reEmail.test(objEmail.value)){
      objEmail.nextElementSibling.classList.add("prikaz2");
      objEmail.classList.add("crveno");
      i++;
  }
  else{
      objEmail.nextElementSibling.classList.remove("prikaz2");
      objEmail.classList.remove("crveno");
  }

    // rezervacija
  if(objRezervacija.options[objRezervacija.selectedIndex].value == "0"){
      objRezervacija.parentElement.nextElementSibling.classList.add("prikaz2");
      objRezervacija.classList.add("crveno");
      i++;
  }
  else{
      objRezervacija.parentElement.nextElementSibling.classList.remove("prikaz2");
      objRezervacija.classList.remove("crveno");
  }

    // poruka
  if (objPoruka.value.trim().length < 30) {
      objPoruka.nextElementSibling.nextElementSibling.classList.add("prikaz2");
      objPoruka.classList.add("crveno");
      i++;
  }
  else {
      objPoruka.nextElementSibling.nextElementSibling.classList.remove("prikaz2");
      objPoruka.classList.remove("crveno");
  }

  //ispis da je poruka uspesno poslata
  let uspesno = document.querySelector("#uspesno"); 
  if (i == 0) {
      uspesno.classList.add("prikaz2");
  } else {
      uspesno.classList.remove("prikaz2");
  }
}

//text area - ne sme vise od 300 karaktera
document.querySelector("#taPolje").addEventListener("keyup", function(){
  let polje = document.querySelector("#taPolje");
  let vrednostPolja = polje.value;
  let brojKaraktera = vrednostPolja.length;
  const maxKaraktera = 300;

  if(brojKaraktera <= maxKaraktera){
      let ostatak = maxKaraktera - brojKaraktera;
      document.querySelector("#brojKaraktera").innerHTML = `${ostatak} characters left`;
  } else {
      polje.value = vrednostPolja.substring(0, maxKaraktera); //uz pomoc substringa se ne moze preci 300 karaktera
  }
});

//dinamicka drop down lista
const nizRezervacija = new Array("Table for 2", "Table for 4", "Table for 6+", "Private Event");
const nizValueRezervacija = new Array("two", "four", "sixplus", "private");

let tagSelect = document.createElement("select");
tagSelect.setAttribute("id", "ddlLista");
tagSelect.classList.add("form-select");

let tagOptionPrvi = document.createElement("option");
tagOptionPrvi.setAttribute("value", "0");
let sadrzajPrvogOptionTaga = document.createTextNode("Select an option");

tagOptionPrvi.appendChild(sadrzajPrvogOptionTaga);
tagSelect.appendChild(tagOptionPrvi);

for(let i=0; i<nizRezervacija.length; i++){
  let tagOptionOstali = document.createElement("option");
  tagOptionOstali.setAttribute("value", nizValueRezervacija[i]);
  let sadrzajOstalihOptionTagova = document.createTextNode(nizRezervacija[i]);

  tagOptionOstali.appendChild(sadrzajOstalihOptionTagova);
  tagSelect.appendChild(tagOptionOstali);
}

padajucaLista.appendChild(tagSelect);

//staff sekcija
const staff = [
  {
    img: "assets/img/covek1.jpg",
    name: "Donovan Walker",
    role: "Barista",
    description: `Donovan is a highly skilled barista with over five years of experience in specialty coffee.
            He is passionate about every step of the coffee-making process, from selecting high-quality
            beans to perfecting extraction and milk texturing.
            He enjoys interacting with customers and believes that great coffee is not only about taste,
            but also about the experience and atmosphere in the café.
            Specialty: Latte art, espresso-based drinks`
  },
  {
    img: "assets/img/covek2.jpg",
    name: "Jane Smith",
    role: "Manager",
    description: `Jane is responsible for the daily operations of the café and ensures that everything runs
            smoothly, from staff coordination to customer satisfaction.
            With more than eight years of experience in hospitality management, she brings strong leadership
            and organization skills to the team.
            She focuses on creating a welcoming environment where guests feel comfortable and valued,
            while also supporting the staff and maintaining high service standards.`
  },
  {
    img: "assets/img/covek3.jpg",
    name: "Peter Parker",
    role: "Pastry Chef",
    description: `Peter is the creative mind behind our fresh pastries and desserts.
            Every morning, he prepares a selection of baked goods using carefully chosen ingredients
            and traditional techniques.
            His passion for baking is reflected in both taste and presentation, ensuring that each pastry
            perfectly complements our coffee selection.
            Specialty: Artisan pastries and desserts`
  }
];

const osobljeContainer = document.querySelector("#osoblje");
for(let i=0; i<staff.length; i++){
  let card = document.createElement("div");
  card.className = "card mb-4 shadow-sm p-4";
  card.style.width = "400px";
  
  //slika zaposlenog
  let image = document.createElement("img");
  image.setAttribute("src", staff[i].img);
  image.setAttribute("alt", staff[i].name); 
  image.className = "rounded-circle mx-auto staff-img mb-3";
  card.appendChild(image);

  //telo kartice 
  let cardBody = document.createElement('div');
  cardBody.className = "card-body text-center";

  //naslov kartice tj ime zaposlenog
  let staffName = document.createElement("h5");
  staffName.className = "card-title";
  staffName.textContent = staff[i].name;
  cardBody.appendChild(staffName);

  //uloga
  let staffRole = document.createElement("p");
  staffRole.className = "text-muted mb-2";
  staffRole.textContent = staff[i].role;
  cardBody.appendChild(staffRole);

  //read more
  let rmBtn = document.createElement("button");
  rmBtn.className = "btn btn-outline-warning bt-sm mt-2 rdMore"
  rmBtn.textContent = "Read More";
  cardBody.appendChild(rmBtn);

  //skriveni opis koji se prikazuje nakon klika na dugme read more
  let staffText = document.createElement("p");
  staffText.className = "mt-3 staff-desc";
  staffText.style.display = "none";
  staffText.textContent = staff[i].description;
  cardBody.appendChild(staffText);
  
  card.appendChild(cardBody);
  osobljeContainer.appendChild(card);
}

//faq accordion
const questions = [
  {
    title: "Do you accept table reservations?",
    answer: "Yes, you can reserve a table by using our contact form or by visiting the café in person."
  },
  {
    title: "Do you offer takeaway and delivery options?",
    answer: "We offer takeaway for all drinks, and selected items are available for delivery."
  },
  {
    title: "What are your working hours?",
    answer: "We are open Monday to Friday from 8:00 AM to 10:00 PM, Saturday from 8:00 AM to 6:00 PM, and closed on Sundays."
  },
  {
    title: "Do you have vegetarian or vegan drink options?",
    answer: "Yes, we offer plant-based milk options such as oat, almond, and soy milk."
  },
  {
    title: "Is your café pet-friendly?",
    answer: "Yes, well-behaved pets are welcome in our outdoor seating area."
  },
  {
    title: "Do you offer free Wi-Fi for guests?",
    answer: "Yes, free Wi-Fi is available for all our guests."
  }
];

const faqAccordion = document.querySelector("#faqAccordion");
//generisan html za accordion uz bootstrap
faqAccordion.innerHTML = questions.map((q, index) => `
  <div class="accordion-item">
    <h2 class="accordion-header" id="heading${index}">
      <button class="accordion-button collapsed" type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse${index}"
              aria-expanded="false"
              aria-controls="collapse${index}">
        ${q.title}
      </button>
    </h2>
    <div id="collapse${index}" class="accordion-collapse collapse"
         aria-labelledby="heading${index}"
         data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        ${q.answer}
      </div>
    </div>
  </div>
`).join("");

//quick links iz footera
let ime = ["Home", "About", "Store", "Contact", "Staff", "FAQ", "Author", "Documentacion"];
let link = ["#", "#about", "#store", "#contact", "#staff", "#faq", "author.html", "dokumentacija.pdf"];

let quickhtml = `<h5 class="fw-bold">Quick Links</h5>`;

for(let i=0; i<ime.length; i++){
  quickhtml += `<a href="${link[i]}" class="text-white text-decoration-none d-block">${ime[i]}</a>`;
}

document.querySelector("#links").innerHTML = quickhtml;

//jQuery
//read more
$('.rdMore').click(function(){
    let button = $(this);
    button.prop('disabled', true); 

    // slideToggle animacija
    button.next('.staff-desc').stop(true, true).slideToggle(300, function(){
        button.prop('disabled', false); // enable dugme nakon animacije
        if(button.next('.staff-desc').is(':visible')){
            button.text('Read Less'); // menja tekst kad je vidljivo
        } else {
            button.text('Read More'); // menja tekst kad nije vidljivo
        }
    });
});

//back to top dugme
$('#backToTop').hide();
    $(window).scroll(function(){
        let top = $(this)[0].scrollY;
        if(top > 700){
            $('#backToTop').fadeIn(); //kada se predje 700px dugme se polako pojavljuje
        }else{  
            $('#backToTop').fadeOut();  //dugme polako nestaje
        }
    });
    
$('#backToTop').click(function(){
        $('html').animate({
            scrollTop: 0    //klikom na dugme vracamo se na pocetak stranice i trebace nam 50 milisekundi
        }, 50);     
});