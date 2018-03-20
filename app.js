function createTable(){
    size = document.getElementById('currentsize').value;
    size++;
    var elm = document.getElementById("chessboard");
    elm.parentNode.removeChild(elm);
    var table = document.createElement("table");
    table.style.border = "3px solid #000";
    table.setAttribute("id","chessboard");
    for (var i = 1; i < size; i++) {
        var tr = document.createElement('tr');
        for (var j = 1; j < size; j++) {
            var td = document.createElement('td');
            var id1 = i-1;
            var id2 = j-1;
            var rid = id1.toString().concat(id2.toString());
            td.setAttribute("id", rid);
            if (i%2 == j%2) {
                td.className = "white";
            } else {
                td.className = "black";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
    letMagicHappens(size-1);
    
}


function letMagicHappens(n){
    var solution = solveNQueen(n);
    document.getElementById("solutioncount").value = solution.length;
    //*/
    var randint = Math.floor(Math.random() * (solution.length-1));
    var showedSolution = solution[randint];
   
    for (var x = 0 ; x<showedSolution.length;x++){
        placeQueen(showedSolution[x][0],showedSolution[x][1]);
    }
    //*/
   
}

function placeQueen(x,y){
    var stringid = x.toString().concat(y.toString());
    document.getElementById(stringid).innerHTML = "&#9813";
}

function delQueen(x,y){
    var stringid = x.toString().concat(y.toString());
    document.getElementById(stringid).innerHTML = " ";
}



function underAttack(q1, q2){
    //check if horziontally under attack
    if(q1[0]==q2[0]){
        return true;
    }
    //check if vertically under attack
    else if(q1[1]==q2[1]){
        return true;
    }
    else if(q1[0]-q1[1] == q2[0]-q2[1]){
        return true;
    }
    else if(q1[0]+q1[1] == q2[0]+q2[1]){
        return true;
    }
    return false;
}



function step(row,currentColumn,queens,n){
    if(queens.length==0){
        return currentColumn;
    } 
    for(var column = currentColumn;column<n;column++){
        for(var i = 0;i<queens.length;i++){
            if(underAttack(queens[i],[row,column])){
                break;
            } else if (i==(queens.length-1)){
                return column;
            } 
        }
    }
    return -1;
}

function solveNQueen(n){
    var solved = false;
    var queens = [];
    var currentColumn = 0;
    var solution = [];
    var firstSolution = false
    //queens.push([0,0]);
    do{
        var row = queens.length;
        var tempQueen = [row,step(row,currentColumn,queens,n)];
        if((tempQueen[1] >= n && row == 0) || (row >=n && tempQueen[1]>=n)){
            break;
        }
        if(tempQueen[1]!=-1){            
            queens.push(tempQueen);
            
            currentColumn = 0;
            if(row == n-1){
                solution.push(queens.slice(0));      
                currentColumn = queens[queens.length-1][1];
                currentColumn++;
                queens.pop();
            }
        } else {
            currentColumn = queens[queens.length-1][1];
            currentColumn++;
            queens.pop();
        }
    }while(!solved);
    return solution;
}



