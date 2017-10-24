var laptopData = {
    container: document.getElementById('laptop-anim'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/json/animation-data.json'

};
var laptopAnim = bodymovin.loadAnimation(laptopData);

