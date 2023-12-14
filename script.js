precedente = "";
punti = [];
forme = [0, 0, 0];
punteggio = 0;

function generaTabella() {
    riempiVettore();

    br = document.createElement("br");
    h2 = document.createElement("h2");
    h2.id = "h2";
    h2.innerHTML = "Punteggio: 0";
    document.body.append(h2);

    for (x=0; x<9; x+=3) {
        span = document.createElement("span");
        for (y=0; y<3; y++) {
            tabella = document.createElement("table");
            tabella.id = x;
            for (i=0; i<3; i++) {
                tr = document.createElement("tr");
                for (j=0; j<3; j++) {
                    td = document.createElement("td");
                    td.id = "t" + (x+y) + (j + i*3);
                    
                    tr.append(td);
                }
                tabella.append(tr);
            }
            span.append(tabella);
        }
        document.body.append(span);
        document.body.append("")
    }

    document.body.append(br);
    numeri = [];
    for (i=0; i<3; i++) {
        do {
            var num = Math.floor(Math.random()*4)+1;
        } while (numeri.includes(num));

        img = document.createElement("img");
        img.setAttribute("onclick", "attivazione("+i+")");
        img.src = "img/b" + (num) + ".png";
        img.id = "i" + i;

        numeri.push(num);
        
        document.body.append(img);
    }
}

function attivazione(y) {
    for (i=0; i<9; i++) {
        for (j=0; j<9; j++) {
            //alert("t" + i + j);
            document.getElementById("t" + i + j).setAttribute("onmouseover", "colora(\"t"+ i + j +"\", "+y+")");
            document.getElementById("t" + i + j).setAttribute("onclick", "piazza(\"t"+ i + j +"\", "+y+")");
        }
    }
}

function disattivazione() {
    for (i=0; i<9; i++) {
        for (j=0; j<9; j++) {
            //alert("t" + i + j);
            document.getElementById("t" + i + j).setAttribute("onmouseover", "");
            document.getElementById("t" + i + j).setAttribute("onclick", "");
        }
    }
}

function colora(x, y) {
    vet = punti[x.charAt(1)];

    if (precedente) {
        temp = precedente.split(" ");

        for(i=0; i<temp.length; i++) {
            document.getElementById(temp[i]).style = "background-color: aliceblue";
        }
    }
        

    tipoForma = document.getElementById("i" + y).src.split("/");
    tipoForma = tipoForma[tipoForma.length-1].charAt(1);
    switch(tipoForma) {
        case "1":
            document.getElementById(x).style = "background-color: #98c9f4";
            if (vet[x.charAt(2)] == 1) {
                precedente = "";
            } else {
                precedente = x;
            }
            break;
        case "2":
            //temp = trasformaVet();
            //alert(temp);
            if (x.charAt(1) > 2 || x.charAt(2) > 2) {
                temp = "";
                if (x.charAt(2) > 2)
                    temp = "t" + x.charAt(1) + (x.charAt(2)-3);
                else temp = "t" + (x.charAt(1)-3) + (6 + parseInt(x.charAt(2)));
                
                vet2 = punti[temp.charAt(1)];
                if (vet[x.charAt(2)] == 1 || vet2[temp.charAt(2)] == 1) {
                    precedente = "";
                } else {
                    document.getElementById(x).style = "background-color: #98c9f4";
                    document.getElementById(temp).style = "background-color: #98c9f4";
                    precedente = x + " " + temp;
                }
            } else precedente = "";
            break;
        case "3":
            if (x.charAt(1) % 3 != 2 || x.charAt(2) % 3 != 2) {
                temp = "";
                if (x.charAt(2) % 3 != 2)
                    temp = "t" + x.charAt(1) + (parseInt(x.charAt(2))+1);
                else temp = "t" + (parseInt(x.charAt(1))+1) + (parseInt(x.charAt(2))-2);
                
                vet2 = punti[temp.charAt(1)];
                if (vet[x.charAt(2)] == 1 || vet2[temp.charAt(2)] == 1) {
                    precedente = "";
                } else {
                    document.getElementById(x).style = "background-color: #98c9f4";
                    document.getElementById(temp).style = "background-color: #98c9f4";
                    precedente = x + " " + temp;
                }

            } else precedente = "";
            break;
        case "4":
            if (x.charAt(1) > 2 || x.charAt(2) > 5) {
                temp = [];

                if (x.charAt(2) > 2)
                    temp.push("t" + x.charAt(1) + (x.charAt(2)-3));
                else temp.push("t" + (x.charAt(1)-3) + (6 + parseInt(x.charAt(2))));
                
                if (x.charAt(2) > 5)
                    temp.push("t" + x.charAt(1) + (x.charAt(2)-6));
                else temp.push("t" + (x.charAt(1)-3) + (3 + parseInt(x.charAt(2))));
                
                vet2 = punti[temp[0].charAt(1)];
                vet3 = punti[temp[1].charAt(1)];
                if (vet[x.charAt(2)] == 1 || vet2[temp[0].charAt(2)] == 1 || vet3[temp[1].charAt(2)] == 1) {
                    precedente = "";
                } else {
                    document.getElementById(x).style = "background-color: #98c9f4";
                    document.getElementById(temp[0]).style = "background-color: #98c9f4";
                    document.getElementById(temp[1]).style = "background-color: #98c9f4";
                    precedente = x + " " + temp[0] + " " + temp[1];
                }
            } else precedente = "";
            break;
        default:
            alert("non implementato");
            break;
    }
    
}

