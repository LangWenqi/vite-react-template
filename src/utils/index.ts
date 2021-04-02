export const moneyFormat = (money: string | number) => {
  const moneyMumber = Number(money);
  if (isNaN(moneyMumber) || money === null) {
    return money;
  }
  const moneyString: string = moneyMumber.toFixed(2);
  return Number(moneyString).toLocaleString();
}

export const fentoYuan = (money: string | number) => {
  const moneyMumber = Number(money);
  if (isNaN(moneyMumber) || money === null) {
    return money;
  }
  return moneyMumber / 100;
}

export const sortNumber = (money: string | number) => {
  const moneyMumber = Number(money);
  if (isNaN(moneyMumber)) {
    return -1;
  }
  return Math.abs(moneyMumber);
}
