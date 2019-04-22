import React, { Component } from 'react';
import logo from './logo.svg';
import * as THREE from 'three';
import './App.css';
const OrbitControls = require('three-orbit-controls')(THREE);

class App extends Component {
	constructor(props) {
		super(props);
		this.animate = this.animate.bind(this);
		this.addCube = this.addCube.bind(this);
		this.initializeCamera = this.initializeCamera.bind(this);
		this.initializeOrbits = this.initializeOrbits.bind(this);
	}

	componentDidMount() {
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.renderer.setSize(width, height);
		this.mount.appendChild(this.renderer.domElement);
		this.initializeOrbits();
		this.initializeCamera();
    var texture = new THREE.TextureLoader().load( require('./assests/5.jpg') );
    var texture1 = new THREE.TextureLoader().load( require('./assests/2.jpg') );
    var texture2 = new THREE.TextureLoader().load( require('./assests/3.jpg') );
    var texture3 = new THREE.TextureLoader().load( require('./assests/4.jpg') );
    var texture4 = new THREE.TextureLoader().load( require('./assests/1.jpg') );
    var texture5 = new THREE.TextureLoader().load( require('./assests/6.jpg') );
    
		const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    const material = [
      new THREE.MeshBasicMaterial( { map: texture, name:"Facebook" } ),
      new THREE.MeshBasicMaterial( { map: texture1, name:"Facebook" } ),
      new THREE.MeshBasicMaterial( { map: texture2, name:"Facebook" } ),
      new THREE.MeshBasicMaterial( { map: texture3, name:"Facebook" } ),
      new THREE.MeshBasicMaterial( { map: texture4, name:"Facebook" } ),
      new THREE.MeshBasicMaterial( { map: texture5, name:"Facebook" } )
  ];
    this.cube = new THREE.Mesh(geometry, material);
    
    this.scene.add(this.cube);
    
		this.animate();
	}
	componentWillUnmount() {
		cancelAnimationFrame(this.frameId);
		this.mount.removeChild(this.renderer.domElement);
	}
	initializeOrbits() {
		this.controls.rotateSpeed = 1.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.8;
	}
	initializeCamera() {
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 4;
	}
	animate() {
		this.frameId = window.requestAnimationFrame(this.animate);
		this.renderer.render(this.scene, this.camera);
	}
	addCube(cube) {
		this.scene.add(cube);
	}

	onDocMouseDown(event, mesh) {
    const windowArea = event.target.getBoundingClientRect();
    
		const mouse3D = new THREE.Vector3(
			(event.clientX / this.mount.width) * 2 - 1,
			-(event.clientY / this.mount.height) * 2 + 1,
			0.5
    );

		const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, this.camera);
    
    let intersects = raycaster.intersectObjects(mesh);
    alert("You have clicked.")
		// if (intersects.length > 0) {
		// 	const hexCode = intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
		// }
	}

	render() {
		return (
			<div>
				<div
					onDoubleClick={e => this.onDocMouseDown(e, this.cube)}
					id="boardCanvas"
					style={{ width: '80vw', height: '40vw' }}
					ref={mount => {
						this.mount = mount;
					}}
				/>
			</div>
		);
	}
}

export default App;
