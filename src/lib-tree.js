"use strict";

const tree_manipulation = require( './tree-manipulation.js' );
const tree_navigation = require( './tree-navigation.js' );
const tree_visitation = require( './tree-visitation.js' );

exports.AsNode = function ( Data )
{
	Data._hnPrevNode = null;
	Data._hnNextNode = null;
	Data._hnIndent = 0;

	Data.AddChild = tree_manipulation.AddChild;
	Data.AddChildren = tree_manipulation.AddChildren;
	Data.RemoveChild = tree_manipulation.RemoveChild;
	Data.RemoveChildren = tree_manipulation.RemoveChildren;
	return Data;
};