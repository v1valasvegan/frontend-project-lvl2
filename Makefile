install:
		make install-deps

install-deps:
		npm ci

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

test-coverage:
	npm test -- --coverage

make rec:
	asciinema rec

