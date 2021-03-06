"use strict";


const TREE_TYPES = require( './tree-types.js' );


//==========================================
/**
 * @function	FindRelative
 * @memberof	Node
 * @summary
 * Finds a single other node within the hierarchy of a specific relation
 * to the given node.
 * 
 * @param		{RelationshipTypes} RelationshipType - The type of node to look for.
 * 
 * @returns		{?Object} The item found by the RelationshipType, or null if not found.
 * 
 * @description
 * The RelationshipType parameter must be one of:
 * 
 *	PrevNode : Finds the immediately previous node.
 *	NextNode : Finds the immediately next node.
 *	FirstNode : Finds the very first node. This will also always be the root node.
 *	LastNode : Finds the very last node.
 *	RootNode : Finds the root node.
 *	ParentNode : Finds the parent node.
 *	PrevSibNode : Finds the previous sibling node.
 *	NextSibNode : Finds the next sibling node.
 *	FirstSibNode : Finds the first sibling node.
 *	LastSibNode : Finds the last sibling node.
 *	FirstChildNode : Finds the first child node.
 *	LastChildNode : Finds the last child node.
 *	FirstDescNode : Finds the first descendant node.
 *	LastDescNode : Finds the last descendant node.
 *
 * D3 = C2.Prev        A1
 * C3 = C2.Next         +- B1
 * A1 = C1.First        |   +- C1
 * C7 = C1.Last         |   |   +- D1
 * A1 = C1.Root         |   |   +- D2
 * B1 = C1.Parent       |   |   +- D3
 * C1 = C2.PrevSib      |   +- C2
 * C2 = C1.NextSib      |   +- C3
 * C1 = C1.FirstSib     +- B2
 * C3 = C1.LastSib      |   +- C4
 * B1 = A1.FirstChild   |   +- C5
 * B3 = A1.LastChild    |   +- C6
 * B1 = A1.FirstDesc    +- B3
 * C7 = A1.LastDesc         +- C7
 * 
 */
//==========================================

exports.FindRelative =
	function FindRelative( RelationshipType )
	{
		var node_prev = this.PrevNode;
		var node_next = this.NextNode;
		var node_root = this;
		var node_sib = this;
		var node_child = null;
		while ( true )
		{
			if ( RelationshipType === TREE_TYPES.RelationshipTypes.PrevNode )
			{
				return this.PrevNode ? this.PrevNode.Owner : null;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.NextNode )
			{
				return this.NextNode ? this.NextNode.Owner : null;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.FirstNode )
			{
				if ( node_prev === null )
				{
					return this.Owner;
				}
				if ( node_prev.PrevNode === null )
				{
					return node_prev.Owner;
				}
				node_prev = node_prev.PrevNode;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.LastNode )
			{
				if ( node_next === null )
				{
					return this;
				}
				if ( node_next.NextNode === null )
				{
					return node_next.Owner;
				}
				node_next = node_next.NextNode;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.RootNode )
			{
				if ( node_prev === null )
				{
					return node_root ? node_root.Owner : null;
				}
				if ( node_prev.Indent < node_root.Indent )
				{
					node_root = node_prev;
				}
				node_prev = node_prev.PrevNode;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.ParentNode )
			{
				if ( node_prev === null )
				{
					return null;
				}
				if ( node_prev.Indent < this.Indent )
				{
					return node_prev.Owner;
				}
				node_prev = node_prev.PrevNode;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.PrevSibNode )
			{
				if ( node_prev === null )
				{
					return null;
				}
				if ( node_prev.Indent < this.Indent )
				{
					return null;
				}
				if ( node_prev.Indent === this.Indent )
				{
					return node_prev.Owner;
				}
				node_prev = node_prev.PrevNode;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.NextSibNode )
			{
				if ( node_next === null )
				{
					return null;
				}
				if ( node_next.Indent < this.Indent )
				{
					return null;
				}
				if ( node_next.Indent === this.Indent )
				{
					return node_next.Owner;
				}
				node_next = node_next.NextNode;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.FirstSibNode )
			{
				if ( node_prev === null )
				{
					return node_sib ? node_sib.Owner : null;
				}
				if ( node_prev.Indent < this.Indent )
				{
					return node_sib ? node_sib.Owner : null;
				}
				if ( node_prev.Indent === this.Indent )
				{
					node_sib = node_prev;
				}
				node_prev = node_prev.PrevNode;
			}
			else if ( ( RelationshipType === TREE_TYPES.RelationshipTypes.LastSibNode ) )
			{
				if ( node_next === null )
				{
					return node_sib ? node_sib.Owner : null;
				}
				if ( node_next.Indent < this.Indent )
				{
					return node_sib ? node_sib.Owner : null;
				}
				if ( node_next.Indent === this.Indent )
				{
					node_sib = node_next;
				}
				node_next = node_next.NextNode;
			}
			else if ( ( RelationshipType === TREE_TYPES.RelationshipTypes.FirstChildNode ) )
			{
				if ( node_next === null )
				{
					break;
				}
				if ( node_next.Indent <= this.Indent )
				{
					break;
				}
				if ( node_next.Indent === ( this.Indent + 1 ) )
				{
					return node_next.Owner;
				}
				node_next = node_next.NextNode;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.LastChildNode )
			{
				if ( node_next === null )
				{
					return node_child ? node_child.Owner : null;
				}
				if ( node_next.Indent <= this.Indent )
				{
					return node_child ? node_child.Owner : null;
				}
				if ( node_next.Indent === ( this.Indent + 1 ) )
				{
					node_child = node_next;
				}
				node_next = node_next.NextNode;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.FirstDescNode )
			{
				if ( node_next )
				{
					if ( node_next.Indent > this.Indent )
					{
						return node_next.Owner;
					}
				}
				break;
			}
			else if ( RelationshipType === TREE_TYPES.RelationshipTypes.LastDescNode )
			{
				if ( node_next === null )
				{
					return node_child ? node_child.Owner : null;
				}
				if ( node_next.Indent <= this.Indent )
				{
					return node_child ? node_child.Owner : null;
				}
				if ( node_next.Indent > this.Indent )
				{
					node_child = node_next;
				}
				node_next = node_next.NextNode;
			}
			else
			{
				throw Error( "Unknown RelationshipType [" + RelationshipType + "]." );
			}
		}
		return null;
	};