function trasformaVet() {
    vet = [];
    for (i=0; i<9; i+=3) {
        temp = 0;
        for (q=0; q<3; q++) {
            for (j=0; j<3; j++) {
                for (z=0; z<3; z++) {
                    vet.push(punti[i+j][temp+z]);
                }
            }
        temp+=3;
        }
    }
    return vet;
}

function piazza(x, y) {
    tipoForma = document.getElementById("i" + y).src.split("/");
    tipoForma = tipoForma[tipoForma.length-1].charAt(1);

    temp = [];
    if (tipoForma == 2) {
        if (x.charAt(2) > 2)
            temp.push("t" + x.charAt(1) + (x.charAt(2)-3));
        else temp.push("t" + (x.charAt(1)-3) + (6 + parseInt(x.charAt(2))));
    } else if (tipoForma == 3) {
        if (x.charAt(2) % 3 != 2)
            temp.push("t" + x.charAt(1) + (parseInt(x.charAt(2))+1));
        else temp.push("t" + (x.charAt(1) % 3 != 2 ? parseInt(x.charAt(1))+1 : null) + (parseInt(x.charAt(2))-2));
    } else if (tipoForma == 4) {
        if (x.charAt(1) > 2 || x.charAt(2) > 5) {
            if (x.charAt(2) > 2)
                temp.push("t" + x.charAt(1) + (x.charAt(2)-3));
            else temp.push("t" + (x.charAt(1)-3) + (6 + parseInt(x.charAt(2))));
                    
            if (x.charAt(2) > 5)
                temp.push("t" + x.charAt(1) + (x.charAt(2)-6));
            else temp.push("t" + (x.charAt(1)-3) + (3 + parseInt(x.charAt(2))));
        } else temp.push("tnull");
    }
    
    if (temp.length > 0)
        vet2 = punti[temp[0].charAt(1)];
    if (temp.length > 1)
        vet3 = punti[temp[1].charAt(1)];
    
    if (vet[x.charAt(2)] == 0 && (temp.length > 0 ? vet2[temp[0].charAt(2)] == 0 : true) && (temp.length > 1 ? vet3[temp[1].charAt(2)] == 0 : true)) {
        vet[x.charAt(2)] = 1;
        
        if (temp.length > 0)
            vet2[temp[0].charAt(2)] = 1; 
        if (temp.length > 1)
            vet3[temp[1].charAt(2)] = 1;

        precedente = "";
        document.getElementById("i" + y).src = "img/d"+(y+1)+".png";
        document.getElementById("i" + y).setAttribute("onclick", "");
        document.getElementById("i" + y).style = "cursor : auto;";
        
        forme[y] = 1;

        disattivazione();
        controllaFormeDisponibili();
        controllaVittoria();
    }
}

