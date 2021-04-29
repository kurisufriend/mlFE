function setheader(header)
{
	document.getElementById("title").innerHTML = header;
}
function loadmangos(info)
{
	let listing = document.getElementById("listing");
	info.forEach(manga =>
	{
		let row = listing.insertRow(-1);
		let title = row.insertCell(-1);
		let link = document.createElement("a");
		link.setAttribute("href", window.location+"?id="+manga["id"]);
		link.textContent = manga["titles"][0];
		title.appendChild(link);
		let author = row.insertCell(-1);
		author.innerHTML = manga["authors"][0];
		let time = row.insertCell(-1);
		time.innerHTML = new Date(manga["last_updated"]).toLocaleDateString("en-US");
	});
	console.log(info);
}
function loadchapters(manga, chapters)
{
	if (manga)
	{
		setheader(manga["titles"][0]);
	}
	if (chapters)
	{
		document.getElementById("c2").innerHTML = "pages";
		document.getElementById("c3").innerHTML = "date";
		console.log(chapters);
		let listing = document.getElementById("listing");
		chapters.forEach(chapter =>
		{
			let row = listing.insertRow(-1);
			let title = row.insertCell(-1);
			let link = document.createElement("a");
			link.setAttribute("href", window.location.hostname+"/reader.html?cid="+chapter["ipfs_link"]+"&pages="+chapter["page_count"]+"&title="+chapter["title"]);
			link.textContent = chapter["title"];
			title.appendChild(link);
			let date = row.insertCell(-1);
			date.innerHTML = chapter["page_count"];
			let time = row.insertCell(-1);
			time.innerHTML = new Date(chapter["date_added"]).toLocaleDateString("en-US");
		});
	}
}
function load(url = "https://test.cynic.moe")
{
	let qs = new URLSearchParams(window.location.search);
	let id = qs.get("id");
	if (id)
	{
		let manga, chapters;
		fetch(url+"/manga/from_id?id="+id)
		.then(response => response.json())
		.then(data => loadchapters(data, null));
		fetch(url+"/manga/get_chapters?id="+id)
		.then(response => response.json())
		.then(data => loadchapters(null, data));
	}
	else
	{
		fetch(url+"/info")
		.then(response => response.json())
		.then(data => setheader(data["name"]+" v"+data["version"]));
		fetch(url+"/manga/search?sort")
		.then(response => response.json())
		.then(data => loadmangos(data));
	}
}