const patients = [
  {
    name: "Áng, Gabriele",
    pkz: "NGGBRL-R-0156d",
    birth: "1S 56P d",
    world: "Rotfront",
    homeworld: "Rotfront",
    occupation: "Construction Worker (Retired)",
    residence: "ROT-C",
    history: "Chronic asthma, Osteoporosis, Severe hearing loss",
    notes: "Cochlear implanatation requested",
    img: "assets\\images\\Ang Gabriele.png"
  },
  {
    name: "Fong, Roswita",
    pkz: "FORSWT-V-350202",
    birth: "(Rotfront) -6S 20P a",
    world: "Vineta",
    homeworld: "Rotfront",
    occupation: "Replika Technician (Retired)",
    residence: "ROT-C",
    history: "Chronic obstructive pulmonary disease, Multiple sclerosis, Insomnia",
    notes: "Patient is forgetful about her medication.",
    img: "assets\\images\\Roswita Fong.png"
  },
  {
    name: "Gao, Waltraud",
    pkz: "GAWLTR-R-0276b",
    birth: "(Rotfront) 2S 76P b",
    world: "Rotfront",
    homeworld: "Rotfront",
    occupation: "Factory Worker",
    residence: "ROT-C",
    history: "Irritative bronchial asthma",
    notes: "Did not react well to antibiotics.",
    img: "assets\\images\\Gao Waldi.png"
  },
  {
    name: "Itou, Erika",
    pkz: "ITERIK-V-560524",
    birth: "(Rotfront) 14S 52P c",
    world: "Vineta",
    homeworld: "Rotfront",
    occupation: "University Student",
    residence: "ROT-C",
    history: "Sprained ankle, grade I",
    notes: "Very active in sporting activities.",
    img: "assets\\images\\Erika Itou.png"
  },
  {
    name: "Itou, Isolde",
    pkz: "ITISLD-V-560524",
    birth: "(Rotfront) 14S 52P c",
    world: "Vineta",
    homeworld: "Rotfront",
    occupation: "Shop Assistant",
    residence: "ROT-C",
    history: "Minor fracture - left shin, Double fracture - right arm, Major laceration - forehead",
    notes: "Regularly treated for small lesions. Very prone to accidents.",
    img: "assets\\images\\Isolde Itou.png"
  },
  {
    name: "Kho, Ulrike",
    pkz: "KHULRK-K-520702",
    birth: "(Rotfront) 10S 62P a",
    world: "Kitezh",
    homeworld: "Rotfront",
    occupation: "Mechanic",
    residence: "ROT-C",
    history: "Irritative bronchial asthma",
    notes: "(Removed)",
    img: "assets\\images\\Ulrike Kho.png"
  },
  {
    name: "Li, Saskia",
    pkz: "LISSKI-R-2939b",
    birth: "(Rotfront) 29S 39P b",
    world: "Rotfront",
    homeworld: "Rotfront",
    occupation: "Student",
    residence: "ROT-C",
    history: "Bronchial infection",
    notes: "Unknown cause.",
    img: "assets\\images\\Li Saskia.png"
  },
  {
    name: "Liang, Rebecca",
    pkz: "LNGRBCC-V-500106",
    birth: "(Rotfront) 8S 12P b",
    world: "Vineta",
    homeworld: "Rotfront",
    occupation: "Biologist",
    residence: "ROT-C",
    history: "Sinus infection",
    notes: "Antidepressant ration was doubled.",
    img: "assets\\images\\Liang Rebecca.png"
  },
  {
    name: "Nguyen, Nikolai",
    pkz: "NGNKOL-R-2122c",
    birth: "(Rotfront) 21S 22P c",
    world: "Rotfront",
    homeworld: "Rotfront",
    occupation: "Writer",
    residence: "ROT-C",
    history: "Thoracic back pain",
    notes: "Claims to be unable to take part in communal morning exercises.",
    img: "assets\\images\\Nikolai Nguyen.png"
  },
  {
    name: "Yeong, Ariane",
    pkz: "YNGARN-L-5921D",
    birth: "(Rotfront) 18S 6P a",
    world: "Leng",
    homeworld: "Rotfront",
    occupation: "Radio Officer",
    residence: "ROT-C",
    history: "Insomnia, bruising, premature achromotrichia",
    notes: "(Removed)",
    img: "assets\\images\\Ariane Yeong.png"
  },
  {
    name: "Yi, Siegfried",
    pkz: "YSGFRD-R-1815a",
    birth: "(Rotfront) 18S 6P a",
    world: "Rotfront",
    homeworld: "Rotfront",
    occupation: "Cleaner",
    residence: "ROT-C",
    history: "Irritative bronchial asthma, contact dermatitis",
    notes: "(Removed)",
    img: "assets\\images\\Yi Siegfried.png"
  },
];

const list = document.getElementById("patient-list");
patients.forEach((p, i) => {
  const li = document.createElement("li");
  li.textContent = p.name;
  li.addEventListener("click", () => showPatient(i));
  list.appendChild(li);
});

function showPatient(index) {
  const patient = patients[index];
  document.querySelectorAll("#patient-list li").forEach(li => li.classList.remove("active"));
  document.querySelectorAll("#patient-list li")[index].classList.add("active");

  const infoPanel = document.getElementById("info-panel");
  infoPanel.innerHTML = `
    <p><strong>Name:</strong> ${patient.name}</p>
    <p><strong>PKZ:</strong> ${patient.pkz}</p>
    <p><strong>Date of Birth (Rotfront):</strong> ${patient.birth}</p>
    <p><strong>World of Birth:</strong> ${patient.world}</p>
    <p><strong>Homeworld:</strong> ${patient.homeworld}</p>
    <p><strong>Occupation:</strong> ${patient.occupation}</p>
    <p><strong>Residence (Sektor):</strong> ${patient.residence}</p>
    <p><strong>Medical History:</strong><br>${patient.history}</p>
    <p><strong>Doctor’s Notes:</strong> ${patient.notes}</p>
  `;

  const portraitImg = document.getElementById("portrait-img");
  if (patient.img) {
    portraitImg.src = patient.img;
    portraitImg.style.display = "block";
  } else {
    portraitImg.style.display = "none";
  }
}