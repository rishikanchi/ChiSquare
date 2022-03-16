function monoCross(paternal, maternal, observedArray){
    var phenoArray = getPhenotype(paternal, maternal); 

    const total = parseInt(observedArray[0]) + parseInt(observedArray[1]);
    console.log(total);
    var expectedArray = [];
    for (let i=0; i<2; i++){
       const expected =  (phenoArray[i]/4)*total;
       expectedArray.push(expected);
    }
    
    var output = 0;
    for (let i=0; i<2; i++){
        output += chiSquareEq(observedArray[i], expectedArray[i]);
    }
    
    return output;
}

function diCross(patTrait1, matTrait1, patTrait2, matTrait2, observedArray){
    const domT1 = parseInt(observedArray[0]) + parseInt(observedArray[1]);
    const recT1 = parseInt(observedArray[2]) + parseInt(observedArray[3]);
    const domT2 = parseInt(observedArray[0]) + parseInt(observedArray[2]);
    const recT2 = parseInt(observedArray[1]) + parseInt(observedArray[3]);

    const trait1square = monoCross(patTrait1, matTrait1, [domT1, recT1]);
    const trait2square = monoCross(patTrait2, matTrait2, [domT2, recT2]);

    return (trait1square + trait2square);
}

function sexCross(paternal, maternal, observedArray){
    var phenoArray = getSexPhenotype(paternal, maternal); 

    const total = parseInt(observedArray[0]) + parseInt(observedArray[1]) + parseInt(observedArray[2]) + parseInt(observedArray[3]);

    var expectedArray = [];
    for (let i=0; i<4; i++){
       const expected = (phenoArray[i]/4)*total;
       expectedArray.push(expected);
    }
    
    var output = 0;
    for (let i=0; i<4; i++){
        output += chiSquareEq(observedArray[i], expectedArray[i]);
    }
    
    return output;
}

function sexCrossTwoTraits(paternal, maternal, paternal1, maternal1, observedArray){
    //observedArray = [maleXDomDom, maleXDomRec, maleXRecDom, maleXRecRec, femXDomDom, femXDomRem, femXRecDom, femXRecRec]
    const sexPheno = getSexPhenotype(paternal, maternal);
    const normalPheno = getPhenotype(paternal1, maternal1);
    
    var total = 0;
    for (let i=0; i<observedArray.length; i++){
        total += parseInt(observedArray[i])
    }
    
    const maleXDom = parseInt(observed[0]) + parseInt(observed[1]);
    const maleXRec = parseInt(observed[2]) + parseInt(observed[3]);
    const femXDom = parseInt(observed[4]) + parseInt(observed[5]);
    const femXRec = parseInt(observed[6]) + parseInt(observed[7]);
    const sexObserved = [maleXDom, maleXRec, femXDom, femXRec];
    
    const sexChi = sexCross(paternal, maternal, observedArray);
    
    const normDom = parseInt(observed[0]) + parseInt(observed[2]) + parseInt(observed[4]) + parseInt(observed[6]);
    const normRec = parseInt(observed[1]) + parseInt(observed[3]) + parseInt(observed[5]) + parseInt(observed[7]);
    const normChi = monoCross(paternal1, maternal1, [normDom, normRec])
    
    return (normChi + sexChi);
    }
}
function getPhenotype(paternal, maternal){
    var curPaternal;
    var curMaternal;
    var dominant = 0;
    var recessive = 0;

    for (let i=0; i<2; i++){
        curPaternal = paternal[i];

        for (let j=0; j<2; j++){
            curMaternal = maternal[j];
            if (curMaternal.toUpperCase() == "D" || curPaternal.toUpperCase() == "D"){
                dominant++;
            }
            else{
                recessive++
            }
        }
    }

    return ([dominant, recessive]);
}

function chiSquareEq(O, E){
    if (O == 0 || E == 0){
        return 0;
    }
    else {
        var output = Math.pow((O - E), 2);
        output /= E;

        return output;
    }
}

function getSexPhenotype(paternal, maternal){
    var curPaternal;
    var curMaternal;
    var maleDom = 0;
    var maleRec = 0;
    var femDom = 0;
    var femRec = 0;

    for (let i=0; i<2; i++){
        curPaternal = paternal[i];

        for (let j=0; j<2; j++){
            curMaternal = maternal[j];
            if (curMaternal.toUpperCase() == "D" || curPaternal.toUpperCase() == "D"){
                if (curMaternal.toUpperCase() == "Y" || curPaternal.toUpperCase() == "Y"){
                    maleDom++;
                }
                else{
                    femDom++;
                }
            }
            else{
                if (curMaternal.toUpperCase() == "Y" || curPaternal.toUpperCase() == "Y"){
                    maleRec++;
                }
                else{
                    femRec++;
                }
            }
        }
    }

    return ([maleDom, maleRec, femDom, femRec]);
}

