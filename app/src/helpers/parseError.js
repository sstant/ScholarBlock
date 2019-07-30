const parseError = str => {
    if (!str) return '';
    return str.split('Error: VM Exception while processing transaction: revert ')[1];
}

export default parseError;