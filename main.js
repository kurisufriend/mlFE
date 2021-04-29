function parseinfo(info)
{
	document.getElementById("title").innerHTML = info["name"];
	console.log(info);
}
function loadmangos(info)
{
	let listing = document.getElementById("listing");
	info.forEach(manga =>
	{
		let row = listing.insertRow(-1);
		let title = row.insertCell(-1);
		title.innerHTML = manga["titles"][0];
		let author = row.insertCell(-1);
		author.innerHTML = manga["author"];
		let time = row.insertCell(-1);
		time.innerHTML = new Date(manga["last_updated"]).toLocaleDateString("en-US");
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