import React, { useEffect, useState } from 'react';
import "./TicTacToe.css";

function TicTacToe() {

    const [player, setPlayer] = useState("X");
    const [cells, setCells] = useState(Array(9).fill(""));
    const [winner, setWinner] = useState();
    let [click, setClick] = useState(true);

    //Winning condition.

    const checkWinner = ( squares ) => {
        let winningCombos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        };

        for( let combos in winningCombos ) {
            
            winningCombos[combos].forEach( item => {

                if( squares[item[0]] === '' || squares[item[1]] === '' || squares[item[2]] === '' ) {
                    //Do nothing
                }
                else if( 
                    squares[item[0]] === squares[item[1]] &&
                    squares[item[1]] === squares[item[2]]
                ) {
                    setWinner(squares[item[0]]);
                    setClick(false);
                }
            })
        }
    }


    const handlePlayer = ( index ) => {

        if( cells[index] !== "" ) {
            return;
        }

        let squares = [...cells];

        if( player === "X" ) {
            squares[index] = "X";
            setPlayer("O");
        } 
        else {
            squares[index] = "O";
            setPlayer("X");  
        }

        checkWinner(squares);
        setCells(squares);
    }

    const handleReset = () => {
        setCells(Array(9).fill(""));
        setWinner("");
        setClick(true);
    }

    const Cell = ( { index } ) => {

        return <td onClick={ () => click ? handlePlayer( index ) : ""}> {cells[index]} </td>
    }


    return (
        <div className='container'>
            Turn: {player}
            <table>
                <tbody>
                    <tr>
                        <Cell index={0} />
                        <Cell index={1} />
                        <Cell index={2} />
                    </tr>
                    <tr>
                        <Cell index={3} />
                        <Cell index={4} />
                        <Cell index={5} />
                    </tr>
                    <tr>
                        <Cell index={6} />
                        <Cell index={7} />
                        <Cell index={8} />
                    </tr>
                </tbody>
            </table>
            { winner && (
                <div className='btnContainer'>
                <p> {winner} is the winner! </p>
                <button onClick={handleReset}>Reset game</button>
                </div>
            )}
        </div>
    );
}

export default TicTacToe;