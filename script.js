const resetBtn = document.getElementById("reset");
const startBtn = document.getElementById("start");

const players = ["X","O"]
let currentPlayer = players[0];

const gameBoard = (() => {

    const board = [
        "","","",
        "","","",
        "","",""
        ];

    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];



    const addToken = () => {

        const btns = document.querySelectorAll(".btn-box");
        
        btns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                if (board[index] === "") {
                    
                    board[index] = currentPlayer;
                    
                    btn.textContent = currentPlayer;
                    if(currentPlayer === "X")
                        btn.className = "btn-box x";
                    else 
                        btn.className = "btn-box o";

                    if (checkWin()) {
                        alert("This player won: " + currentPlayer);
                        btns.forEach(b => b.disabled = true);
                        return;
                    }

                    if (checkTie()) {
                        alert("It's a tie!");
                        btns.forEach(b => b.disabled = true);
                        return;
                    }

                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    btn.disabled = true;
                }
            });
        });
    };

    const checkWin = () => {
        for(let i = 0; i < winning.length; i++){
            const[a, b, c] = winning[i];

            if(board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer)
                return true;
        }
        return false;
    };

    const checkTie = () => {

        if(checkWin() === false){
            for(let i = 0; i < board.length; i++){
                if(board[i] === "")
                    return false;
            }
        }
        return true;
    };

    const resetBoard = () => {

        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    };

    return {addToken, checkWin, checkTie, resetBoard};
})();


startBtn.addEventListener("click", () => {
    gameBoard.addToken();
});

resetBtn.addEventListener("click", () =>{
    const btns = document.querySelectorAll(".btn-box");
    btns.forEach(btn => {
        btn.textContent = "";
        btn.className = "btn-box";
        btn.disabled = false;
    });

    gameBoard.resetBoard();
    currentPlayer = players[0];
});