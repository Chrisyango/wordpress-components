const variations = [
    {
		"name": "call-to-action",
		"title": "Call to Action",
		"category": "fwd",
		"description": "A prompt or directive designed to encourage a specific response or action from the user.",
		"attributes": {
            "align": "full",
			"className": "cta hidden",
            "style": {
                "border": {
                    "radius": {
                        "topLeft":"10px",
                        "topRight":"60px",
                        "bottomRight":"60px",
                        "bottomLeft":"10px"
                    }
                },
                "spacing": {
                    "margin": {
                        "top": "60px"
                    }
                }
            },
            "layout": {
                "type": "default"
            },
            "metadata": {
                "name": "Call to Action",
                "slug": "call-to-action"
            }
		},
		"innerBlocks": [
            [
                "core/group",
                {
                    "className": "cta__wrapper",
                    "layout": {
                        "type": "default"
                    },
                },
                [
                    [
                        "core/heading",
                        {
                            "className": "cta__title"
                        }
                    ],
                    [
                        "core/paragraph",
                    ],
                    [
                        "core/buttons",
                        {
                            "className": "cta__buttons"
                        },
                        [
                            [
                                "core/button",
                                {
                                    "className": "cta__button is-style-outline"
                                }
                            ],
                        ]
                    ]
                ]
            ]
		]
	}
];

export default variations;
