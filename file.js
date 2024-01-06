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

	moveToTarget(
		coord = [0, 0],
		targetCoord,
		array = [coord],
		allPathsArray = [coord],
		path = [coord],
		rightPath = 0
	) {
		if (this.compareTwoCoords(array[0], targetCoord)) {
			let message = "";
			console.log(
				"You make it in " +
					rightPath.length / 2 +
					" moves, here is your path:"
			);
			for (let index = 0; index < rightPath.length; index++) {
				if (index % 2) {
					message += rightPath[index] + "],";
				} else {
					message += "[" + rightPath[index] + ",";
				}
			}
			console.log(message);
		} else {
			array = array.concat(this.allPossibleMoves(array[0]));
			allPathsArray = allPathsArray.concat(
				this.checkIfCoordHaveBeenUse(
					allPathsArray,
					this.allPossibleMoves(array[0])
				)
			);
			let nextMoves = this.allPossibleMoves(array[0]);
			nextMoves.forEach((move) => {
				if (this.compareTwoCoords(move, targetCoord)) {
					rightPath = path[0].concat(move);
				}
				path.push(path[0].concat(move));
			});
			path.shift();
			array.shift();
			return this.moveToTarget(
				array[0],
				targetCoord,
				array,
				allPathsArray,
				path,
				rightPath
			);
		}
	}
}

const knight = new Knight();
knight.moveToTarget([3, 2], [3, 3]);
knight.moveToTarget([0, 0], [7, 7]);
