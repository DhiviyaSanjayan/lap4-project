/*
 * Take the id of a player piece and a square and places piece centered within table cell square
 */
export default function positionElement(user, flower) {
  // id of the div representing a player playing
  const userElem = document.getElementById(user);
  // id of the div representing a square within the board
  let flowerElem = document.getElementById(flower);
    flowerElem = flowerElem.getBBox();
    
  const squareCenterPosInGrid = {};
  squareCenterPosInGrid.xPos =
    flowerElem.x + flowerElem.width / 2;
  squareCenterPosInGrid.yPos =
        flowerElem.y + flowerElem.height / 2;
    
    console.log(flowerElem)
    
  userElem.style.left =
    squareCenterPosInGrid.xPos + userElem.offsetWidth / 2 + "px";
  userElem.style.top =
    squareCenterPosInGrid.yPos + userElem.offsetHeight / 2 + "px";
}
