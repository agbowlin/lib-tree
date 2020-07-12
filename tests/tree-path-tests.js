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
describe( `Tree Path`, function ()
{


	//---------------------------------------------------------------------
	describe( `Text Graph`, function ()
	{

		it( `should make a text graph`, function ()
		{
			result = A1.Node.TextGraph( 'Data', true, '\t', '\n' );
			LIB_ASSERT.equal( result, 'A1\n\tB1\n\t\tC1\n\t\t\tD1\n\t\t\tD2\n\t\t\tD3\n\t\tC2\n\t\tC3\n\tB2\n\t\tC4\n\t\tC5\n\t\tC6\n\tB3\n\t\tC7' );
		} );

		it( `should use alternate delimiters`, function ()
		{
			result = A1.Node.TextGraph( 'Data', true, '-', '|' );
			LIB_ASSERT.equal( result, 'A1|-B1|--C1|---D1|---D2|---D3|--C2|--C3|-B2|--C4|--C5|--C6|-B3|--C7' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Get Text Path`, function ()
	{

		it( `should get path of the root node`, function ()
		{
			result = A1.Node.TextPath( 'Data', true, '/' );
			LIB_ASSERT.equal( result, '/A1' );
		} );

		it( `should get path of the last descendant node`, function ()
		{
			result = C7.Node.TextPath( 'Data', true, '/' );
			LIB_ASSERT.equal( result, '/A1/B3/C7' );
		} );

		it( `should get path of an arbitrary node`, function ()
		{
			result = D3.Node.TextPath( 'Data', true, '/' );
			LIB_ASSERT.equal( result, '/A1/B1/C1/D3' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Find Text Path`, function ()
	{

		it( `should find the root node`, function ()
		{
			result = A1.Node.FindPath( '/A1', 'Data', true );
			LIB_ASSERT.notEqual( result, null );
			LIB_ASSERT.equal( result.Data, 'A1' );
		} );

		it( `should find the last descendant node`, function ()
		{
			result = A1.Node.FindPath( '/A1/B3/C7', 'Data', true );
			LIB_ASSERT.notEqual( result, null );
			LIB_ASSERT.equal( result.Data, 'C7' );
		} );

		it( `should find an arbitrary node`, function ()
		{
			result = A1.Node.FindPath( '/A1/B1/C1/D3', 'Data', true );
			LIB_ASSERT.notEqual( result, null );
			LIB_ASSERT.equal( result.Data, 'D3' );
		} );

	} );


} );
