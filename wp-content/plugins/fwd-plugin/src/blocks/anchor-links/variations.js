const variations = [
    {
        name: "default",
        title: "Anchor Links",
        description: "Group of linked buttons",
        category: "fwd",
        icon: "editor-insertmore",
        attributes: {
            className: "anchor-links__buttons",
            layout: {
                type: 'flex',
                justifyContent: 'center'
            },
            metadata: {
                name: 'Anchor Links',
                slug: 'anchor-links'
            }
        },
        isActive: [ "namespace" ],
        innerBlocks: [
            [
                'core/button',
                {
                    className: 'anchor-links__button',
                    text: 'Button',
                    url: '#'
                },
            ],
            [
                'core/button',
                {
                    className: 'anchor-links__button',
                    text: 'Button',
                    url: '#'
                },
            ],
            [
                'core/button',
                {
                    className: 'anchor-links__button',
                    text: 'Button',
                    url: '#'
                },
            ],
            [
                'core/button',
                {
                    className: 'anchor-links__button',
                    text: 'Button',
                    url: '#'
                },
            ]
        ]
    }
];

export default variations;