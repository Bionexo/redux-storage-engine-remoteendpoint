BIN = ./node_modules/.bin
NPM = npm

#
# INSTALL
#

install: node_modules/

node_modules/: package.json
	echo "> Installing ..."
	$(NPM) --ignore-scripts install > /dev/null
	touch node_modules/

#
# CLEAN
#

clean:
	echo "> Cleaning ..."
	rm -rf build/

mrproper: clean
	echo "> Cleaning deep ..."
	rm -rf node_modules/

#
# BUILD
#

build: clean install
	echo "> Building ..."
	$(BIN)/babel src/ --out-dir build/

build-watch: clean install
	echo "> Building forever ..."
	$(BIN)/babel src/ --out-dir build/ --watch

#
# TEST
#

lint: install
	echo "> Linting ..."
	$(BIN)/gulp lint

lint-watch: install
	echo "> Linting ..."
	$(BIN)/gulp lint:watch

test: install
	echo "> Testing ..."
	$(BIN)/mocha test/ --compilers js:babel-register --recursive

test-watch: install
	echo "> Testing forever ..."
	$(BIN)/mocha test/ --compilers js:babel-register --recursive --watch


#
# MAKEFILE
#

.PHONY: \
	install \
	clean mrproper \
	build build-watch \
	lint test test-watch

.SILENT:
