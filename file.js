class Knight {
	constructor(boardSize = [8, 8]) {
		this.boardSize = boardSize;
	}
	checkIfMoveIsInsideBoard(coord) {
		if (
			(coord[0] < this.boardSize[0]) &
			(coord[1] < this.boardSize[1]) &
			(coord[0] >= 0) &
			(coord[1] >= 0)
		) {
			return true;
		} else {
			return false;
		}
	}
	compareTwoCoords(coord1, coord2) {
		if ((coord1[0] === coord2[0]) & (coord1[1] === coord2[1])) {
			return true;
		} else {
			return false;
		}
	}
	allPossibleMoves(coord = [0, 0]) {
		if (!this.checkIfMoveIsInsideBoard(coord)) return;
		let array = [];
		array.push([coord[0] + 2, coord[1] + 1]);
		array.push([coord[0] + 2, coord[1] - 1]);
		array.push([coord[0] - 2, coord[1] + 1]);
		array.push([coord[0] - 2, coord[1] - 1]);
		array.push([coord[0] + 1, coord[1] + 2]);
		array.push([coord[0] + 1, coord[1] - 2]);
		array.push([coord[0] - 1, coord[1] + 2]);
		array.push([coord[0] - 1, coord[1] - 2]);
		return array.filter((coord) => this.checkIfMoveIsInsideBoard(coord));
	}
	checkIfCoordHaveBeenUse(arrayPreviousMoves, possibleMoves) {
		for (let i = 0; i < arrayPreviousMoves.length; i++) {
			for (let j = 0; j < possibleMoves.length; j++) {
				if (
					this.compareTwoCoords(
						arrayPreviousMoves[i],
						possibleMoves[j]
					)
				) {
					possibleMoves.splice(j, 1);
				}
			}
		}
		return possibleMoves;
	}
	move(coord = [0, 0]) {
		if (!this.checkIfMoveIsInsideBoard(coord)) return;

		let actualPosition = coord;
		let nextMove = [];
		let arrayPreviousMoves = [];
		arrayPreviousMoves.push(coord);
		for (let index = 0; index < 20; index++) {
			nextMove = this.checkIfCoordHaveBeenUse(
				arrayPreviousMoves,
				this.allPossibleMoves(actualPosition)
			)[0];
			arrayPreviousMoves.push(nextMove);
			actualPosition = nextMove;
		}
		console.table(arrayPreviousMoves);
	}

	move2(
		coord = [0, 0],
		targetCoord,
		array = [coord],
		allPathsArray = [coord],
		i = 0
	) {
		if (!this.checkIfMoveIsInsideBoard(coord)) return;
		if (this.compareTwoCoords(array[0], targetCoord)) {
			if (this.compareTwoCoords(array[0], targetCoord)) {
				console.table(allPathsArray);
			}

			return allPathsArray;
		} else {
			array = array.concat(
				this.checkIfCoordHaveBeenUse(
					allPathsArray,
					this.allPossibleMoves(array[0])
				)
			);
			allPathsArray = allPathsArray.concat(
				this.checkIfCoordHaveBeenUse(
					allPathsArray,
					this.allPossibleMoves(array[0])
				)
			);

			array.shift();
			this.move2(array[0], targetCoord, array, allPathsArray, (i = +1));

			return allPathsArray;
		}
	}
}

const knight = new Knight();
console.log(knight.checkIfMoveIsInsideBoard([3, 3]));
console.log(knight.checkIfMoveIsInsideBoard([7, 0]));
console.log(knight.checkIfMoveIsInsideBoard([7, 1]));
console.log(knight.checkIfMoveIsInsideBoard([8, 0]));
console.log(knight.checkIfMoveIsInsideBoard([9, 9]));
console.log(knight.checkIfMoveIsInsideBoard([-1, 5]));
console.table(knight.allPossibleMoves([7, 7]));
//knight.move([3, 3]);
console.table(knight.move2([3, 3], [0, 0]));
