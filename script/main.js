var camera, scene, renderer;
var point_material;
var fixed_points, freq_points;
var r_1 = window.innerHeight*0.2; //Radius of the inner circle
var r_2 = window.innerHeight*0.9; //Radius of the outer circle
var number_of_bins = 17; //Number of frequency bins
var d_phi = 2*Math.PI / number_of_bins;

function init() {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
  camera.position.z = 1000;

  scene = new THREE.Scene();

  fixed_points = new Array(number_of_bins*2);
  freq_points = new Array(number_of_bins);

  var phi_offset = d_phi / 2.0;

  // Initialise points for the inner circle
  for (var i = 0; i < number_of_bins; ++i) {
    var point_material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    var circleGeometry = new THREE.CircleGeometry(5, 16);
    fixed_points[i] = new THREE.Mesh(circleGeometry, point_material);
    scene.add(fixed_points[i]);
    fixed_points[i].position.x = r_1 * Math.sin(d_phi*i + phi_offset)
    fixed_points[i].position.y = r_1 * Math.cos(d_phi*i + phi_offset)
  }

  // Initialise points for the outer circle
  for (var i = number_of_bins; i < 2*number_of_bins; ++i) {
    var point_material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    var circleGeometry = new THREE.CircleGeometry(5, 16);
    fixed_points[i] = new THREE.Mesh(circleGeometry, point_material);
    scene.add(fixed_points[i]);
    fixed_points[i].position.x = r_2 * Math.sin(d_phi*i + phi_offset)
    fixed_points[i].position.y = r_2 * Math.cos(d_phi*i + phi_offset)
  }

  // Initialise the moving points for the actual visualization
  for (var i = 0; i < number_of_bins; ++i) {
      var point_material = new THREE.MeshBasicMaterial({color: 0x0000ff});
      var circleGeometry = new THREE.CircleGeometry(5, 16);
      freq_points[i] = new THREE.Mesh(circleGeometry, point_material);
      scene.add(freq_points[i]);
      freq_points[i].position.x = ((r_2 - r_1) / 2 + r_1) * Math.sin(d_phi*i)
      freq_points[i].position.y = ((r_2 - r_1) / 2 + r_1) * Math.cos(d_phi*i)
  }

  renderer = new THREE.CanvasRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );
}

function animate() {
  // note: three.js includes requestAnimationFrame shim
  requestAnimationFrame( animate );

  var new_distances = getDistances();
  for (var i = 0; i < number_of_bins; ++i) {
    freq_points[i].position.x = new_distances[i] * Math.sin(d_phi*i)
    freq_points[i].position.y = new_distances[i] * Math.cos(d_phi*i)
  }

  renderer.render( scene, camera );
}

function getDistances() {
  var distances = new Array(number_of_bins);

  for (var i = 0; i < number_of_bins; ++i) {
    distances[i] = THREE.Math.randInt(r_1, r_2);
  }

  return distances;
}
