
# lib-tree

```
formerly...
	 _ _  _            _ _         _        _  ___ 
	| | |<_> ___  _ _ | \ | ___  _| | ___  | |/ __>
	|   || |/ ._>| '_>|   |/ . \/ . |/ ._>_| |\__ \
	|_|_||_|\___.|_|  |_\_|\___/\___|\___.\__/<___/
```                                             

```
	D3 = C2.Prev        A1
	C3 = C2.Next         +- B1
	A1 = C1.First        |   +- C1
	C7 = C1.Last         |   |   +- D1
	A1 = C1.Root         |   |   +- D2
	B1 = C1.Parent       |   |   +- D3
	C1 = C2.PrevSib      |   +- C2
	C2 = C1.NextSib      |   +- C3
	C1 = C1.FirstSib     +- B2
	C3 = C1.LastSib      |   +- C4
	B1 = A1.FirstChild   |   +- C5
	B3 = A1.LastChild    |   +- C6
	B1 = A1.FirstDesc    +- B3
	C7 = A1.LastDesc         +- C7
```

---------------------------------------------------------------------

## Installation

**Bower**

	<not yet supported>

**NPM**

	npm install @liquicode/lib-tree

---------------------------------------------------------------------

## Usage

**Using with Simple Objects**
```js
const libTree = require('lib-tree');

// Create a (root) node.
let root = libTree.AsNode('Root Node');

// Create a child node.
let alice = root.Node.AddChild('Alice'); // alice.Data === 'Alice'

// Create children of children.
let sue = child.Node.AddChild('Sue'); // sue.Data === 'Sue'
let sam = child.Node.AddChild('Sam'); // sam.Data === 'Sam'

// Create many children at once.
root.Node.AddChildren(['Bob', 'Eve']);

// Access children by child index.
let bob = root.Node.Child( 1 ); // bob.Data === 'Bob'
let eve = root.Node.Child( 2 ); // eve.Data === 'Eve'

// Navigate relationships.
let alice_children = alice.Node.Children(); // [ 'Sue', 'Sam' ]
let sue_parent = sue.Node.FindParentNode(); // sue_parent.Data === 'Alice'
let sue_sibling = sue.Node.FindNextSiblingNode()); // sue_sibling.Data === 'Sam'
```

**Using with Objects**
```js
const libTree = require('lib-tree');

// Create a root node for "People".
var people = libTree.AsNode( { "Name": "People", "IsGroup": true } );

// Create some People objects.
let alice = people.Node.AddChild( { "Name": "Alice", "Age": 22, "Dept": "IT" } );
let bob = people.Node.AddChild( { "Name": "Bob", "Age": 24, "Dept": "IT" } );
let eve = people.Node.AddChild( { "Name": "Eve", "Age": 29, "Dept": "HR" } );
```


---------------------------------------------------------------------

## License

The MIT License

Copyright © 2015-2020 Andre' G. Bowlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------

## TODO

- More formal build tool (gulp or grunt?)
