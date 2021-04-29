function parseinfo(info)
{
	document.getElementById("title").innerHTML = info["name"];
	console.log(info);
}
function loadmangos(info)
{
	let listing = document.getElementById("listing");
	info.forEach(manga => function(manga)
	{
		console.log(manga["id"]);
	});
	console.log(info);
}
function load(url = "https://test.cynic.moe")
{
	fetch(url+"/info")
	.then(response => response.json())
	.then(data => parseinfo(data));
	fetch(url+"/manga/search?sort")
	.then(response => response.json())
	.then(data => loadmangos(data));
}