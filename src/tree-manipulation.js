"use strict";


//==========================================
/**
 * @function Link
 * @memberof HierNodeLib.HierNode
 * @private
 * 
 * @summary Links a node within a doubly-linked list.
 * 
 * @param {Object} PrevNode - The previous node to link to.
 * @param {Object} NextNode - The next node to link to.
 * 
 * @returns {!Object} `this`
 */
function Link( Node, PrevNode, NextNode )
{
	if ( Node._hnPrevNode || Node._hnNextNode )
	{
		throw new Error( "This node is already linked." );
	}
	Node._hnPrevNode = PrevNode;
	Node._hnNextNode = NextNode;
	if ( Node._hnPrevNode )
	{
		Node._hnPrevNode._hnNextNode = Node;
	}
	if ( Node._hnNextNode )
	{
		Node._hnNextNode._hnPrevNode = Node;
	}
	return Node;
};


//==========================================
/**
 * @function Unlink
 * @memberof HierNodeLib.HierNode
 * @private
 * 
 * @summary
 * Unlinks a node from a doubly-linked list and relinks its Previous and
 * Next nodes if they exist.
 * 
 * @returns {!Object} `this`
 */
function Unlink( Node )
{
	var prev_node = Node._hnPrevNode;
	var next_node = Node._hnNextNode;
	delete Node._hnPrevNode;
	delete Node._hnNextNode;
	delete Node._hnIndent;
	if ( prev_node )
	{
		prev_node._hnNextNode = next_node;
	}
	if ( next_node )
	{
		next_node._hnPrevNode = prev_node;
	}
	return Node;
};


//==========================================
/**
 * @function AddChild
 * @memberof HierNodeLib.HierNode
 * 
 * @summary Adds a new item as a child of ThisNode.
 * 
 * @param {Object=} [ChildNode = Object] - The child object to add.
 * @param {number=} [ChildIndex = -1] - The index at which to add the child.
 * 
 * @returns {!Object} The newly added child node.
 */
exports.AddChild = function ( ChildNode, ChildIndex )
{
	if ( typeof ChildNode == 'undefined' ) ChildNode = {};
	if ( typeof ChildIndex == 'undefined' ) ChildIndex = -1;

	// ChildNode = HierNodeLib.HierNode( ChildNode );
	ChildNode._hnPrevNode = null;
	ChildNode._hnNextNode = null;
	ChildNode._hnIndent = 0;

	var prev_node = this;
	var next_node = this._hnNextNode;
	while ( next_node )
	{
		if ( next_node._hnIndent === ( this._hnIndent + 1 ) )
		{
			// A direct child was found.
			if ( ChildIndex === 0 )
			{
				// This is the child we are looking for. Insert.
				Link( ChildNode, prev_node, next_node );
				ChildNode._hnIndent = this._hnIndent + 1;
				return ChildNode;
			}
			ChildIndex--;
		}
		else if ( next_node._hnIndent <= this._hnIndent )
		{
			// No more child nodes. Append.
			Link( ChildNode, prev_node, next_node );
			ChildNode._hnIndent = this._hnIndent + 1;
			return ChildNode;
		}
		// Update the nodes we are looking for.
		prev_node = next_node;
		next_node = next_node._hnNextNode;
	}

	// No more nodes. Append.
	Link( ChildNode, prev_node, null );
	ChildNode._hnIndent = this._hnIndent + 1;
	return ChildNode;
};


//==========================================
/**
 * @function AddChildren
 * @memberof HierNodeLib.HierNode
 * 
 * @summary Rebuilds a hierarchy from an array of nodes.
 * 
 * @param {Array} NodeArray - The array of nodes or objects.
 * 
 * @returns {?Object} `this`.
 * 
 * @description
 * Rebuilds a hierarchy from an array of nodes.
 */
exports.AddChildren = function ( NodeArray )
{
	if ( NodeArray.length == 0 )
	{
		return this;
	}

	var parent_node = this;
	var prev_node = this;
	var prev_indent = this._hnIndent;
	var curr_indent = 0;
	for ( var index = 0; index < NodeArray.length; index++ )
	{
		curr_indent = NodeArray[ index ]._hnIndent || 0;
		if ( curr_indent == prev_indent )
		{
			parent_node = parent_node.FindRelative( RelationshipTypes.ParentNode );
			prev_indent = parent_node._hnIndent;
		}
		else if ( curr_indent > prev_indent )
		{
			parent_node = prev_node;
			prev_indent = prev_node._hnIndent;
		}
		else if ( curr_indent < prev_indent )
		{
			parent_node = parent_node.FindRelative( RelationshipTypes.ParentNode );
			prev_indent = parent_node._hnIndent;
		}

		if ( !parent_node )
		{
			break;
		}

		prev_node = parent_node.AddChild( NodeArray[ index ] );
	}
	return this;
};


//==========================================
/**
 * @function RemoveChild
 * @memberof HierNodeLib.HierNode
 * 
 * @summary Adds a new item as a child of ThisNode.
 * 
 * @param {number} ChildIndex - The index of the child to remove.
 * 
 * @returns {?Object} The removed child node.
 */
exports.RemoveChild = function ( ChildIndex )
{
	var child = this.VisitNodes(
		new HierNodeLib.IndexSelectorVisitor( ChildIndex ),
		VisitationTypes.ChildNodes
	).Node;
	if ( !child )
	{
		return null;
	}

	var last_desc = child.FindRelative( RelationshipTypes.LastDescNode );
	if ( last_desc )
	{
		child._hnPrevNode._hnNextNode = last_desc._hnNextNode;
		if ( last_desc._hnNextNode )
		{
			last_desc._hnNextNode._hnPrevNode = child._hnPrevNode;
		}
	}
	else
	{
		child._hnPrevNode._hnNextNode = null;
	}

	child._hnPrevNode = null;
	child._hnNextNode = null;
	return child;
};


//==========================================
/**
 * @function RemoveChildren
 * @memberof HierNodeLib.HierNode
 * 
 * @summary Removes all children from this node.
 */
exports.RemoveChildren = function ()
{
	var last_desc = this.FindRelative( RelationshipTypes.LastDescNode );
	if ( last_desc )
	{
		last_desc._hnPrevNode = this;
		this._hnNextNode = last_desc._hnNextNode;
		if ( last_desc._hnNextNode )
		{
			last_desc._hnNextNode._hnPrevNode = this;
		}
	}
	return;
};

