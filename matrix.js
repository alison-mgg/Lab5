function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
	// dataArray is a 2D array
	// complete this function based on the showResult function
    if (dataArray == null){
        let container = document.getElementById(containerId);
        container.innerHTML = title; // Clear previous content

    
    }else{
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    let caption = table.createCaption();
    caption.textContent = title;
    const rows = dataArray.length;
    const cols = dataArray[0].length;
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.textContent = dataArray[i][j]; // Access element from 2D array
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
    }
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    // Call your matrix calculation functions here
    let result = [];
try {
    if (operation === 'add') {
        result = addMatrices(matrix1, matrix2);
    }
    if (operation === 'subtract') {
        result = subtractMatrices(matrix1, matrix2);
    }
    if (operation === 'multiply') {
        result = multiplyMatrices(matrix1, matrix2);
    }
    // prints suitable messages for impossible situation
    showResult2D('The Result', 'matrix3', result); // use suitable function for printing results
} catch (error) {
    if (operation === 'add') {
        console.error("Matrices must have the same dimensions for addition:", error.message);
        showResult2D('Matrices must have the same dimensions for addition', 'matrix3', null);
    }
    if (operation === 'subtract') {
        console.error("Matrices must have the same dimensions for subtraction:", error.message);
        showResult2D('Matrices must have the same dimensions for subtraction', 'matrix3', null);
    }
    if (operation === 'multiply') {
        console.error("Number of columns in matrix1 must be equal to the number of rows in matrix2 for multiplication:", error.message);
        showResult2D('Number of columns in matrix1 must be equal to the number of rows in matrix2 for multiplication', 'matrix3', null);
    }
}
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
	// provide the code
    const result = [];
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;
    //martices must be same dismension to be added together
    if (rows1 !== rows2 || cols1 !== cols2) {
        throw new Error();
    }

    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols1; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }

    return result;
}

const subtractMatrices = function (matrix1, matrix2) { 
	// provide the code
    const result = [];
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;
    // Check if matrices have the same dimensions
    if (rows1 !== rows2 || cols1 !== cols2) {
        throw new Error();
    }

    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols1; j++) {
            result[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }

    return result;
};
const multiplyMatrices = (matrix1, matrix2) => { 
	// provide the code
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;

    // Check if matrices can be multiplied
    if (cols1 !== rows2) {
        throw new Error();
    }

    const result = [];

    // Multiply matrices
    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols2; j++) {
            result[i][j] = 0;
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
};
