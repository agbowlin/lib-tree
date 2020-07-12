"use strict";


//==========================================
/**
 * @enum		{string} RelationshipTypes
 * @memberof	lib-tree
 * @readonly
 * @summary		Relationship types used for calling FindRelative().
 */
const RelationshipTypes =
{
	PrevNode: 'PrevNode',
	NextNode: 'NextNode',
	FirstNode: 'FirstNode',
	LastNode: 'LastNode',
	RootNode: 'RootNode',
	ParentNode: 'ParentNode',
	PrevSibNode: 'PrevSibNode',
	NextSibNode: 'NextSibNode',
	FirstSibNode: 'FirstSibNode',
	LastSibNode: 'LastSibNode',
	FirstChildNode: 'FirstChildNode',
	LastChildNode: 'LastChildNode',
	FirstDescNode: 'FirstDescNode',
	LastDescNode: 'LastDescNode'
};
exports.RelationshipTypes = RelationshipTypes;


//==========================================
/** 
 * @enum		{string} VisitationTypes
 * @memberof	lib-tree
 * @readonly
 * @summary		Visitation types used for calling VisitNodes().
 */
const VisitationTypes =
{
	AllNodes: 'AllNodes',
	PrevNodes: 'PrevNodes',
	NextNodes: 'NextNodes',
	ParentNodes: 'ParentNodes',
	SiblingNodes: 'SiblingNodes',
	PrevSibNodes: 'PrevSibNodes',
	NextSibNodes: 'NextSibNodes',
	ChildNodes: 'ChildNodes',
	DecendantNodes: 'DecendantNodes',
};
exports.VisitationTypes = VisitationTypes;

