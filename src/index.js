import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



var scene, camera, renderer;
var geometry, material, mesh;
var orbit;

const GRID_CELLS = 1000;
const GRID_ROWS = 100;


init();
animate();

function init() {
    set_scene();
    set_camera();
    set_renderer();
    set_window();
    set_orbit();
    set_geometry();
    set_material();
    set_mesh();
    scene.add(mesh);
    camera.position.z = 5;
}

function set_camera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
        0.1, 1000);
}

function set_geometry() {
    geometry = new THREE.BoxGeometry();
}

function set_material() {
    material = new THREE.MeshBasicMaterial({color: 0x00ff00});
}

function set_mesh() {
    mesh = new THREE.Mesh(geometry, material);
}

function set_orbit() {
    orbit = new OrbitControls(camera, renderer.domElement);
}

function set_scene() {
    scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(GRID_CELLS, GRID_ROWS));

}

function set_window() {
    window.addEventListener('resize', onWindowResize, false);
}

function set_renderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    
}