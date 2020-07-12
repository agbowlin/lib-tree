"use strict";


const TREE_TYPES = require( './tree-types.js' );


//==========================================
/**
 * @function	ChildCount
 * @memberof	Node
 * @summary		Gets the count of immediate child items.
 * @returns		{Number} The number of immediate child items.
 */
exports.ChildCount =
	function ChildCount()
	{
		let child_count = 0;
		this.VisitNodes(
			TREE_TYPES.VisitationTypes.ChildNodes,
			function ( Item ) 
			{
				child_count++;
				return;
			},
			false
		);
		return child_count;
	};


//==========================================
/** 
 * @function	Children
 * @memberof	Node
 * @summary		Gets an array of the immediate child items.
 * @returns		{Array} Array of the immediate child items.
 */
exports.Children =
	function Children()
	{
		let child_items = [];
		this.VisitNodes(
			TREE_TYPES.VisitationTypes.ChildNodes,
			function ( Item ) 
			{
				child_items.push( Item );
				return;
			},
			false
		);
		return child_items;
	};


//==========================================
/**
 * @function	Child
 * @memberof	Node
 * @summary		Gets an item by its child index.
 * @param		{Number} ChildIndex - The index of the child to find.
 * @returns		{Object} The child item at `ChildIndex` or `null` if not found.
 */
exports.Child =
	function Child( ChildIndex )
	{
		let child_index = 0;
		let child_item = this.VisitNodes(
			TREE_TYPES.VisitationTypes.ChildNodes,
			function ( Item ) 
			{
				if ( child_index === ChildIndex ) { return Item; }
				child_index++;
				return;
			},
			false
		);
		if ( typeof child_item === 'undefined' ) { child_item = null; }
		return child_item;
	};


//==========================================
/**
 * @function	DescendantCount
 * @memberof	Node
 * @summary		Gets the count of descendant items.
 * @returns		{Number} The number of descendant items.
 */
exports.DescendantCount =
	function DescendantCount()
	{
		let desc_count = 0;
		this.VisitNodes(
			TREE_TYPES.VisitationTypes.DescendantNodes,
			function ( Item ) 
			{
				desc_count++;
				return;
			},
			false
		);
		return desc_count;
	};


//==========================================
/** 
 * @function	Descendants
 * @memberof	Node
 * @summary		Gets an array of the descendant items.
 * @returns		{Array} Array of the descendant items.
 */
exports.Descendants =
	function Descendants()
	{
		let desc_items = [];
		this.VisitNodes(
			TREE_TYPES.VisitationTypes.DescendantNodes,
			function ( Item ) 
			{
				desc_items.push( Item );
				return;
			},
			false
		);
		return desc_items;
	};


//==========================================
/**
 * @function	Descendant
 * @memberof	Node
 * @summary		Gets an item by its descendant index.
 * @param		{Number} DescendantIndex - The index of the descendant to find.
 * @returns		{Object} The descendant item at `DescendantIndex` or `null` if not found.
 */
exports.Descendant =
	function Descendant( DescendantIndex )
	{
		let desc_index = 0;
		let desc_item = this.VisitNodes(
			TREE_TYPES.VisitationTypes.DescendantNodes,
			function ( Item ) 
			{
				if ( desc_index === DescendantIndex ) { return Item; }
				desc_index++;
				return;
			},
			false
		);
		if ( typeof desc_item === 'undefined' ) { desc_item = null; }
		return desc_item;
	};


//==========================================
/**
 * @function	AddChildren
 * @memberof	Node
 * @summary		Adds an array of data objects as children to this node.
 * 
 * @param		{Array} ChildItems - The array of data objects to add.
 * 
 * @returns		{Array} The `Items` array passed in.
 */
exports.AddChildren =
	function AddChildren( ChildItems )
	{
		if ( ChildItems.length > 0 )
		{
			ChildItems.forEach( Item => this.AddChild( Item ) );
		}
		return ChildItems;
	};


//==========================================
/**
 * @function	RemoveChild
 * @memberof	Node
 * @summary		Removes a child node of this node.
 * 
 * @param		{number} ChildIndex - The index of the child to remove.
 * 
 * @returns		{?Object} The removed child item.
 */
exports.RemoveChild =
	function RemoveChild( ChildIndex )
	{
		let child_item = this.Child( ChildIndex );
		if ( !child_item ) { return null; }

		let last_desc_item = child_item.Node.FindRelative( TREE_TYPES.RelationshipTypes.LastDescNode );
		if ( last_desc_item )
		{
			child_item.Node.PrevNode.NextNode = last_desc_item.Node.NextNode;
			if ( last_desc_item.Node.NextNode )
			{
				last_desc_item.Node.NextNode.PrevNode = child_item.Node.PrevNode;
			}
		}
		else
		{
			child_item.Node.PrevNode.NextNode = null;
		}

		delete child_item.Node;
		return child_item;
	};


//==========================================
/**
 * @function	RemoveChildren
 * @memberof	Node
 * @summary		Removes all child nodes from this node.
 * @returns		{Array} Array of the removed child items.
*/
exports.RemoveChildren =
	function RemoveChildren()
	{
		let child_items = this.Children();
		var last_desc_item = this.FindRelative( TREE_TYPES.RelationshipTypes.LastDescNode );
		if ( last_desc_item )
		{
			last_desc_item.Node.PrevNode = this;
			this.NextNode = last_desc_item.Node.NextNode;
			if ( last_desc_item.Node.NextNode )
			{
				last_desc_item.Node.NextNode.PrevNode = this;
			}
		}
		child_items.forEach( Item => delete Item.Node );
		return child_items;
	};

