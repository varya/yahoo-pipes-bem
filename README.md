# Yahoo pipe widget

http://varya.me/yahoo-pipes-bem/desktop.bundles/index/index.html

## Application idea

### A piece of theory
The application is implemented using [BEM methodogy](http://bem.info) and some
BEM code which has already been written and used.
BEM works with all of the technologies usually used for web interface objects (CSS, templates, JavaScript).

To learn about BEM methodology, check out the following links in English:
  * [Official web site](http://bem.info)
  * [Quick start with full BEM stack](http://bem.info/articles/start-with-project-stub/)
  * [A new method to develop frontend](http://coding.smashingmagazine.com/front-end-methodology-bem-file-system-representation/)
  @ SmashingMagazine

### Code reuse
This application uses the [bem-bl block library](https://github.com/bem/bem-bl):
 * [bem-bl repo](https://github.com/bem/bem-bl)
 * [bem-bl Documentation Site in English](http://bem.github.com/bem-bl/index.en.html)
 * [bem-bl Documentation Site in Russian](http://bem.github.com/bem-bl/index.ru.html). More information here.

Also it uses some blocks borrowed from the Yandex internal library, which are
placed into the
[blocks-ya](https://github.com/varya/yahoo-pipes-bem/tree/master/ya-blocks)
level in the application repo.

### JavaScript approach
JavaScript code for all of the blocks is written in terms of BEM. This is possible with
a helper block
`i-bem`
provided by ``bem-bl`` block library. The idea can be understood from [Tutorial
on JavaScript in BEM terms](https://github.com/varya/bem-js-tutorial).

In short, the important ideas are the following:
 * Each block has a JavaSript ``class``.
 * Each block representation is an ``instance`` of its class.
 * A block (class) is described declaratively.
 * A block (and its elements) can react on setting (or deleting) their modifiers doing something.
 * Many helpers for event delegation ideas.
 * Lazy initialization for blocks.

### Tempates
A special JavaScript-based template engine is used to turn data into HTML.

The basic information is in [xjst repo](https://github.com/veged/xjst) (in English) and at the
[BEMHTML syntax
documentation](http://bem.info/libs/bem-core/1.0.0/bemhtml/reference/)
in Russian.

Briefly, it is as declarative as XSLT but as fast as JavaScript. Actually BEMHTML code turns into ugly plain JavaScript
when compiling the project.

It is possible to be run on both client and server sides. For this application ``BEMHTML`` is
run on server under Node.js to build a pure HTML page with only a ``b-page`` block
represented. And then, all other blocks are the result of running templates on the client.

## How it works
The source data of the page is ``index.bemjson.js`` file
https://github.com/varya/yahoo-pipes-bem/blob/master/desktop.bundles/index/index.bemjson.js

It builds into HTML+CSS+JavaScipt width running `bem make` command.
It is important to note that it picks up not only
the declared block but also the ones which are mentioned in ``dependencies`` (look for ``*.deps.js`` files for blocks).

## Advantages
Speaking about advantages of using BEM for this application I would like to say:

#### Code reuse
Every technology in BEM has its own sort of inheritance. So, it is posible to reuse code from libraries by tuning it
for a particular project.

#### Encapsulation
The application is divided into independent parts (which are the blocks). So, it makes it possible to keep the code in order.

### Event delegation
All the events are watched using the idea of delegation. DOM event handlers are binded to
the ``document`` object, and BEM events are delegated from an instance to its class.

### Declarative approach
Defining `onSetMod` and `onElemSetMod` properties makes it possible to
describe a block reaction
at the setting of a modifier to a block or its element. With this it is easy to make the block consistent.
The advantage is a well-designed application and fewer bugs.

### Live (lazy) initialization
Special methods are used to ensure that an instance (block) JavaScript object occurs in
the browser memory only when it is needed. For example, when a user clicks a particular block element.

---

## Installation Requirements (for development)

- [node.js](http://nodejs.org/)

You may also consider [installing bem-tools locally to your environment](http://bem.info/tools/bem/installation/) for [ease of use](#an-easier-more-beautiful-way), though it is **not required**

---

### Installation:

So, how easy is it to get started with BEM?  *Super easy*.

It's as easy as...
    
1. ›`git clone git://github.com/bem/project-stub.git`
2. ›`cd project-stub`
3. ›`make`

*(hint: execute the above commands in your terminal)*

Now that `bem server` is running, check it out:

````
Navigate to: http://localhost:8080/desktop.bundles/index/index.html
````

(here, have a link: [http://localhost:8080/desktop.bundles/index/index.html](http://localhost:8080/desktop.bundles/index/index.html))

---

**That's it, it's that simple. Congratulations, your BEM project is already underway!**

---

[BEM](http://bem.info) is an abbreviation for Block-Element-Modifier.  [BEM](http://bem.info) is a way to write code which is easy to support and develop.

For more information about the BEM metodology check out [http://bem.info](http://bem.info/).
