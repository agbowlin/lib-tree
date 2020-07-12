"use strict";


const TREE_TYPES = require( './tree-types.js' );
const TREE_CHILDREN = require( './tree-children.js' );
const TREE_NAVIGATION = require( './tree-navigation.js' );
const TREE_PATH = require( './tree-path.js' );
const TREE_VISITATION = require( './tree-visitation.js' );


//==========================================
// Library Data Types
exports.RelationshipTypes = TREE_TYPES.RelationshipTypes;
exports.VisitationTypes = TREE_TYPES.VisitationTypes;


//==========================================
/**
 * @function	AsNode
 * @memberof	lib-tree
 * 
 * @summary
 * Creates a root node.
 * 
 * @param		{Object=} [Item = Object] - The data item of the root node.
 * 					If `Item` is not an `object`, a new object is created and
 * 					the passed value will be set to `Item.Data`.
 * 
 * @returns		{!Object} The data item.
 */
exports.AsNode =
	function AsNode( Item )
	{
		if ( typeof Item !== 'object' ) { Item = { Data: Item }; }

		Item.Node = {};

		//==========================================
		/**
		 * @member		{Object} Owner
		 * @memberof	Node
		 * @summary		The owner data object of the given node.
		 */
		Item.Node.Owner = Item;

		//==========================================
		/**
		 * @member		{Object} PrevNode
		 * @memberof	Node
		 * @summary		The previous node of the given node.
		 */
		Item.Node.PrevNode = null;

		//==========================================
		/**
		 * @member		{Object} NextNode
		 * @memberof	Node
		 * @summary		The next node of the given node.
		 */
		Item.Node.NextNode = null;

		//==========================================
		/**
		 * @member		{Number} Indent
		 * @memberof	Node
		 * @summary		The indent level of the given node.
		 */
		Item.Node.Indent = 0;

		//==========================================
		/**
		 * @function	AddChild
		 * @memberof	Node
		 * 
		 * @summary		Adds a new item as a child of this node.
		 * 
		 * @param		{Object=} [ChildItem = Object] - The child object to add.
		 * @param		{number=} [ChildIndex = -1] - The index at which to add the child.
		 * 											Use -1 to append.
		 * 
		 * @returns		{!Object} The newly added child item.
		 */
		Item.Node.AddChild =
			function AddChild( ChildItem, ChildIndex )
			{

				function link_node( Node, PrevNode, NextNode )
				{
					if ( Node.PrevNode || Node.NextNode )
					{
						throw new Error( "This node is already linked." );
					}
					Node.PrevNode = PrevNode;
					Node.NextNode = NextNode;
					if ( Node.PrevNode )
					{
						Node.PrevNode.NextNode = Node;
					}
					if ( Node.NextNode )
					{
						Node.NextNode.PrevNode = Node;
					}
					return Node;
				};

				if ( typeof ChildIndex === 'undefined' ) ChildIndex = -1;
				ChildItem = AsNode( ChildItem );

				var prev_node = this;
				var next_node = this.NextNode;
				while ( next_node )
				{
					if ( next_node.Indent === ( this.Indent + 1 ) )
					{
						// A direct child was found.
						if ( ChildIndex === 0 )
						{
							// This is the child we are looking for. Insert.
							link_node( ChildItem.Node, prev_node, next_node );
							ChildItem.Node.Indent = this.Indent + 1;
							return ChildItem;
						}
						ChildIndex--;
					}
					else if ( next_node.Indent <= this.Indent )
					{
						// No more child nodes. Append.
						link_node( ChildItem.Node, prev_node, next_node );
						ChildItem.Node.Indent = this.Indent + 1;
						return ChildItem;
					}
					// Update the nodes we are looking for.
					prev_node = next_node;
					next_node = next_node.NextNode;
				}

				// No more nodes. Append.
				link_node( ChildItem.Node, prev_node, null );
				ChildItem.Node.Indent = this.Indent + 1;

				return ChildItem;
			};


		//==========================================
		// Additional Children Functions
		Item.Node.ChildCount = TREE_CHILDREN.ChildCount;
		Item.Node.Children = TREE_CHILDREN.Children;
		Item.Node.Child = TREE_CHILDREN.Child;

		Item.Node.DescendantCount = TREE_CHILDREN.DescendantCount;
		Item.Node.Descendants = TREE_CHILDREN.Descendants;
		Item.Node.Descendant = TREE_CHILDREN.Descendant;

		Item.Node.AddChildren = TREE_CHILDREN.AddChildren;
		Item.Node.RemoveChild = TREE_CHILDREN.RemoveChild;
		Item.Node.RemoveChildren = TREE_CHILDREN.RemoveChildren;


		//==========================================
		// Additional Navigation Functions
		Item.Node.FindRelative = TREE_NAVIGATION.FindRelative;

		Item.Node.FindFirstNode = TREE_NAVIGATION.FindFirstNode;
		Item.Node.FindLastNode = TREE_NAVIGATION.FindLastNode;
		Item.Node.FindRootNode = TREE_NAVIGATION.FindRootNode;
		Item.Node.FindParentNode = TREE_NAVIGATION.FindParentNode;
		Item.Node.FindPrevSiblingNode = TREE_NAVIGATION.FindPrevSiblingNode;
		Item.Node.FindNextSiblingNode = TREE_NAVIGATION.FindNextSiblingNode;
		Item.Node.FindFirstSiblingNode = TREE_NAVIGATION.FindFirstSiblingNode;
		Item.Node.FindLastSiblingNode = TREE_NAVIGATION.FindLastSiblingNode;
		Item.Node.FindFirstChildNode = TREE_NAVIGATION.FindFirstChildNode;
		Item.Node.FindLastChildNode = TREE_NAVIGATION.FindLastChildNode;
		Item.Node.FindFirstDescendentNode = TREE_NAVIGATION.FindFirstDescendentNode;
		Item.Node.FindLastDescendentNode = TREE_NAVIGATION.FindLastDescendentNode;


		//==========================================
		// Additional Visitation Functions
		Item.Node.VisitNodes = TREE_VISITATION.VisitNodes;


		//==========================================
		// Additional Path Functions
		Item.Node.TextGraph = TREE_PATH.TextGraph;
		Item.Node.TextPath = TREE_PATH.TextPath;
		Item.Node.FindPath = TREE_PATH.FindPath;


		// Return the item.
		return Item;
	};


//==========================================
/**
 * @function	IsNode
 * @memberof	lib-tree
 * 
 * @summary
 * Determines if an item is a node.
 * 
 * @param		{Object} [Item] - The data item to inspect.
 * 
 * @returns		{boolean} Returns `true` if `Item` is a node, otherwise `false`.
 */
exports.IsNode =
	function IsNode( Item )
	{
		if ( typeof Item !== 'object' ) { return false; }
		if ( typeof Item.Node === 'undefined' ) { return false; }
		return true;
	};


