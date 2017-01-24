import AnimationLetters from './AnimationLetters'

export default word => {
    return word.split('')
    .map(letter => letter.toLowerCase())
    .map(letter => letter === ' ' ? 'space' : letter)
    .filter(letter => {
        if (letter === 'space') {
            return true;
        }
        const charCode = letter.charCodeAt(0) - 32;
        console.log(charCode);
        return charCode > 64 && charCode < 91;
    })
    .reduce((tokenArray, letter) => {
        return tokenArray.concat(AnimationLetters[letter]);
    }, AnimationLetters['space']);
}