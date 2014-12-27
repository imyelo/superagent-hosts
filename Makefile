MOCHA = ./node_modules/.bin/mocha

test:
	$(MOCHA) --reporter list

.PHONY: test