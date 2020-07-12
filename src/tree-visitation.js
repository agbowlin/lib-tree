"use strict";


const TREE_TYPES = require( './tree-types.js' );


//==========================================
/**
 * @function	VisitNodes
 * @memberof	Node
 * 
 * @summary
 * Visits every one of a class of nodes defined by VisitationType.
 * 
 * @param		{VisitationTypes} VisitationType - Identifies which nodes to visit.
 * @param		{!function} Visitor - The function to invoke on each node visited.
 * 									If the Visitor returns a value, the visitation process
 * 									is aborted and `VisitNodes` will retun that value.
 * @param		{?boolean} [IncludeThis = false] - This node will be included and visited frst.
 * 
 * @returns		{boolean} Any return value from `Visitor`, otherwise `undefined`.
 * 
 * @description
 * The VisitationType parameter must be one of:
 * 
 *	AllNodes : Visit all node in the hierarchy (depth-first).
 *	PrevNodes : Visits all the nodes previous to this one (backwards).
 *	NextNodes : Visits all the nodes after this one (forewards).
 *	ParentNodes : Visits all the parents of this node (upwards).
 *	SiblingNodes : Visits all the siblings of this node (sideways).
 *	PrevSibNodes : Visits all the siblings previous to this one.
 *	NextSibNodes : Visits all the siblings after this one.
 *	ChildNodes : Visits all the child nodes of this one. (downwards)
 *	DecendantNodes : Visits all the descendant nodes of this one. (downwards)
 */
//==========================================

exports.VisitNodes =
	function VisitNodes( VisitationType, Visitor, IncludeThis )
	{
		if ( typeof Visitor !== 'function' ) { return false; }
		if ( typeof IncludeThis === 'undefined' ) IncludeThis = false;

		var start_relative = null;
		var next_relative = null;
		var visit_descendents_only = null;

		// Set the visitation parameters.
		if ( VisitationType == TREE_TYPES.VisitationTypes.AllNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.FirstNode;
			next_relative = TREE_TYPES.RelationshipTypes.NextNode;
		}
		else if ( VisitationType == TREE_TYPES.VisitationTypes.PrevNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.PrevNode;
			next_relative = TREE_TYPES.RelationshipTypes.PrevNode;
		}
		else if ( VisitationType == TREE_TYPES.VisitationTypes.NextNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.NextNode;
			next_relative = TREE_TYPES.RelationshipTypes.NextNode;
		}
		else if ( VisitationType == TREE_TYPES.VisitationTypes.ParentNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.ParentNode;
			next_relative = TREE_TYPES.RelationshipTypes.ParentNode;
		}
		else if ( VisitationType == TREE_TYPES.VisitationTypes.SiblingNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.FirstSibNode;
			next_relative = TREE_TYPES.RelationshipTypes.NextSibNode;
		}
		else if ( VisitationType == TREE_TYPES.VisitationTypes.PrevSibNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.PrevSibNode;
			next_relative = TREE_TYPES.RelationshipTypes.PrevSibNode;
		}
		else if ( VisitationType == TREE_TYPES.VisitationTypes.NextSibNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.NextSibNode;
			next_relative = TREE_TYPES.RelationshipTypes.NextSibNode;
		}
		else if ( VisitationType == TREE_TYPES.VisitationTypes.ChildNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.FirstChildNode;
			next_relative = TREE_TYPES.RelationshipTypes.NextSibNode;
			visit_descendents_only = true;
		}
		else if ( VisitationType == TREE_TYPES.VisitationTypes.DecendantNodes )
		{
			start_relative = TREE_TYPES.RelationshipTypes.FirstChildNode;
			next_relative = TREE_TYPES.RelationshipTypes.NextNode;
			visit_descendents_only = true;
		}
		else
		{
			throw Error( "Unknown VisitationType [" + VisitationType + "]." );
		}

		// Visit this node first.
		let visitor_return = null;
		if ( IncludeThis )
		{
			visitor_return = Visitor( this.Owner );
			if ( ( visitor_return !== null ) && ( typeof visitor_return !== 'undefined' ) )
			{
				return visitor_return;
			}
		}

		// Get the starting node.
		let item = this.FindRelative( start_relative );
		if ( !item ) { return; }
		let node = item.Node;
		while ( node )
		{
			// Check if we are visiting only descendent nodes.
			if ( visit_descendents_only )
			{
				// Exit if we have run out of descendent nodes to visit.
				if ( node.Indent <= this.Indent )
				{
					return;
				}
			}

			// Visit the node.
			visitor_return = Visitor( node.Owner );
			if ( ( visitor_return !== null ) && ( typeof visitor_return !== 'undefined' ) )
			{
				return visitor_return;
			}

			// Get the next node to visit.
			item = node.FindRelative( next_relative );
			if ( !item ) { return; }
			node = item.Node;
		}

		return;
	};
