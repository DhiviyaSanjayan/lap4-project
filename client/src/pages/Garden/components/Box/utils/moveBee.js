export default function moveBee(id) {
  const gardenBox = document.getElementById("garden-box");
  const plantCount = gardenBox.querySelectorAll("button").length;
  const randPlant = Math.floor(plantCount * Math.random());
  const plant = document.getElementById(`plant${randPlant}`);

  if (!plant) return;
  const plantFlowerPos = {
    x: plant.getBoundingClientRect().x - (Math.random() * 40),
    y: plant.getBoundingClientRect().y - (Math.random() * 40),
  };
  const bee = document.getElementById(id);
  if (bee) {
    bee.style.top = plantFlowerPos.y + "px";
    bee.style.left = plantFlowerPos.x + "px";
  }
}
