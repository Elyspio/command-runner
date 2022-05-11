const href = location.href;

const baseUrl = href.slice(0, href.indexOf("/swagger"));

const specUrl = baseUrl + "/swagger/swagger.json";

SwaggerUIBuilder.config.urls = [
	{
		url: specUrl,
		name: "/swagger",
	},
];

SwaggerUIBuilder.config.plugins.push(() => ({
	statePlugins: {
		spec: {
			wrapActions: {
				updateJsonSpec: (oriAction, system) => (spec) => {
					spec.servers = [{ url: baseUrl }];
					return oriAction(spec);
				},
			},
		},
	},
}));