//==========================================
/**
 * @function	FindPrevNode
 * @memberof	Node
 * @summary
 * Find the previous node in the hierarchy.
 */
exports.FindPrevNode =
	function FindPrevNode()
	{
		if ( this.PrevNode ) { return this.PrevNode.Owner; };
		return null;
	};


//==========================================
/**
 * @function	FindNextNode
 * @memberof	Node
 * @summary
 * Find the next node in the hierarchy.
 */
exports.FindNextNode =
	function FindNextNode()
	{
		if ( this.NextNode ) { return this.NextNode.Owner; };
		return null;
	};


//==========================================
/**
 * @function	FindFirstNode
 * @memberof	Node
 * @summary
 * Find the first node in the hierarchy.
 */
exports.FindFirstNode =
	function FindFirstNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.FirstNode );
	};


//==========================================
/**
 * @function	FindLastNode
 * @memberof	Node
 * @summary
 * Find the last node in the hierarchy.
 */
exports.FindLastNode =
	function FindLastNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.LastNode );
	};


//==========================================
/**
 * @function	FindRootNode
 * @memberof	Node
 * @summary
 * Find the root node of the hierarchy.
 */
exports.FindRootNode =
	function FindRootNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.RootNode );
	};


//==========================================
/**
 * @function	FindParentNode
 * @memberof	Node
 * @summary
 * Find the parent of this node.
 */
exports.FindParentNode =
	function FindParentNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.ParentNode );
	};


//==========================================
/**
 * @function	FindPrevSiblingNode
 * @memberof	Node
 * @summary
 * Find the previous sibling of this node.
 */
exports.FindPrevSiblingNode =
	function FindPrevSiblingNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.PrevSibNode );
	};


//==========================================
/**
 * @function	FindNextSiblingNode
 * @memberof	Node
 * @summary
 * Find the next sibling of this node.
 */
exports.FindNextSiblingNode =
	function FindNextSiblingNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.NextSibNode );
	};


//==========================================
/**
 * @function	FindFirstSiblingNode
 * @memberof	Node
 * @summary
 * Find the first sibling of this node.
 */
exports.FindFirstSiblingNode =
	function FindFirstSiblingNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.FirstSibNode );
	};


//==========================================
/**
 * @function	FindLastSiblingNode
 * @memberof	Node
 * @summary
 * Find the last sibling of this node.
 */
exports.FindLastSiblingNode =
	function FindLastSiblingNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.LastSibNode );
	};


//==========================================
/**
 * @function	FindFirstChildNode
 * @memberof	Node
 * @summary
 * Find the first child of this node.
 */
exports.FindFirstChildNode =
	function FindFirstChildNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.FirstChildNode );
	};


//==========================================
/**
 * @function	FindLastChildNode
 * @memberof	Node
 * @summary
 * Find the last child of this node.
 */
exports.FindLastChildNode =
	function FindLastChildNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.LastChildNode );
	};


//==========================================
/**
 * @function	FindFirstDescendantNode
 * @memberof	Node
 * @summary
 * Find the first descendant of this node.
 * This will always be the same as FindFirstChild().
 */
exports.FindFirstDescendantNode =
	function FindFirstDescendantNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.FirstDescNode );
	};


//==========================================
/**
 * @function	FindLastDescendantNode
 * @memberof	Node
 * @summary
 * Find the last descendant of this node.
 */
exports.FindLastDescendantNode =
	function FindLastDescendantNode()
	{
		return this.FindRelative( TREE_TYPES.RelationshipTypes.LastDescNode );
	};


