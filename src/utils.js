function randomColor() {
  let randomNumber = Math.floor(Math.random() * 5);
  switch (randomNumber) {
    case 4:
      return "blue";
    case 3:
      return "red";
    case 2:
      return "yellow";
    case 1:
      return "purple";
    default:
      return "green";
  }
}

export {randomColor};