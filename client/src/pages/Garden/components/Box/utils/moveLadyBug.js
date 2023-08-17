export default function moveLadyBug(id) {
  const crawlArea = document.getElementById("crawl-area");
  const lb = document.getElementById(id);

  const box = crawlArea.getBoundingClientRect();
  const randPoint = {
    x: box.left + Math.random() * box.width,
    y: box.top + Math.random() * box.height,
  };
  const lbPos = {
    x: lb.getBoundingClientRect().x + lb.offsetWidth / 2,
    y: lb.getBoundingClientRect().y + lb.offsetHeight / 2,
  };
  const turnAngle =
    (Math.atan2(randPoint.y - lbPos.y, randPoint.x - lbPos.x) * (180 / Math.PI));

  lb.style.left = randPoint.x + "px";
  lb.style.top = randPoint.y + "px";
  lb.style.transform = `rotate(${turnAngle+90}deg)`;
}
