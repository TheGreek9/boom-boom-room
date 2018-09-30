
let numberOfPlayers = 20;
let daNumberList = [];

for (i = 1; i <= numberOfPlayers; i++) {
	daNumberList.push(i);
}

export const numberList = daNumberList;

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

