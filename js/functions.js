function isCheckingStringLength (string, maxLength) {
  return string.length <= maxLength;
}

isCheckingStringLength('Проверка функции', 18);

function isPalindrome (string) {
  const normalizedString = string.replaceAll(' ','').toUpperCase();
  let invertedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    invertedString += normalizedString[i];
  }
  return invertedString === normalizedString;
}

isPalindrome('топот');
