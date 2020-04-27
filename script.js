function toStart() {
    document.getElementById("endPage").style.display = "none";
    document.getElementById("startPage").style.display = "flex";
}
let mode, mark;
function toBoard() {


    if (document.getElementById("singleBtn").checked) {
        mode = "single";

    }
    else if (document.getElementById("multiBtn").checked) {
        mode = "multiplayer";

    }
    else {
        alert("Select single or multi player");
    }

    if (document.getElementById("crossBtn").checked) {
        mark = "cross";

    }
    else if (document.getElementById("circleBtn").checked) {
        mark = "circle";

    }
    else {
        alert("Select cross or cricle!");
    }

    if (mark != null && mode != null)
        document.getElementById("startPage").style.display = "none";
    console.log(mode);
    console.log(mark);

    if (mode === 'multiplayer')
        multiplayer();
}

const winCombi = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function multiplayer() {
    console.log("inside multiplayer function");

    var restartbutton = document.getElementById("restartBtn");
    restartbutton.addEventListener('click', function(){
        cellElements.forEach(cell => {
            cell.classList.remove("circle");
            cell.classList.remove("cross");
            cell.removeEventListener('click', handleClick)
    

        });
    })


    const cellElements = document.querySelectorAll('[data-cell]');
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });

    var winningmessage = document.getElementById("winMessage");

    function handleClick(e) {
        const cell = e.target;
        cell.classList.add(mark);

        if (checkWin(mark)) {
            endgame(false);
        }
        else if (isDraw()) {
            endgame(true);
        }
        else {
            if (mark == "circle")
                mark = "cross";
            else
                mark = "circle";
        }
    }

   function isDraw()
   {
    
        return [...cellElements].every(cell => {
          return cell.classList.contains("cross") || cell.classList.contains("circle")
        })
    
   }

    function endgame(draw) {

        if (draw) {
            winningmessage.innerText = "DRAW!";
        }
        else {
            if (mark == "circle") {
                winningmessage.innerText = "CIRCLE WINS!";
            }
            else {
                winningmessage.innerHTML = "CROSS WINS";
            }
        }

        document.getElementById("endPage").style.display = "flex";

       

    }

    function checkWin(mark) {
        for (var i = 0; i < 9; i++) {

            return ((winCombi.some(combination => {
                return combination.every(index => {
                    return cellElements[index].classList.contains(mark)
                })
            })));

        }

    }
}
