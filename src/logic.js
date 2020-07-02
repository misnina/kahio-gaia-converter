/**
 * Exports an array of values in all currency types
 * @param {int} currency - An enum of Gold: 0, Platinum: 1, GaiaCash: 2, USD: 3
 * @param {int} amount - The amount of currency given to convert
 */

export default function Convert(currency, amount, GC200Average) {

  function goldToPlatinum(goldAmount, up) {
    return up ? goldAmount / 1000000 : goldAmount * 1000000;
  }
  
  function platinumToGCash(platinumAmount, up) {
    return up ? platinumAmount / GC200Average : platinumAmount * GC200Average;
  }
  
  function gCashToUSD(gCashAmount, up) {
    return up ? gCashAmount / 100 : gCashAmount * 100;
  }

  const GOLD = () => {
    let conversion = [];
    conversion.push(amount);

    const platinum = goldToPlatinum(amount, true);
    conversion.push(platinum);

    const gCash = platinumToGCash(platinum, true);
    conversion.push(gCash);

    const USD = gCashToUSD(gCash, true);
    conversion.push(USD);
    return conversion
  }

  const PLATINUM = () => {
    let conversion = [];

    const gold = goldToPlatinum(amount, false);
    conversion.push(gold);

    conversion.push(amount);

    const gCash = platinumToGCash(amount, true);
    conversion.push(gCash);

    const USD = gCashToUSD(gCash, true);
    conversion.push(USD);
    return conversion
  }

  const GCASH = () => {
    let conversion = [];

    const platinum = platinumToGCash(amount, false);

    const gold = goldToPlatinum(platinum, false);
    conversion.push(gold, platinum);

    conversion.push(amount);

    const USD = gCashToUSD(amount, true);
    conversion.push(USD);
    return conversion
  }

  const USD = () => {
    let conversion = [];

    const gCash = gCashToUSD(amount, false);
    const platinum = platinumToGCash(gCash, false);
    const gold = goldToPlatinum(platinum, false);

    conversion.push(gold, platinum, gCash, amount);

    return conversion
  }

  const options = [GOLD, PLATINUM, GCASH, USD];

  return options[currency]();
}