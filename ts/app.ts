/// <reference path="Bolnica.ts" />

let bolnice: Bolnica[] = [];
let aktivnaBolnica: Bolnica = null;

function promeniAktivnu(selekt: HTMLSelectElement): void {
    aktivnaBolnica = bolnice.filter(el => el.naziv == selekt.value)[0];
    aktivnaBolnica.refreshHTML();
}

function wireEvents(): void {

    // dodaj simptom
    document.getElementById("dodajSimptom").addEventListener("click", () => {
        let id = Number((document.getElementById("ids") as HTMLInputElement).value);
        let simptom = (document.getElementById("simptom") as HTMLSelectElement).value;
        let s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(el => el.id == id)[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });


    //TODO "Dodaj pacijenta"

    document.getElementById("dodajPacijenta").addEventListener("click", () => {
        let id = aktivnaBolnica.pacijenti.length + 1;
        let ime: HTMLInputElement = document.getElementById("ime") as HTMLInputElement;
        let prezime: HTMLInputElement = document.getElementById("prezime") as HTMLInputElement;
        let temp:HTMLInputElement = document.getElementById("temperatura") as HTMLInputElement;
        let selekt: HTMLSelectElement = document.getElementById("test") as HTMLSelectElement;
        
        //pogledaju klasu koliko prima konstruktor parametara
        // ako je nesto broj, moras NAGLASITI DA JE BR SA VALUE
        let p: Pacijent = new Pacijent(Number(id), ime.value, prezime.value, Number(temp.value), selekt.value);
        aktivnaBolnica.dodajPacijenta(p);
        aktivnaBolnica.refreshHTML();
    });
    //TODO "Procentualno obolelih"

    document.getElementById("procenat").addEventListener("click", () => {
      
        let div = document.getElementById("podaci");
          div.innerHTML = `<h2>Procenutalan broj obolelih u bolnici ${aktivnaBolnica.naziv} je ${aktivnaBolnica.procentualnoObolelih().toFixed(2)}%<h2>`;       
      });

    //TODO "Procentualno obolelih koji nemaju simptome"

    document.getElementById("bezSimptoma").addEventListener("click", () => {

        oboleliBezSimptoma();  

    });

    //TODO "Grad sa najvise pozitivnih"

    document.getElementById("gradPozitivni").addEventListener("click", () => {

        let div = document.getElementById("podaci");
    
        let sviGradovi = [];
        for (let i = 0; i < bolnice.length; i++) {
            let bolnica = bolnice[i];
            sviGradovi.push(bolnica.grad);
        }

        let gradBezPonavljanja = sviGradovi.filter(function (el, i, arr) {
            return arr.indexOf(el) == i;
        })

        let sviPoz = [];

        for (let i = 0; i < gradBezPonavljanja.length; i++) {
            let jedanGrad = gradBezPonavljanja[i];
            let sviPozJedanGrad = 0;

            for (let i = 0; i < bolnice.length; i++) {
                let jednaBolnica = bolnice[i];

                if (jednaBolnica.grad == jedanGrad) {
                    for (let i = 0; i < jednaBolnica.pacijenti.length; i++) {
                        let pacijent = jednaBolnica.pacijenti[i];
                        if (pacijent.pcrTest == "Pozitivan") {
                            sviPozJedanGrad++;
                        }
                    }
                }
               
            }
           sviPoz.push(sviPozJedanGrad);

        }
        let najveci = sviPoz[0];
        let indeks: number;
        for (let i = 0; i < sviPoz.length; i++) {
            if (najveci < sviPoz[i]) {
                najveci = sviPoz[i];
                indeks = i;
            }
        }
        let gradNajvisePozitivnih = gradBezPonavljanja[indeks];

        div.innerHTML = "Grad sa najvise pozitivnih je ljudi " + gradNajvisePozitivnih;
    });
}


function oboleliBezSimptoma(): void {
    let ukupan_broj_pozitivnih_bez_simptoma: Pacijent[] = []; 
    for (let i = 0; i < bolnice.length; i++) {
        //prva, druga, treca bolnica.....
        for (let j = 0; j < bolnice[i].pacijenti.length; j++) {      
            if (bolnice[i].pacijenti[j].ostaliSimptomi.length == 0 && bolnice[i].pacijenti[j].pcrTest == "Pozitivan") {
                ukupan_broj_pozitivnih_bez_simptoma.push(bolnice[i].pacijenti[j]);
            }             
        }
        
    }
    let ukupan_broj_pozitivnih: Pacijent[] = [];
    for (let i = 0; i < bolnice.length; i++) {
        //prva, druga, treca bolnica.....
        for (let j = 0; j < bolnice[i].pacijenti.length; j++) {      
            if (bolnice[i].pacijenti[j].pcrTest == "Pozitivan") {
               ukupan_broj_pozitivnih.push(bolnice[i].pacijenti[j]);
            }             
        }
        
    }
    let rezultat = (ukupan_broj_pozitivnih_bez_simptoma.length / ukupan_broj_pozitivnih.length) * 100;	
    
    let div: HTMLDivElement=  document.getElementById("podaci") as HTMLDivElement;
    div.innerHTML = 
    `<h2>Procenutalan broj obolelih koji nemaju simptome je: ${rezultat.toFixed(2)}% </h2>`;
    
}


window.onload = () => {
    //KOD TESTIRATI OVDE




    //^^^^^^^^^^^^^^^^^^
    //Po potrebi zakomentarisati initializeData();
    initializeData();
    wireEvents();
}

function initializeData() {
    let bol = (window as any).bol;
    let selekt = document.getElementById("bolnica") as HTMLSelectElement;
    for (let i = 0; i < bol.length; i++) {
        let naziv = bol[i].naziv;
        let grad = bol[i].grad;
        let pacijenti: Pacijent[] = [];
        for (let j = 0; j < bol[i].pacijenti.length; j++) {
            let id = Number(bol[i].pacijenti[j].id);
            let ime = bol[i].pacijenti[j].ime;
            let prezime = bol[i].pacijenti[j].prezime;
            let temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            let pcrTest = bol[i].pacijenti[j].pcrTest;
            let simptomi: Simptom[] = [];

            for (let k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                let s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }

            let p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        let b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        let option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}