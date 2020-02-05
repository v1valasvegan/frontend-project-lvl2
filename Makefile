install lint:
		npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-babel babel-eslint

publish:
		npm publish --dry-run

publink:
		npm publish --dry-run | npm link

start:
		npx node src/bin/gendiff.js

test:
	npx jest

build:
		npm run build