const variations = [
    {
        "name": "blog-roll",
        "title": "Blog Roll",
        "description": "An advanced block that allows displaying post types based on different query parameters and visual configurations.",
        "category": "fwd",
        "attributes": {
            "align": "wide",
            "className": "blog-roll",
            "namespace": "blog-roll",
            "query": {
                "perPage": 9,
                "pages": 0,
                "offset": 0,
                "postType": "post",
                "order": "desc",
                "orderBy": "date",
                "author": "",
                "search": "",
                "exclude": [],
                "sticky": "",
                "inherit": false
            },
            "tagName": "section",
            "metadata": {
                "name": "Blog Roll",
                "slug": "blog-roll"
            }
        },
        "innerBlocks": [
            [
                "core/post-template",
                {
                    "className": "blog-roll__wrapper",
                    "lock": {
                        "move": true,
                        "remove": true
                    }
                },
                [
                    [
                        "core/post-featured-image",
                        {
                            "className": "blog-roll__image",
                            "isLink": true,
                            "lock": {
                                "move": true,
                                "remove": true
                            }
                        }
                    ],
                    [
                        "core/group",
                        {
                            "className": "blog-roll__content",
                            "lock": {
                                "move": true,
                                "remove": true
                            }
                        },
                        [
							[
								"core/post-title",
								{
									"className": "blog-roll__title",
									"isLink": true,
									"level": 4,
									"lock": {
										"move": true,
										"remove": true
									}
								}
							],
                            [
                                "core/post-terms",
                                {
                                    "className": "blog-roll__categories",
                                    "lock": {
                                        "move": true,
                                        "remove": true
                                    },
                                    "term": "category"
                                }
                            ]
                        ]
                    ]
                ]
            ]
        ],
    }
]

export default variations;
