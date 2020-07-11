"use strict";

const LIB_TREE = require( '../src/lib-tree.js' );
const LIB_ASSERT = require( 'assert' );


let result = null;
let result1 = null;


//---------------------------------------------------------------------
describe( `Tree Manipulation`, function ()
{


	//---------------------------------------------------------------------
	describe( `Tree Creation`, function ()
	{
		it( `should create a root tree node"`, function ()
		{
			result = LIB_TREE.AsNode( { iam: 'root' } );
			LIB_ASSERT.equal( result.iam, 'root' );
		} );
	} );


	//---------------------------------------------------------------------
	describe( `Add and Remove Children`, function ()
	{
		it( `should add a child node"`, function ()
		{
			result = LIB_TREE.AsNode( { iam: 'root' } );
			result.AddChild( { value: 123 } );
			LIB_ASSERT.equal( result.iam, 'root' );
		} );
	} );


} );
