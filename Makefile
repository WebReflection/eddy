.PHONY: build var node amd size hint clean test web preview pages dependencies

# repository name
REPO = eddy

# make var files
VAR = src/a.$(REPO).js\
      src/$(REPO).js\
      src/$(REPO).pollute.js\
      src/z.$(REPO).js

# make dom files
DOM = src/a.$(REPO).js\
      src/$(REPO).js\
      src/dominable.js\
      src/$(REPO).pollute.dom.all.js\
      src/z.$(REPO).js

# make IE < 9 files
IElt9 = src/a.$(REPO).js\
      src/$(REPO).js\
      src/dominable.js\
      src/$(REPO).pollute.dom.ie.js\
      src/z.$(REPO).js

# make node files
NODE = $(VAR)

# make amd files
AMD = $(VAR)

# make amd dom files
AMDOM = $(DOM)

# README constant


# default build task
build:
	make clean
	make var
	make dom
	make ie
	make node
	make amd
	make test
	make hint
	make size
	make domsize
	make iesize

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

# build IE version
ie:
	mkdir -p build
	cat template/var.before $(IElt9) template/var.after >build/no-copy.$(REPO).ie.max.js
	node node_modules/uglify-js/bin/uglifyjs --verbose build/no-copy.$(REPO).ie.max.js >build/no-copy.$(REPO).ie.js
	cat template/license.before LICENSE.txt template/license.after build/no-copy.$(REPO).ie.max.js >build/$(REPO).ie.max.js
	cat template/copyright build/no-copy.$(REPO).ie.js >build/$(REPO).ie.js
	rm build/no-copy.$(REPO).ie.max.js
	rm build/no-copy.$(REPO).ie.js

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

size:
	wc -c build/$(REPO).max.js
	gzip -c build/$(REPO).js | wc -c

domsize:
	wc -c build/$(REPO).dom.max.js
	gzip -c build/$(REPO).dom.js | wc -c

iesize:
	wc -c build/$(REPO).ie.max.js
	gzip -c build/$(REPO).ie.js | wc -c

# hint built file
hint:
	node node_modules/jshint/bin/jshint build/$(REPO).max.js
	node node_modules/jshint/bin/jshint build/$(REPO).dom.max.js
	node node_modules/jshint/bin/jshint build/$(REPO).ie.max.js

# clean/remove build folder
clean:
	rm -rf build

# tests, as usual and of course
test:
	npm test

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
	make var
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
