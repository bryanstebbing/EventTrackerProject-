/*
1 : Write a function named 'reverse' ...  
  
This function will take one argument, a string.  
  
Return the submitted string with the characters in reverse order.  
  
***NOTE*** Do not use the 'reverse' method on the String object, write your own.
*/

/************** Your Solution Here ****************/
function reverse(inputString) {
  let reversedString = '';
  
  for (let i = inputString.length - 1; i >= 0; i--) {
    reversedString += inputString.charAt(i);
  }
  
  return reversedString;
}
/**************************************************/

/*
2 : Write a function named 'palindromeChecker' ...  
  
This function will take one argument, a string.  
  
If the provided string is a palindrome (the same backwards and forwards), return
true, otherwise return false.
*/

/************** Your Solution Here ****************/
function palindromeChecker(inputString) {
  const cleanedString = inputString.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const reversedString = cleanedString.split('').reverse().join('');
  
  return cleanedString === reversedString;
}
/**************************************************/

/*
3 : Write a function named 'isPrime' ...  
  
This function will take one argument, a whole number.  
  
If the provided number is prime, return true, otherwise, return false.
*/

/************** Your Solution Here ****************/
function isPrime(number) {
  if (number <= 1) {
    return false;
  }
  
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  
  return true;
}
/**************************************************/

/* 
4 : Write a function named 'computeTax'. 

This function will take one or two arguments.  
  
* The first argument will always be the amount tendered. 

* The second argument, which is optional, could be the tax percentage (as a 
whole number). If no second argument is provided, assume the tax rate is 7.5%.  
  
Once applying the correct amount of tax, return the amount of tax owed.  
*/

/************** Your Solution Here ****************/
function computeTax(amountTendered, taxPercentage = 7.5) {
  const taxRate = taxPercentage / 100;
  
  const taxOwed = amountTendered * taxRate;
  
  return taxOwed;
}
/**************************************************/
