/// <reference path="Pacijent.ts" />


class Bolnica {

    private _naziv: string;
    private _grad: string;
    private _pacijenti: Pacijent[];

    constructor(naziv: string, grad: string) {
        this._naziv = naziv;
        this._grad = grad;
        //novi niz pacijenata
        this._pacijenti = [];
    }


    /**
     * Getter naziv
     * @return {string}
     */
    public get naziv(): string {
        return this._naziv;
    }

    /**
     * Getter grad
     * @return {string}
     */
    public get grad(): string {
        return this._grad;
    }

    /**
     * Getter pacijenti
     * @return {Pacijent[]}
     */
    public get pacijenti(): Pacijent[] {
        return this._pacijenti;
    }

    /**
     * Setter naziv
     * @param {string} value
     */
    public set naziv(value: string) {
        this._naziv = value;
    }

    /**
     * Setter grad
     * @param {string} value
     */
    public set grad(value: string) {
        this._grad = value;
    }

    /**
     * Setter pacijenti
     * @param {Pacijent[]} value
     */
    public set pacijenti(value: Pacijent[]) {
        this._pacijenti = value;
    }


    // metoda dodaj Pacijenta u bolnicu
    //treba da gurne pacijenta u niz pacijenata u bolnici
    //Nakon dodavanja, osveziti html stranicu
    dodajPacijenta(value: Pacijent): void {
        this._pacijenti.push(value);
        //pozvati refresh opet da osvezi html!
        this.refreshHTML();
    }


    
    procentualnoObolelih(): number {
        let broj_obolelih = this.pacijenti.filter((el) => el.pcrTest == "Pozitivan");
        return (broj_obolelih.length / aktivnaBolnica.pacijenti.length) * 100;
    };
    
   
    refreshHTML(): void {

        let table: HTMLTableElement= document.getElementById("tbody") as HTMLTableElement;
        let output = "";


        for (let i = 0; i < aktivnaBolnica.pacijenti.length; i++) {
           
            let pacijent = aktivnaBolnica.pacijenti[i];
            
            let list = "";
             pacijent.ostaliSimptomi.forEach(elem => {
                list +=   `<li>${elem.naziv}</li>`;
            });

            
            output += `<tr> <td>${pacijent.id}</td> <td>${pacijent.ime}</td> 
            <td>${pacijent.prezime}</td> <td>${pacijent.telesnaTemperatura}</td> 
            <td>${pacijent.pcrTest}</td> <td><ul>${list}</ul></td> </tr>`;
        

        }

        table.innerHTML = output; 
    }
    

 }


