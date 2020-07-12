"use strict";

const LIB_TREE = require( '../src/lib-tree.js' );
const LIB_ASSERT = require( 'assert' );


let root = null;
let result = null;
let result1 = null;


//---------------------------------------------------------------------
describe( `Tree Manipulation`, function ()
{


	//---------------------------------------------------------------------
	describe( `Node Creation`, function ()
	{

		it( `should create a node`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			LIB_ASSERT.equal( LIB_TREE.IsNode( root ), true );
			LIB_ASSERT.equal( root.iam, 'root' );
		} );

		it( `should create an empty node`, function ()
		{
			root = LIB_TREE.AsNode();
			LIB_ASSERT.equal( LIB_TREE.IsNode( root ), true );
		} );

		it( `should create a node with text`, function ()
		{
			root = LIB_TREE.AsNode( 'value' );
			LIB_ASSERT.equal( LIB_TREE.IsNode( root ), true );
			LIB_ASSERT.equal( root.Data, 'value' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Add Children`, function ()
	{

		it( `should add a child node`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChild( 'child 1' );
			LIB_ASSERT.equal( root.Node.ChildCount(), 1 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( root.Node.Child( 0 ).Data, 'child 1' );
		} );

		it( `should add an array of child nodes`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChildren( [ 'child 1', 'child 2', 'child 3' ] );
			LIB_ASSERT.equal( root.Node.ChildCount(), 3 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( root.Node.Child( 0 ).Data, 'child 1' );
			LIB_ASSERT.equal( root.Node.Child( 1 ).Data, 'child 2' );
			LIB_ASSERT.equal( root.Node.Child( 2 ).Data, 'child 3' );
		} );

		it( `should prepend a child`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChildren( [ 'child 1', 'child 2', 'child 3' ] );
			root.Node.AddChild( 'child 0', 0 );
			LIB_ASSERT.equal( root.Node.ChildCount(), 4 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( root.Node.Child( 0 ).Data, 'child 0' );
			LIB_ASSERT.equal( root.Node.Child( 1 ).Data, 'child 1' );
			LIB_ASSERT.equal( root.Node.Child( 2 ).Data, 'child 2' );
			LIB_ASSERT.equal( root.Node.Child( 3 ).Data, 'child 3' );
		} );

		it( `should append a child`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChildren( [ 'child 1', 'child 2', 'child 3' ] );
			root.Node.AddChild( 'child 4', -1 );
			LIB_ASSERT.equal( root.Node.ChildCount(), 4 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( root.Node.Child( 0 ).Data, 'child 1' );
			LIB_ASSERT.equal( root.Node.Child( 1 ).Data, 'child 2' );
			LIB_ASSERT.equal( root.Node.Child( 2 ).Data, 'child 3' );
			LIB_ASSERT.equal( root.Node.Child( 3 ).Data, 'child 4' );
		} );

		it( `should insert a child`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChildren( [ 'child 1', 'child 3', 'child 4' ] );
			root.Node.AddChild( 'child 2', 1 );
			LIB_ASSERT.equal( root.Node.ChildCount(), 4 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( root.Node.Child( 0 ).Data, 'child 1' );
			LIB_ASSERT.equal( root.Node.Child( 1 ).Data, 'child 2' );
			LIB_ASSERT.equal( root.Node.Child( 2 ).Data, 'child 3' );
			LIB_ASSERT.equal( root.Node.Child( 3 ).Data, 'child 4' );
		} );

	} );


	//---------------------------------------------------------------------
	describe( `Remove Children`, function ()
	{

		it( `should remove a child node`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChild( 'child 1' );
			result = root.Node.RemoveChild( 0 );
			LIB_ASSERT.equal( root.Node.ChildCount(), 0 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
		} );

		it( `should remove all children`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChildren( [ 'child 1', 'child 2', 'child 3' ] );
			result = root.Node.RemoveChildren();
			LIB_ASSERT.equal( root.Node.ChildCount(), 0 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( result.length, 3 );
		} );

		it( `should remove the first child`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChildren( [ 'child 1', 'child 2', 'child 3' ] );
			result = root.Node.RemoveChild( 0 );
			LIB_ASSERT.equal( root.Node.ChildCount(), 2 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( LIB_TREE.IsNode( result ), false );
		} );

		it( `should remove the last child`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChildren( [ 'child 1', 'child 2', 'child 3' ] );
			result = root.Node.RemoveChild( 2 );
			LIB_ASSERT.equal( root.Node.ChildCount(), 2 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( LIB_TREE.IsNode( result ), false );
		} );

		it( `should remove a specific child`, function ()
		{
			root = LIB_TREE.AsNode( { iam: 'root' } );
			root.Node.AddChildren( [ 'child 1', 'child 2', 'child 3' ] );
			result = root.Node.RemoveChild( 1 );
			LIB_ASSERT.equal( root.Node.ChildCount(), 2 );
			LIB_ASSERT.equal( root.Node.ChildCount(), root.Node.Children().length );
			LIB_ASSERT.equal( LIB_TREE.IsNode( result ), false );
		} );

	} );


} );
