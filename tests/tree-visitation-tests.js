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
describe( `Tree Visitation`, function ()
{


	//---------------------------------------------------------------------
	describe( `Visit Nodes`, function ()
	{

		it( `should visit all nodes`, function ()
		{
			result = [];
			A1.Node.VisitAllNodes( function ( Item ) { result.push( Item ); } );
			LIB_ASSERT.equal( result.length, 14 );
		} );

		it( `should visit all nodes from anywhere`, function ()
		{
			result = [];
			C2.Node.VisitAllNodes( function ( Item ) { result.push( Item ); } );
			LIB_ASSERT.equal( result.length, 14 );
		} );

		it( `should visit previous nodes`, function ()
		{
			result = [];
			C3.Node.VisitPrevNodes( function ( Item ) { result.push( Item ); }, true );
			LIB_ASSERT.equal( result.length, 8 );
			result = [];
			C3.Node.VisitPrevNodes( function ( Item ) { result.push( Item ); }, false );
			LIB_ASSERT.equal( result.length, 7 );
		} );

		it( `should visit next nodes`, function ()
		{
			result = [];
			C3.Node.VisitNextNodes( function ( Item ) { result.push( Item ); }, true );
			LIB_ASSERT.equal( result.length, 7 );
			result = [];
			C3.Node.VisitNextNodes( function ( Item ) { result.push( Item ); }, false );
			LIB_ASSERT.equal( result.length, 6 );
		} );

		it( `should visit parent nodes`, function ()
		{
			result = [];
			C3.Node.VisitParentNodes( function ( Item ) { result.push( Item ); }, true );
			LIB_ASSERT.equal( result.length, 3 );
			result = [];
			C3.Node.VisitParentNodes( function ( Item ) { result.push( Item ); }, false );
			LIB_ASSERT.equal( result.length, 2 );
		} );

		it( `should visit previous sibling nodes`, function ()
		{
			result = [];
			C2.Node.VisitPrevSibNodes( function ( Item ) { result.push( Item ); }, true );
			LIB_ASSERT.equal( result.length, 2 );
			result = [];
			C2.Node.VisitPrevSibNodes( function ( Item ) { result.push( Item ); }, false );
			LIB_ASSERT.equal( result.length, 1 );
		} );

		it( `should visit next sibling nodes`, function ()
		{
			result = [];
			C2.Node.VisitNextSibNodes( function ( Item ) { result.push( Item ); }, true );
			LIB_ASSERT.equal( result.length, 2 );
			result = [];
			C2.Node.VisitNextSibNodes( function ( Item ) { result.push( Item ); }, false );
			LIB_ASSERT.equal( result.length, 1 );
		} );

		it( `should visit child nodes`, function ()
		{
			result = [];
			B1.Node.VisitChildNodes( function ( Item ) { result.push( Item ); }, true );
			LIB_ASSERT.equal( result.length, 4 );
			result = [];
			B1.Node.VisitChildNodes( function ( Item ) { result.push( Item ); }, false );
			LIB_ASSERT.equal( result.length, 3 );
		} );

		it( `should visit descendant nodes`, function ()
		{
			result = [];
			B1.Node.VisitDescendantNodes( function ( Item ) { result.push( Item ); }, true );
			LIB_ASSERT.equal( result.length, 7 );
			result = [];
			B1.Node.VisitDescendantNodes( function ( Item ) { result.push( Item ); }, false );
			LIB_ASSERT.equal( result.length, 6 );
		} );

	} );


} );
