"use strict";

const LIB_TREE = require( '../src/lib-tree.js' );
const LIB_ASSERT = require( 'assert' );

// D3 = C2.PrevNode        A1
// C3 = C2.NextNode         +- B1
// A1 = C1.FirstNode        |   +- C1
// C7 = C1.LastNode         |   |   +- D1
// A1 = C1.RootNode         |   |   +- D2
// B1 = C1.ParentNode       |   |   +- D3
// C1 = C2.PrevSibNode      |   +- C2
// C2 = C1.NextSibNode      |   +- C3
// C1 = C1.FirstSibNode     +- B2
// C3 = C1.LastSibNode      |   +- C4
// B1 = A1.FirstChildNode   |   +- C5
// B3 = A1.LastChildNode    |   +- C6
// B1 = A1.FirstDescNode    +- B3
// C7 = A1.LastDescNode         +- C7


let A1 = LIB_TREE.AsNode( 'A1' );
let B1 = A1.Node.AddChild( 'B1' );
let C1 = B1.Node.AddChild( 'C1' );
let D1 = C1.Node.AddChild( 'D1' );
let D2 = C1.Node.AddChild( 'D2' );
let D3 = C1.Node.AddChild( 'D3' );
let C2 = B1.Node.AddChild( 'C2' );
let C3 = B1.Node.AddChild( 'C3' );
let B2 = A1.Node.AddChild( 'B2' );
let C4 = B2.Node.AddChild( 'C4' );
let C5 = B2.Node.AddChild( 'C5' );
let C6 = B2.Node.AddChild( 'C6' );
let B3 = A1.Node.AddChild( 'B3' );
let C7 = B3.Node.AddChild( 'C7' );

let result = null;

//---------------------------------------------------------------------
describe( `Tree Navigation`, function ()
{


	//---------------------------------------------------------------------
	describe( `Find Nodes`, function ()
	{

		it( `should find PrevNode`, function ()
		{
			result = C2.Node.FindPrevNode();
			LIB_ASSERT.equal( result.Data, 'D3' );
		} );

		it( `should find NextNode`, function ()
		{
			result = C2.Node.FindNextNode();
			LIB_ASSERT.equal( result.Data, 'C3' );
		} );

		it( `should find FirstNode`, function ()
		{
			result = C1.Node.FindFirstNode();
			LIB_ASSERT.equal( result.Data, 'A1' );
		} );

		it( `should find LastNode`, function ()
		{
			result = C1.Node.FindLastNode();
			LIB_ASSERT.equal( result.Data, 'C7' );
		} );

		it( `should find RootNode`, function ()
		{
			result = C1.Node.FindRootNode();
			LIB_ASSERT.equal( result.Data, 'A1' );
		} );

		it( `should find ParentNode`, function ()
		{
			result = C1.Node.FindParentNode();
			LIB_ASSERT.equal( result.Data, 'B1' );
		} );

		it( `should find PrevSiblingNode`, function ()
		{
			result = C2.Node.FindPrevSiblingNode();
			LIB_ASSERT.equal( result.Data, 'C1' );
		} );

		it( `should find NextSiblingNode`, function ()
		{
			result = C1.Node.FindNextSiblingNode();
			LIB_ASSERT.equal( result.Data, 'C2' );
		} );

		it( `should find FirstSiblingNode`, function ()
		{
			result = C1.Node.FindFirstSiblingNode();
			LIB_ASSERT.equal( result.Data, 'C1' );
		} );

		it( `should find LastSiblingNode`, function ()
		{
			result = C1.Node.FindLastSiblingNode();
			LIB_ASSERT.equal( result.Data, 'C3' );
		} );

		it( `should find FirstChildNode`, function ()
		{
			result = A1.Node.FindFirstChildNode();
			LIB_ASSERT.equal( result.Data, 'B1' );
		} );

		it( `should find LastChildNode`, function ()
		{
			result = A1.Node.FindLastChildNode();
			LIB_ASSERT.equal( result.Data, 'B3' );
		} );

		it( `should find FirstDescendantNode`, function ()
		{
			result = A1.Node.FindFirstDescendantNode();
			LIB_ASSERT.equal( result.Data, 'B1' );
		} );

		it( `should find LastDescendantNode`, function ()
		{
			result = A1.Node.FindLastDescendantNode();
			LIB_ASSERT.equal( result.Data, 'C7' );
		} );

	} );


} );
