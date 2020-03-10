import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { MOUSE, Vector2 } from 'three';

var scene, camera, renderer;
var raycaster, intersects, mouse;

var orbit
var transform
var drag;

var meshes = {};

const DEFAULT_SIZE = 100;
const GRID_CELLS = 1000;
const GRID_ROWS = 10;


init();
animate();

function init() {
    set_scene();
    set_camera();
    set_renderer();
    set_mouse();
    set_raycaster();
    set_window();
    set_orbit();
    set_transform();
    var geometry = set_default_geometry();
    // var material = set_default_material();
    var material= set_default_materials();
    var mesh = set_mesh(geometry, material);
    console.log(mesh);
    meshes["default"] = mesh;
    scene.add(mesh);
    transform.attach(mesh);
    scene.add(transform);
    set_keys();

}

function reset_controls() {
    transform.visible = false;
}

function undo_transform(id) {
    
}

function set_camera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
        0.1, 1000);
    camera.position.set(DEFAULT_SIZE * 2, DEFAULT_SIZE * 2, DEFAULT_SIZE * 2);

}

function set_default_geometry() {
    return new THREE.BoxBufferGeometry(DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE);
}

function set_default_material() {
    return new THREE.MeshBasicMaterial({color: 0x606060});
}

function set_default_materials() {
    var materials = [];
    materials.push(new THREE.MeshBasicMaterial({color: 0xff0000}));
    materials.push(new THREE.MeshBasicMaterial({color: 0xffff00}));
    materials.push(new THREE.MeshBasicMaterial({color: 0xff00ff}));
    materials.push(new THREE.MeshBasicMaterial({color: 0x00ff00}));
    materials.push(new THREE.MeshBasicMaterial({color: 0x0000ff}));
    materials.push(new THREE.MeshBasicMaterial({color: 0x00ffff}));
    return materials;
}

function set_drag() {
    drag = new DragControls()
}

function set_keys() {
    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            case 49: // 1
                reset_controls();
                break;
            case 50: // 2
                reset_controls();
                transform.visible = true;
                break;
            case 82: // R
                transform.visible && transform.setMode("rotate");
                break;
            case 83: // S
                transform.visible && transform.setMode("scale");
                break;
            case 84: // T
                transform.visible && transform.setMode("translate");
                break;
            case 87: // W
                Object.entries(meshes).forEach(([key, val]) => {
                    // val.material.wireframe = !val.material.wireframe;
                    val.material.forEach(element => {
                        element.wireframe = !element.wireframe;
                    })
                });
                break;
        }
    });
}

function set_mesh(geometry, material) {
    return new THREE.Mesh(geometry, material);
}

function set_mouse() {
    mouse = new THREE.Vector2();
}

function set_orbit() {
    orbit = new OrbitControls(camera, renderer.domElement);
}

function set_raycaster() {
    raycaster = new THREE.Raycaster();
}

function set_renderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function set_scene() {
    scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(GRID_CELLS, GRID_ROWS));

}

function set_transform() {
    transform = new TransformControls(camera, renderer.domElement);
    console.log(transform);
    transform.addEventListener('scale-changed', function(e) {
        console.log("Hey");
    });
    transform.addEventListener('change', function(e) {
        render();
    });
    transform.addEventListener('dragging-changed', function(e) {
        orbit.enabled = !e.value;
    });

}

function set_window() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);

}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(Object.values(meshes), true);
    if (!((mouse.x == 0) && (mouse.y == 0))) {
        for (var i = 0; i < intersects.length; i++) {
            intersects[i].object.material[0].color.set(0xffffff);
        }
    }
    renderer.render(scene, camera);
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    render();

}
