export const DiKeysService = {
	authentication: Symbol.for("AuthenticationService"),
	theme: Symbol.for("ThemeService"),
	localStorage: {
		settings: Symbol.for("LocalStorageService:elyspio-authentication-settings"),
		validation: Symbol.for("LocalStorageService:elyspio-authentication-validation"),
	},
	core: {
		runner: Symbol.for("RunnerService"),
	},
};
