var Simptom = /** @class */ (function () {
    function Simptom(naziv) {
        this.naziv = naziv;
    }
    return Simptom;
}());
/// <reference path="Simptom.ts" />
var Pacijent = /** @class */ (function () {
    function Pacijent(id, ime, prezime, telesnaTemperatura, pcrTest) {
        //posto je Bolnica super class , ne zaboravi da dodas u parametar
        //atribute glavne klase!! zatim pozoves 
        //super(naziv, grad);
        //konstruktor glavne klase prima dva parametra
        this._id = id;
        this._ime = ime;
        this._prezime = prezime;
        this._telesnaTemperatura = telesnaTemperatura;
        this._pcrTest = pcrTest;
        this._ostaliSimptomi = [];
    }
    Object.defineProperty(Pacijent.prototype, "id", {
        /**
         * Getter id
         * @return {number}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {number} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ime", {
        /**
         * Getter ime
         * @return {string}
         */
        get: function () {
            return this._ime;
        },
        /**
         * Setter ime
         * @param {string} value
         */
        set: function (value) {
            this._ime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "prezime", {
        /**
         * Getter prezime
         * @return {string}
         */
        get: function () {
            return this._prezime;
        },
        /**
         * Setter prezime
         * @param {string} value
         */
        set: function (value) {
            this._prezime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "telesnaTemperatura", {
        /**
         * Getter telesnaTemperatura
         * @return {number}
         */
        get: function () {
            return this._telesnaTemperatura;
        },
        /**
         * Setter telesnaTemperatura
         * @param {number} value
         */
        set: function (value) {
            this._telesnaTemperatura = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "pcrTest", {
        /**
         * Getter pcrTest
         * @return {string}
         */
        get: function () {
            return this._pcrTest;
        },
        /**
         * Setter pcrTest
         * @param {string} value
         */
        set: function (value) {
            this._pcrTest = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ostaliSimptomi", {
        /**
         * Getter ostaliSimptomi
         * @return {Simptom[]}
         */
        get: function () {
            return this._ostaliSimptomi;
        },
        /**
         * Setter ostaliSimptomi
         * @param {Simptom[]} value
         */
        set: function (value) {
            this._ostaliSimptomi = value;
        },
        enumerable: false,
        configurable: true
    });
    // metoda dodajSimptom pacijentu -- zato sto u Pacijentu imamo niz simptoma.
    Pacijent.prototype.dodajSimptom = function (value) {
        //kad se klikne na dodaj simptom na ts.html-u, treba da se simptom gurne u niz simptoma nekog pacijenta
        this._ostaliSimptomi.push(value);
    };
    return Pacijent;
}());
/// <reference path="Pacijent.ts" />
var Bolnica = /** @class */ (function () {
    function Bolnica(naziv, grad) {
        this._naziv = naziv;
        this._grad = grad;
        //novi niz pacijenata
        this._pacijenti = [];
    }
    Object.defineProperty(Bolnica.prototype, "naziv", {
        /**
         * Getter naziv
         * @return {string}
         */
        get: function () {
            return this._naziv;
        },
        /**
         * Setter naziv
         * @param {string} value
         */
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "grad", {
        /**
         * Getter grad
         * @return {string}
         */
        get: function () {
            return this._grad;
        },
        /**
         * Setter grad
         * @param {string} value
         */
        set: function (value) {
            this._grad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "pacijenti", {
        /**
         * Getter pacijenti
         * @return {Pacijent[]}
         */
        get: function () {
            return this._pacijenti;
        },
        /**
         * Setter pacijenti
         * @param {Pacijent[]} value
         */
        set: function (value) {
            this._pacijenti = value;
        },
        enumerable: false,
        configurable: true
    });
    // metoda dodaj Pacijenta u bolnicu
    //treba da gurne pacijenta u niz pacijenata u bolnici
    //Nakon dodavanja, osveziti html stranicu
    Bolnica.prototype.dodajPacijenta = function (value) {
        this._pacijenti.push(value);
        //pozvati refresh opet da osvezi html!
        this.refreshHTML();
    };
    /*Arrow function FILTER
     filter((element) => {  } )
     filter((element, index) => {  } )
     filter((element, index, array) => {  } )
     */
    //iskoristiti filter metodu za racunanje
    //formula je (broj_obolelih / ukupno_pacijenta ) * 100
    //getProsek(): number {
    /* return this._pacijenti.reduce((prev, next) => prev + next., 0)
    / (broj_obolelih / ukupno_pacijenta ) * 100;
   }*/
    // vraca nam sa filterom niz pacijenata obolelih
    Bolnica.prototype.procentualnoObolelih = function () {
        var broj_obolelih = this.pacijenti.filter(function (el) { return el.pcrTest == "Pozitivan"; });
        return (broj_obolelih.length / aktivnaBolnica.pacijenti.length) * 100;
    };
    ;
    /* (*Iskoristiti filter u delu implementacije) racuna i vraca procenat obolelih pacijenta po formuli
     (broj_obolelih / ukupno_pacijenta ) * 100*/
    Bolnica.prototype.refreshHTML = function () {
        var table = document.getElementById("tbody");
        var output = "";
        var _loop_1 = function (i) {
            var pacijent = aktivnaBolnica.pacijenti[i];
            var list = "";
            pacijent.ostaliSimptomi.forEach(function (elem) {
                list += "<li>".concat(elem.naziv, "</li>");
            });
            output += "<tr> <td>".concat(pacijent.id, "</td> <td>").concat(pacijent.ime, "</td> \n            <td>").concat(pacijent.prezime, "</td> <td>").concat(pacijent.telesnaTemperatura, "</td> \n            <td>").concat(pacijent.pcrTest, "</td> <td><ul>").concat(list, "</ul></td> </tr>");
        };
        for (var i = 0; i < aktivnaBolnica.pacijenti.length; i++) {
            _loop_1(i);
        }
        table.innerHTML = output;
    };
    return Bolnica;
}());
/// <reference path="Bolnica.ts" />
var bolnice = [];
var aktivnaBolnica = null;
function promeniAktivnu(selekt) {
    aktivnaBolnica = bolnice.filter(function (el) { return el.naziv == selekt.value; })[0];
    aktivnaBolnica.refreshHTML();
}
function wireEvents() {
    // dodaj simptom
    document.getElementById("dodajSimptom").addEventListener("click", function () {
        var id = Number(document.getElementById("ids").value);
        var simptom = document.getElementById("simptom").value;
        var s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(function (el) { return el.id == id; })[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });
    //TODO "Dodaj pacijenta"
    document.getElementById("dodajPacijenta").addEventListener("click", function () {
        var id = aktivnaBolnica.pacijenti.length + 1;
        var ime = document.getElementById("ime");
        var prezime = document.getElementById("prezime");
        var temp = document.getElementById("temperatura");
        var selekt = document.getElementById("test");
        //pogledaju klasu koliko prima konstruktor parametara
        // ako je nesto broj, moras NAGLASITI DA JE BR SA VALUE
        var p = new Pacijent(Number(id), ime.value, prezime.value, Number(temp.value), selekt.value);
        aktivnaBolnica.dodajPacijenta(p);
        aktivnaBolnica.refreshHTML();
    });
    //TODO "Procentualno obolelih"
    document.getElementById("procenat").addEventListener("click", function () {
        var div = document.getElementById("podaci");
        div.innerHTML = "<h2>Procenutalan broj obolelih u bolnici ".concat(aktivnaBolnica.naziv, " je ").concat(aktivnaBolnica.procentualnoObolelih().toFixed(2), "%<h2>");
    });
    //TODO "Procentualno obolelih koji nemaju simptome"
    document.getElementById("bezSimptoma").addEventListener("click", function () {
        oboleliBezSimptoma();
    });
    //TODO "Grad sa najvise pozitivnih"
    document.getElementById("gradPozitivni").addEventListener("click", function () {
        var div = document.getElementById("podaci");
        var sviGradovi = [];
        for (var i = 0; i < bolnice.length; i++) {
            var bolnica = bolnice[i];
            sviGradovi.push(bolnica.grad);
        }
        var gradBezPonavljanja = sviGradovi.filter(function (el, i, arr) {
            return arr.indexOf(el) == i;
        });
        var sviPoz = [];
        for (var i = 0; i < gradBezPonavljanja.length; i++) {
            var jedanGrad = gradBezPonavljanja[i];
            var sviPozJedanGrad = 0;
            for (var i_1 = 0; i_1 < bolnice.length; i_1++) {
                var jednaBolnica = bolnice[i_1];
                if (jednaBolnica.grad == jedanGrad) {
                    for (var i_2 = 0; i_2 < jednaBolnica.pacijenti.length; i_2++) {
                        var pacijent = jednaBolnica.pacijenti[i_2];
                        if (pacijent.pcrTest == "Pozitivan") {
                            sviPozJedanGrad++;
                        }
                    }
                }
            }
            sviPoz.push(sviPozJedanGrad);
        }
        var najveci = sviPoz[0];
        var indeks;
        for (var i = 0; i < sviPoz.length; i++) {
            if (najveci < sviPoz[i]) {
                najveci = sviPoz[i];
                indeks = i;
            }
        }
        var gradNajvisePozitivnih = gradBezPonavljanja[indeks];
        div.innerHTML = "Grad sa najvise pozitivnih je ljudi " + gradNajvisePozitivnih;
    });
}
function oboleliBezSimptoma() {
    var ukupan_broj_pozitivnih_bez_simptoma = [];
    for (var i = 0; i < bolnice.length; i++) {
        //prva, druga, treca bolnica.....
        for (var j = 0; j < bolnice[i].pacijenti.length; j++) {
            if (bolnice[i].pacijenti[j].ostaliSimptomi.length == 0 && bolnice[i].pacijenti[j].pcrTest == "Pozitivan") {
                ukupan_broj_pozitivnih_bez_simptoma.push(bolnice[i].pacijenti[j]);
            }
        }
    }
    var ukupan_broj_pozitivnih = [];
    for (var i = 0; i < bolnice.length; i++) {
        //prva, druga, treca bolnica.....
        for (var j = 0; j < bolnice[i].pacijenti.length; j++) {
            if (bolnice[i].pacijenti[j].pcrTest == "Pozitivan") {
                ukupan_broj_pozitivnih.push(bolnice[i].pacijenti[j]);
            }
        }
    }
    var rezultat = (ukupan_broj_pozitivnih_bez_simptoma.length / ukupan_broj_pozitivnih.length) * 100;
    var div = document.getElementById("podaci");
    div.innerHTML =
        "<h2>Procenutalan broj obolelih koji nemaju simptome je: ".concat(rezultat.toFixed(2), "% </h2>");
}
window.onload = function () {
    //KOD TESTIRATI OVDE
    //^^^^^^^^^^^^^^^^^^
    //Po potrebi zakomentarisati initializeData();
    initializeData();
    wireEvents();
};
function initializeData() {
    var bol = window.bol;
    var selekt = document.getElementById("bolnica");
    for (var i = 0; i < bol.length; i++) {
        var naziv = bol[i].naziv;
        var grad = bol[i].grad;
        var pacijenti = [];
        for (var j = 0; j < bol[i].pacijenti.length; j++) {
            var id = Number(bol[i].pacijenti[j].id);
            var ime = bol[i].pacijenti[j].ime;
            var prezime = bol[i].pacijenti[j].prezime;
            var temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            var pcrTest = bol[i].pacijenti[j].pcrTest;
            var simptomi = [];
            for (var k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                var s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }
            var p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        var b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        var option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}
//# sourceMappingURL=app.js.map