function riempiVettore() {
    for (i=0; i<9; i++) {
        vet = [];
        for (j=0; j<9; j++) {
            vet.push(0);
        }
        punti.push(vet);
    }
}

function controllaVittoria() {
    cancellazioni = [];

    for (i=0; i<9; i++) {
        contatore = 0;
        vet = punti[i];
        for (j=0; j<9; j++)
            if (vet[j] == 1)
                contatore++;
        if (contatore == 9)
            cancellazioni.push("b" + i);
    }

    for (i=0; i<9; i+=3) {
        temp = 0;
        for (q=0; q<3; q++) {
            contatore = 0;
            for (j=0; j<3; j++) {
                for (z=0; z<3; z++) {
                    punti[i+j][temp+z] == 1 ? contatore++ : "";
                }
            }
            if (contatore == 9)
                cancellazioni.push("o" + (i + q))
            temp+=3;
        }
    }

    for (i=0; i<3; i++) {
        for (q=0; q<3; q++) {
            contatore = 0;
            for (j=0; j<9; j+=3) {
                for (z=0; z<9; z+=3) {
                    punti[i+j][z+q] == 1 ? contatore++ : "";
                }
            }
            if (contatore == 9) 
                cancellazioni.push("v" + (i*3 + q))
        }
    }
    
    for (let i=0; i<cancellazioni.length; i++) {
        tipo = cancellazioni[i].charAt(0);
        switch(tipo) {
            case "b":
                cancella(cancellazioni[i].charAt(1));
                break;
            case "o":
                cancellaRigaOrizzontale(cancellazioni[i].charAt(1));
                break;
            case "v":
                cancellaRigaVerticale(cancellazioni[i].charAt(1));
                break;
            default:
                alert("errore");
        }
    }

    //prendi più punti in case alla combo
    punteggio+=parseInt(9*cancellazioni.length*(1 + parseFloat(cancellazioni.length/10)));
    document.getElementById("h2").innerHTML = "Punteggio: " + punteggio;
}

function controllaFormeDisponibili() {
    finite = true;
    for (i=0; i<3; i++) {
        if (forme[i] == 0)
            finite = false;
    }

    if (finite)
        rifornisciForme();
}

function rifornisciForme() {
    numeri = [];
    for (i=0; i<3; i++) {
        do {
            var num = Math.floor(Math.random()*4)+1;
        } while (numeri.includes(num));

        img = document.getElementById("i" + i);
        img.setAttribute("onclick", "attivazione("+i+")");
        img.src = "img/b" + (num) + ".png";
        img.style = "cursor:pointer";
        forme[i] = 0;

        numeri.push(num);
        
        document.body.append(img);
    }
}

function cancella(x) {
    vet = punti[x];
    for (i=0; i<9; i++) {
        vet[i] = 0;
        document.getElementById("t" + x + i).style = "background-color: aliceblue";
    }
}

function cancellaRigaOrizzontale(x) {
    for (i=0; i<9; i+=3) {
        temp = 0;
        for (q=0; q<3; q++) {
            //val = 0;
            //x == q + i ? val++ : val = 0; 
            if (i + q == x) {
                for (j=0; j<3; j++) {
                    for (z=0; z<3; z++) {
                        punti[i+j][temp+z] = 0;
                        document.getElementById("t" + (i+j) + (temp+z)).style = "background-color: aliceblue;";
                    }
                }
            }
            temp+=3;
        }
    }
} 

function cancellaRigaVerticale(x) {
    for (i=0; i<3; i++) {
        for (q=0; q<3; q++) {
            if (i*3 + q == x) {
                for (j=0; j<9; j+=3) {
                    for (z=0; z<9; z+=3) {
                        punti[i+j][z+q] = 0;
                        document.getElementById("t" + (i+j) + (z+q)).style = "background-color: aliceblue;";
                    }
                }
            }
        }
    }
} 