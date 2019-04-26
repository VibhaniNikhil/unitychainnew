import React, { Component } from 'react';
import logo from './logo.svg';
import * as THREE from 'three';
import './App.css';
const OrbitControls = require('three-orbit-controls')(THREE);

class App extends Component {
	constructor(props) {
		super(props);
		this.animate = this.animate.bind(this);
		this.objects = new Array();
		this.addCube = this.addCube.bind(this);
		this.initializeCamera = this.initializeCamera.bind(this);
		this.initializeOrbits = this.initializeOrbits.bind(this);
		this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
	}

	componentDidMount() {
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		// this.renderer = new THREE.CanvasRenderer();
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setClearColor('#e5e5e5');
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.renderer.setSize(width, height);
		this.mount.appendChild(this.renderer.domElement);
		this.initializeOrbits();
		this.initializeCamera();

		this.scene.add( new THREE.AmbientLight( 0x222222 ) );

		var texture = new THREE.TextureLoader().load(require('./assests/5.jpg'));
		var texture1 = new THREE.TextureLoader().load(require('./assests/2.jpg'));
		var texture2 = new THREE.TextureLoader().load(require('./assests/3.jpg'));
		var texture3 = new THREE.TextureLoader().load(require('./assests/4.jpg'));
		var texture4 = new THREE.TextureLoader().load(require('./assests/1.jpg'));
		var texture5 = new THREE.TextureLoader().load(require('./assests/6.jpg'));
		var texture6 = new THREE.TextureLoader().load(require('./assests/image1.jfif'));
		var texture7 = new THREE.TextureLoader().load(require('./assests/image2.jfif'));
		var texture8 = new THREE.TextureLoader().load(require('./assests/image3.png'));
		var texture9 = new THREE.TextureLoader().load(require('./assests/image4.png'));
		var texture10 = new THREE.TextureLoader().load(require('./assests/image5.jpg'));
		var texture11 = new THREE.TextureLoader().load(require('./assests/image6.jpg'));

		// const geometry = new THREE.BoxGeometry(1, 1, 1);
		// const geometry = new THREE.SphereGeometry(-1.0, 0, 0);

		this.group = new THREE.Group();

		var meshMaterial = [
			// new THREE.MeshLambertMaterial( {
			// 	color: 'green',
			// 	opacity: 0.5,
			// 	transparent: true
			// } ), 
			// new THREE.MeshLambertMaterial( {
			// 	color: 'red',
			// 	opacity: 0.5,
			// 	transparent: true
			// } ),
			// new THREE.MeshLambertMaterial( {
			// 	color: 'blue',
			// 	opacity: 0.5,
			// 	transparent: true
			// } ),
			// new THREE.MeshLambertMaterial( {
			// 	color: 'yellow',
			// 	opacity: 0.5,
			// 	transparent: true
			// } ),
			new THREE.MeshLambertMaterial( {
				 map: texture, name: 'camera', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture1, name: 'camera', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture2, name: 'camera', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture3, name: 'camera', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture4, name: 'twitter', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture5, name: 'linkedin', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture6, name: 'linkedin', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture7, name: 'linkedin', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture8, name: 'linkedin', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture9, name: 'linkedin', transparent: true, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture10, name: 'linkedin', transparent: true,opacity: 0.5, wireframe: false
			} ),
			new THREE.MeshLambertMaterial( {
				map: texture11, name: 'linkedin', transparent: true,opacity: 0.5, wireframe: false
			} )
		];

		var materials = []; 
		materials.push( new THREE.MeshBasicMaterial( { color: 0xff0000 }) );
		materials.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 }) );
		materials.push( new THREE.MeshBasicMaterial( { color: 0x0000ff }) );

		// assign a material to each face (each face is 2 triangles)
		
		var meshGeometry = new THREE.SphereGeometry( vertices );
		var l = meshGeometry.faces.length / 2;
		const materialLength = meshMaterial.length;
		let materialCount = 0;
		for( var i = 0; i < l; i ++ ) {
			var j = 2 * i;
			
			meshGeometry.faces[ j ].materialIndex = materialCount ;
			meshGeometry.faces[ j + 1 ].materialIndex = materialCount;

			if(materialCount == materialLength) {
				materialCount = 0;
			} else {
				materialCount++;
			}
		}

		const faceMaterial = new THREE.MeshFaceMaterial(meshMaterial);
		this.cube = new THREE.Mesh( meshGeometry, faceMaterial );
		this.cube.material.side = THREE.BackSide; // back faces
		this.cube.renderOrder = 0;
		this.group.add( this.cube );
		

		// const material = new THREE.MeshBasicMaterial({ map: texture });
		// const material = [
		// 	// new THREE.MeshBasicMaterial({ wireFrame: true, map: texture, name: 'camera', transparent: true }),
		// 	// new THREE.MeshBasicMaterial({ map: texture1, name: 'twitter', transparent: true }),
		// 	new THREE.MeshBasicMaterial({ map: texture2, name: 'orange', transparent: true }),
		// 	// new THREE.MeshBasicMaterial({ map: texture3, name: 'google', transparent: true }),
		// 	// new THREE.MeshBasicMaterial({ map: texture4, name: 'facebook', transparent: true }),
		// 	// new THREE.MeshBasicMaterial({ map: texture5, name: 'linkedin', transparent: true }),
		// ];
		// const faceMaterial = new THREE.MeshFaceMaterial(material);
		// this.cube = new THREE.Mesh(geometry, faceMaterial);
		// this.cube.rotation.set(2, 1, 2);

		this.objects.push(this.cube);
		this.scene.add(this.cube);

		// Create ambient light and add to scene.
		// var light = new THREE.AmbientLight(0x404040); // soft white light
		// this.scene.add(light);

		// // Create a directional light
		// const light = new THREE.DirectionalLight( 0xffffff, 5.0 );

		// // move the light back and up a bit
		// light.position.set( 10, 10, 10 );
		
		// // remember to add the light to the scene
		// this.scene.add( light );
		
		const light = new THREE.PointLight( 0xffffff, 1 );
		this.camera.add( light );
		
		// helper
		// this.scene.add( new THREE.AxesHelper( 20 ) );

		// textures
		var loader = new THREE.TextureLoader();
		var texture = loader.load( 'textures/sprites/disc.png' );
		
		this.scene.add( this.group );

		var vertices = new THREE.DodecahedronGeometry( 1 ).vertices;

		for ( var i = 0; i < vertices.length; i ++ ) {
			//vertices[ i ].add( randomPoint().multiplyScalar( 2 ) ); // wiggle the points
		}

		var pointsMaterial = new THREE.PointsMaterial( {
			color: 0x0080ff,
			map: texture,
			size: 1,
			alphaTest: 0.5
		} );

		var pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

		var points = new THREE.Points( pointsGeometry, pointsMaterial );
		this.group.add( points );

		// var light = new THREE.PointLight(0xFFFF00);
		// /* position the light so it shines on the cube (x, y, z) */
		// light.position.set(10, 0, 25);
		// this.scene.add(light);
		// Create directional light and add to scene.
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(1, 1, 1).normalize();
		this.scene.add(directionalLight);

		this.renderer.domElement.addEventListener('dblclick', this.onDocumentMouseMove, false);
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

		// this.controls.minDistance = 20;
		// this.controls.maxDistance = 50;
		// this.controls.maxPolarAngle = Math.PI / 2;
	}
	initializeCamera() {
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 4;
	}
	// animate() {
	// 	this.frameId = window.requestAnimationFrame(this.animate);
	// 	this.renderer.render(this.scene, this.camera);
	// }
	animate() {
		this.cube.rotation.x += 0.008
		this.cube.rotation.y += 0.008

		this.renderScene();
		this.frameId = window.requestAnimationFrame(this.animate);
	}

	renderScene() {
		this.renderer.render(this.scene, this.camera);
	}

	addCube(cube) {
		this.scene.add(cube);
	}
	
	onDocumentMouseMove(event) {
		const windowArea = event.target.getBoundingClientRect();
		const mouse3D = new THREE.Vector3(
			(event.clientX / this.mount.width) * 2 - 1,
			-(event.clientY / this.mount.height) * 2 + 1,
			0.5
		);
		
		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse3D, this.camera);
		
		// let intersects = raycaster.intersectObjects(this.objects);
		// const { materialIndex } = intersects[0].face;
		// alert(`You have clicked on ${intersects[0].object.material[materialIndex].name}`);
		
		// switch (intersects[0].object.material[materialIndex].name) {
		// 	case 'camera':
		// 		window.open('https://www.instagram.com', '_blank');
		// 		break;
		// 	case 'twitter':
		// 		window.open('https://twitter.com', '_blank');
		// 		break;
		// 	case 'orange':
		// 		window.open('https://rss.com', '_blank');
		// 		break;
		// 	case 'google':
		// 		window.open('http://google.com', '_blank');
		// 		break;
		// 	case 'facebook':
		// 		window.open('https://www.facebook.com', '_blank');
		// 		break;
		// 	case 'linkedin':
		// 		window.open('https://in.linkedin.com', '_blank');
		// 		break;
		// }
	}
	
	// onDocMouseDown(event, mesh) {
	//   const windowArea = event.target.getBoundingClientRect();
	//   console.log(event.dispatchConfig, windowArea)
	// 	const mouse3D = new THREE.Vector3(
	// 		(event.clientX / this.mount.width) * 2 - 1,
	// 		-(event.clientY / this.mount.height) * 2 + 1,
	// 		0.5
	//   );

	// 	const raycaster = new THREE.Raycaster();
	//   raycaster.setFromCamera(mouse3D, this.camera);

	// 	let intersects = raycaster.intersectObjects(mesh);
	// 	console.log("mesh", mesh)
	//   // alert("You have clicked.")
	// 	// if (intersects.length > 0) {
	// 	// 	const hexCode = intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
	// 	// }
	// }

	render() {
		return (
			<div>
				<div
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