instructStatus = false;
function instructions(){
    if (instructStatus == false){
        document.getElementById('output').innerHTML = "Make sure to read the <strong>Terms and Conditions</strong> and click the check box before continuing. <strong>Also, be sure to find the cross between the F<sub>1</sub> generation, not the original parents.</strong>"
        document.getElementById('output').innerHTML += "<br><br> <bigText>Key</bigText>||| D = Dominant/X Chromosome Dominant  ||  R = Recessive/X Chromosome Recessive  ||  Y = Y Chromosome"
        document.getElementById('output').innerHTML += "<br><br> <bigText>Monohybrid</bigText>: Write the genotype of both parents using the letters 'D' for dominant trait and 'R' for recessive trait. Then, write the number of observed dominant cases in the dominant box and write the number of observed recessive cases in the recessive box and click calculate.";
        document.getElementById('output').innerHTML += "<br><br> <bigText>Dihybrid</bigText>: Take the first trait as T1 and second trait at T2. Split each parent up into their separate traits (Ex. AaBb -> Aa and Bb). Remember that when you write the genotype of both traits, you use the letters 'D' for dominant trait and 'R' for recessive trait (ex. AA -> DD, aa -> RR). Then put the first trait alleles (ex. Aa -> DR) into the T1 textbox and do the same for the T2 textbox with the other trait (ex Bb -> DR). Then, for the bottom section, you have to put observed phenotype for each of the categories based on which trait is dominant or recessive <em><strong>Don't mess up the order of the traits, otherwise the program will not work.</strong></em> For example, if T1 is eyes and T2 is nose and wild type is dominant for both traits, if you get an observed value as 10 for wild eyes and wild nose, you should write that number in the T1 dominant T2 dominant box because the phenotype (wild type for both T1 and T2) is dominant for both T1 and T2. Then press calculate to get your result."
        document.getElementById('output').innerHTML += "<br><br> <bigText>Sex-Linked</bigText>: Write the genotype of both parents using the letters 'D' for dominant X chromosome, 'R' for recessive X chromosome, and 'Y' for Y chromosome. In the next section, for each category, you will write the observed values you get for a gender and either a dominant or recessive X chromosome (ex DD is female dominant and RY is male recessive). Then press calculate to get your values."
        instructStatus = true;
    }
    else {
        document.getElementById('output').innerHTML = "";
        instructStatus = false;
    }
}
function displayTextBox(){
    var selected = document.getElementById('select').value;
    if (selected == "1"){
        document.getElementById('textBox').innerHTML = "<input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder='Maternal Genotype'> <br><br>Observed <br> Dominant: <input type='text' id='dominant' placeholder='Dominant'> <br>Recessive: <input type='text' id='recessive' placeholder='Recessive'>";
    } 
    else if (selected == '2') {
       document.getElementById('textBox').innerHTML = "Trait 1 (T1): <input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder='Maternal Genotype'><br>Trait 2 (T2): <input type='text' id='box3' placeholder='Paternal Genotype'>x<input type='text' id='box4' placeholder='Maternal Genotype'><br><br> T1 Dominant T2 Dominant: <input type='text' id='domDom' placeholder='Dominant Dominant'><br> T1 Dominant T2 Recessive: <input type='text' id='domRec' placeholder='Dominant Recessive'><br>T1 Recessive T2 Dominant: <input type='text' id='recDom' placeholder='Recessive Dominant'><br>T1 Recessive T2 Recessive: <input type='text' id='recRec' placeholder='Recessive Recessive'>";
    }
    else if (selected == '3'){
        document.getElementById('textBox').innerHTML = "<input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder='Maternal Genotype'><br><br> Male Dominant: <input type='text' id='maleDom' placeholder='Male Dominant'><br> Male Recessive: <input type='text' id='maleRec' placeholder='Male Recessive'><br>Female Dominant: <input type='text' id='femDom' placeholder='Female Dominant'><br>Female Recessive: <input type='text' id='femRec' placeholder='Female Recessive'>";
    }
}

function calcClick(){
    if (document.getElementById('rulesCheckbox').checked){
        const selected = document.getElementById('select').value;
        const paternal = document.getElementById('box1').value; 
        const maternal = document.getElementById('box2').value;

        if (selected == "1"){
            const dominant = document.getElementById('dominant').value;
            const recessive = document.getElementById('recessive').value;
            const observedArray = [dominant, recessive];

            document.getElementById('output').innerHTML = monoCross(paternal, maternal, observedArray);
        }
        else if (selected == "2"){
            const paternal1 = document.getElementById('box3').value;
            const maternal1 = document.getElementById('box4').value;
            const domDom = document.getElementById('domDom').value;
            const domRec = document.getElementById('domRec').value;
            const recDom = document.getElementById('recDom').value;
            const recRec = document.getElementById('recRec').value;
            document.getElementById('output').innerHTML = diCross(paternal, maternal, paternal1, maternal1, [domDom, domRec, recDom, recRec]);  
        }
        else if (selected == "3"){
            const maleDom = document.getElementById('maleDom').value;
            const maleRec = document.getElementById('maleRec').value;
            const femDom = document.getElementById('femDom').value;
            const femRec = document.getElementById('femRec').value;
            document.getElementById('output').innerHTML = sexCross(paternal, maternal, [maleDom, maleRec, femDom, femRec]);  
        }
    }
    else{
        alert('Please accept Terms and Conditions')
    }
}
