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

lint:
		npx eslint .

build:
		npm run build

test-coverage:
		npm test -- --coverage

rec:
		asciinema rec
