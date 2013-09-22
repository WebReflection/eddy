.PHONY: build var node dom bench amd size hint clean test web preview pages dependencies

# repository name
REPO = eddy

# make var files
VAR = src/a.$(REPO).js\
      src/$(REPO).js\
      src/pollute.js\
      src/pollute.array.js\
      src/z.$(REPO).js

# make dom files
DOM = src/a.$(REPO).js\
      src/$(REPO).js\
      src/pollute.js\
      src/pollute.array.js\
      src/pollute.dom.all.js\
      src/pollute.dom.js\
      src/z.$(REPO).js

# make node files
NODE = $(VAR)

# make amd files
AMD = $(DOM)

# README constant


# default build task
build:
	make clean
	make var
	make dom
	make node
	make amd
	make test
	make hint
	make size
	make domsize
#	make bench

# build generic version
var:
	mkdir -p build
	cat template/var.before $(VAR) template/var.after >build/no-copy.$(REPO).max.js
	node node_modules/uglify-js/bin/uglifyjs --verbose build/no-copy.$(REPO).max.js >build/no-copy.$(REPO).js
	cat template/license.before LICENSE.txt template/license.after build/no-copy.$(REPO).max.js >build/$(REPO).max.js
	cat template/copyright build/no-copy.$(REPO).js >build/$(REPO).js
	rm build/no-copy.$(REPO).max.js
	rm build/no-copy.$(REPO).js

# build generic version
dom:
	mkdir -p build
	cat template/var.before $(DOM) template/var.after >build/no-copy.$(REPO).dom.max.js
	node node_modules/uglify-js/bin/uglifyjs --verbose build/no-copy.$(REPO).dom.max.js >build/no-copy.$(REPO).dom.js
	cat template/license.before LICENSE.txt template/license.after build/no-copy.$(REPO).dom.max.js >build/$(REPO).dom.max.js
	cat template/copyright build/no-copy.$(REPO).dom.js >build/$(REPO).dom.js
	rm build/no-copy.$(REPO).dom.max.js
	rm build/no-copy.$(REPO).dom.js
	cp ie8/build/ie8.js build/ie8.js

# build node.js version
node:
	mkdir -p build
	cat template/license.before LICENSE.txt template/license.after template/node.before $(NODE) template/node.after >build/$(REPO).node.js

# build AMD version
amd:
	mkdir -p build
	cat template/amd.before $(AMD) template/amd.after >build/no-copy.$(REPO).amd.max.js
	node node_modules/uglify-js/bin/uglifyjs --verbose build/no-copy.$(REPO).amd.max.js >build/no-copy.$(REPO).amd.js
	cat template/license.before LICENSE.txt template/license.after build/no-copy.$(REPO).amd.max.js >build/$(REPO).amd.max.js
	cat template/copyright build/no-copy.$(REPO).amd.js >build/$(REPO).amd.js
	rm build/no-copy.$(REPO).amd.max.js
	rm build/no-copy.$(REPO).amd.js
	cp ie8/build/ie8.js build/ie8.js

size:
	wc -c build/$(REPO).max.js
	gzip -c build/$(REPO).js | wc -c

domsize:
	wc -c build/$(REPO).dom.max.js
	gzip -c build/$(REPO).dom.js | wc -c

# hint built file
hint:
	node node_modules/jshint/bin/jshint build/$(REPO).max.js
	node node_modules/jshint/bin/jshint build/$(REPO).dom.max.js

# clean/remove build folder
clean:
	rm -rf build

# tests, as usual and of course
test:
	npm test

# tests, as usual and of course
bench:
	node ./benchmark/eddy.js

rebench:
	rm benchmark/score.json
	make bench



# launch polpetta (ctrl+click to open the page)
web:
	node node_modules/polpetta/build/polpetta ./

# markdown the readme and view it
preview:
	node_modules/markdown/bin/md2html.js README.md >README.md.htm
	cat template/md.before README.md.htm template/md.after >README.md.html
	open README.md.html
	sleep 3
	rm README.md.htm README.md.html

pages:
	git pull --rebase
	make dom
	mkdir -p ~/tmp
	mkdir -p ~/tmp/$(REPO)
	cp -rf src ~/tmp/$(REPO)
	cp -rf build ~/tmp/$(REPO)
	cp -rf test ~/tmp/$(REPO)
	cp index.html ~/tmp/$(REPO)
	git checkout gh-pages
	mkdir -p test
	rm -rf test
	cp -rf ~/tmp/$(REPO) test
	git add test
	git add test/.
	git commit -m 'automatic test generator'
	git push
	git checkout master
	rm -r ~/tmp/$(REPO)

# modules used in this repo
dependencies:
	rm -rf node_modules
	mkdir node_modules
	npm install wru
	npm install polpetta
	npm install uglify-js@1
	npm install jshint
	npm install markdown
