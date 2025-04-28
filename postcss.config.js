module.exports = ({ env }) => ({
	plugins: {
		'postcss-flexbugs-fixes' : env == 'production' ? {} : false,
		'postcss-preset-env': env == 'production' ? {
			'stage': 2,
			'features': {},
			'autoprefixer': {},
		} : {
			'stage': 0,
			'features': {},
			'browsers': 'last 2 versions'
		},
		'cssnano': env == 'production' ? {
			'preset' : 'default'
		} : false,
	}
});
