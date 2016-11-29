
google.maps.event.addDomListener(window, 'load', init);

	function init() {

	var mapOptions = {

	zoom: 13,

	// http://webmap-blog.ru/tools/getlonglat-1.html
	center: new google.maps.LatLng(57.003491085182746, 40.94),

	scrollwheel: false,
	navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
	streetViewControl: false,

	// https://snazzymaps.com/
	styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
	};

	var mapElement = document.getElementById('map');

	var image1 = new google.maps.MarkerImage(
		'../img/icon-map01.png',
		new google.maps.Size(100,100), // размеры контейнера маркера
		new google.maps.Point(0,0), // сдвиг маркета внутри этого контейнера
		new google.maps.Point(50,100) // расположение фиксированной на карте точки этого контейнера
	);



	var map = new google.maps.Map(mapElement, mapOptions);

	// Добавляем маркеры на карту
	var marker1 = new google.maps.Marker({
		draggable: false,
		position: new google.maps.LatLng(56.992297528502455, 40.92232541045075),
		icon: image1,
		map: map,
		title: 'Офис'
	});

}

