const createTokensArray = tokenCoords => {
    return tokenCoords.map(coord => ({
        colNumber: coord[0],
        position: coord[1]
    }))
};

export default (tokensInPlay, players) => {
    let winner;

    tokensInPlay.forEach((column, colNumber) => {
        // check columns
        // only check bottom four starting spaces as position 3 only has 2 spaces above it
        for (let i = 0; i < 3; i++) {
            const colour = column[i];
            if (colour && colour === column[i+1] && colour === column[i+2] && colour === column[i+3]) {
                winner = {
                    colour,
                    tokens: createTokensArray([[colNumber, i], [colNumber,i+1], [colNumber, i+2], [colNumber, i+3]])
                };
            }
        }

        // only check left four columns as starting positions
        if (!winner && colNumber < 4) {
            column.forEach((colour, position) => {
                //check rows
                if (colour && colour === tokensInPlay[colNumber+1][position] && colour === tokensInPlay[colNumber+2][position] && colour === tokensInPlay[colNumber+3][position]) {
                    winner = {
                        colour,
                        tokens: createTokensArray([[colNumber, position], [colNumber+1,position], [colNumber+2, position], [colNumber+3, position]])
                    };
                }

                // check diagonals going up and right
                if (!winner && position < 3) {
                    if (colour && colour === tokensInPlay[colNumber + 1][position + 1] && colour === tokensInPlay[colNumber + 2][position + 2] && colour === tokensInPlay[colNumber + 3][position + 3]) {
                        winner = {
                            colour,
                            tokens: createTokensArray([[colNumber, position], [colNumber+1, position+1], [colNumber+2, position+2], [colNumber+3, position+3]])
                        };
                    }
                }

                // check diagonals going down and right
                if (!winner && position > 2) {
                    if (colour && colour === tokensInPlay[colNumber + 1][position - 1] && colour === tokensInPlay[colNumber + 2][position - 2] && colour === tokensInPlay[colNumber + 3][position - 3]) {
                        winner = {
                            colour,
                            tokens: createTokensArray([[colNumber, position], [colNumber+1, position-1], [colNumber+2, position-2], [colNumber+3, position-3]])
                        };
                    }
                }
            });
        }
    });

    return winner ? winner : {
        colour: ''   
    };
}