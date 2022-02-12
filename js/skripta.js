var boje = {
	cekiran: "Crimson",
	necekiran: "Teal"
};

function proveraForme(form) {

	if (form.ime.value.trim() == "" || form.ime.value[0].toUpperCase() != form.ime.value[0]) {
		alertFunction();
		form.ime.focus();
		return false;
	}

	if (form.prezime.value.trim() == "" || form.prezime.value[0].toUpperCase() != form.prezime.value[0]) {
		alertFunction();
		form.ime.focus();
		return false;
	}


	return true;

}


function sel1Cheked(param) {
	//pokupiti oba selekta da radimo s njima
	//posto sam odabrala funkciju nad sel 1
	//u if proveri poredi sa tim selektom
	var sel2 =document.getElementById("sel2");
	var checkbox1 = document.getElementById("cb1");
	var submit = document.getElementById("submitbtn");

	//ako je sel 1, izabrana vrednost 2 nevidljiv meni 
	if (param.value == 2) {
		//ili true ako je enabled
		sel2.disabled = false;// taj nevidljiv meni prikazi 
		sel2.style.visibility = "visible";
		// napredno, ako je vrednost skrivenog selecta 30, kad se vrati na pravi select 1 value
		//bez popusta da disable checkbox i sakrije skriveni meni
	} else if (param.value == 1 && sel2.value == 30) {
		checkbox1.disabled = true;
		sel2.disabled = true;
		sel2.style.visibility = "hidden";
		submit.style.background = "white";
		document.getElementsByTagName("span")[0].style.visibility = "hidden";
		
	} else {
		//ili false ako je enabled
		sel2.disabled = true;
		checkbox1.disabled = true;
		sel2.style.visibility = "hidden";

		
	}
	
}

function ispisi() {
	var sel2 = document.getElementById("sel2");	
	var paragraf = document.getElementById("select_paragraf");
	var span = paragraf.getElementsByTagName("span")[0];
	//var checkbox = document.getElementById("cb1");

	
	if (sel2.value == 10) {
		span.innerHTML = " 10% popusta.";
	}
	else if (sel2.value == 20) {
		span.innerHTML = " 20% popusta.";
	} else if (sel2.value == 30) {
		span.innerHTML = " 30% popusta.";
		
	}

	premium1();
}

function premium1() {
	// Prilikom promene vrednosti selecta u zadatku se trazi
	// da se promeni i boja dugmeta
	var checkbox1 = document.getElementById("cb1");
	var select = document.getElementById("sel2");
	var submit = document.getElementById("submitbtn");
	// a cekiran je samo ako je izabrana vrednost 30!
	if (checkbox1.checked) {
		//bice cekiran samo kad je sel2 30 !
		submit.style.backgroundColor = boje.cekiran;
	}
	else {
		// ako checkbox nije cekiran, disable checkbox i promeni dugme boju 
		if (select.value == 10) {
			submit.style.backgroundColor = "white";
		} else if (select.value == 20) {
			submit.style.backgroundColor = "white";
		}
			// ako je izabrana vrednost u sel2 30 , otvori checkbox!!!
			//promeni boju pozadine dugmeta.
			else if (select.value = 30) {
			checkbox1.disabled = false;
			submit.style.backgroundColor = boje.necekiran;
			
		}
	}	

	}
