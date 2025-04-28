const variations = [
    {
		"name": "featured-event",
		"title": "Featured Event",
		"category": "fwd",
		"description": "Featured events serve as a means for website administrators to curate and showcase content that they believe will be of particular interest to visitors. This practice helps improve user engagement, highlights key information, and contributes to an enhanced user experience on the website.",
		"attributes": {
			"className": "featured-post featured-event",
			"namespace": "featured-event",
			"query": {
				"perPage": 1,
				"pages": 0,
				"offset": 0,
				"postType": "tribe_events",
				"order": "desc",
				"orderBy": "date",
				"author": "",
				"search": "",
				"exclude": [],
				"sticky": "",
				"inherit": false,
				"taxQuery": null,
				"parents": []
			}
		},
		"isActive": ['query.postType']
	}
];

export default variations;
