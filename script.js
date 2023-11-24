let time = document.getElementById("js-current-time");
setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString('en-GB', { hour12: false });
}, 1000);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('js-three-container').appendChild(renderer.domElement);

const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const sphere = new THREE.Points(sphereGeometry, sphereMaterial);
scene.add(sphere);

const particleGeometry = new THREE.BufferGeometry();
const particleCount = 500;
const posArray = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 50;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});