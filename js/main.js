function setheader(header, author = null)
{
	document.getElementById("title").innerHTML = header;
	document.getElementById("pagetitle").innerHTML = header;
	document.getElementById("op").innerHTML = author;
}
function loadmangos(info, url)
{
	let listing = document.getElementById("listing");
	info.forEach(manga =>
	{
		let row = listing.insertRow(-1);
		let title = row.insertCell(-1);
		title.className = "title";
		let link = document.createElement("a");
		link.setAttribute("href", window.location+"?id="+manga["id"]);
		link.textContent = manga["titles"][0];
		title.appendChild(link);
		let thumb = document.createElement("img");
		thumb.setAttribute("src", url+"/manga/thumbnail?id="+manga["id"]);
		thumb.className = "thumb";
		title.appendChild(thumb);
		let author = row.insertCell(-1);
		author.innerHTML = manga["authors"][0];
		let time = row.insertCell(-1);
		time.innerHTML = new Date(manga["last_updated"]*1000).toLocaleDateString("en-US");
	});
}
function loadchapters(manga, chapters)
{
	if (manga)
	{
		setheader(manga["titles"][0], manga["authors"][0]);
	}
	if (chapters)
	{
		document.getElementById("c2").innerHTML = "pages";
		document.getElementById("c3").innerHTML = "date";
		let listing = document.getElementById("listing");
		chapters.forEach(chapter =>
		{
			let row = listing.insertRow(-1);
			let title = row.insertCell(-1);
			let link = document.createElement("a");
			link.setAttribute("href", "/reader.html?cid="+chapter["ipfs_link"]+"&pages="+chapter["page_count"]+"&title="+chapter["title"]);
			link.textContent = chapter["title"];
			title.appendChild(link);
			let date = row.insertCell(-1);
			date.innerHTML = chapter["page_count"];
			let time = row.insertCell(-1);
			time.innerHTML = new Date(chapter["date_added"]*1000).toLocaleDateString("en-US");
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
		.then(data => setheader(data["name"]+" v"+data["version"], data["operator"]));
		fetch(url+"/manga/search?sort")
		.then(response => response.json())
		.then(data => loadmangos(data, url));
	}
}