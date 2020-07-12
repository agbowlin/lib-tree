"use strict";


const TREE_TYPES = require( './tree-types.js' );


//==========================================
/**
 * @function	TextGraph
 * @memberof	Node
 * @summary
 * Renders a graph of the hierarchy using text characters.
 * 
 * @param		{string} TextProperty - The property to use for the node in the graph
 *									(e.g. it's name or other text value).
 * @param		{boolean=} [IncludeThis = false] - Include the root in the output.
 * @param		{string=} [IndentText = '\t'] - The characters to use to indent each node.
 * @param		{string=} [EolText = '\n'] - The characters to use after each node.
 * 
 * @returns		{string} The text graph as a string.
 */
exports.TextGraph =
	function TextGraph( TextProperty, IncludeThis, IndentText, EolText )
	{
		if ( typeof IncludeThis == 'undefined' ) IncludeThis = false;
		if ( typeof IndentText == 'undefined' ) IndentText = '\t';
		if ( typeof EolText == 'undefined' ) EolText = '\n';

		var text_graph = '';
		if ( IncludeThis )
		{
			text_graph = this.Owner[ TextProperty ];
		}
		var root_indent = this.Indent;
		var next_node = this.NextNode;
		while ( true )
		{
			if ( !next_node )
			{
				break;
			}
			if ( next_node.Indent <= root_indent )
			{
				break;
			}
			text_graph += EolText;
			var start_index = 1;
			if ( !IncludeThis )
			{
				start_index++;
			}
			for ( var index = start_index; index <= ( next_node.Indent - root_indent ); index++ )
			{
				text_graph += IndentText;
			}
			text_graph += next_node.Owner[ TextProperty ];
			next_node = next_node.NextNode;
		}
		return text_graph;
	};


//==========================================
/**
 * @function	TextPath
 * @memberof	Node
 * @summary
 * Retrieves the text path of a node.
 * 
 * @param		{string} TextProperty - The name of the property containing the path elements.
 * @param		{boolean=} [IncludeRoot = true] - The root node will be included in the path.
 * @param		{string=} [Delimiter = '/'] - The character(s) used to delimit the path elements.
 * 
 * @returns		{string} The text path of the node.
 */
exports.TextPath =
	function TextPath( TextProperty, IncludeRoot, Delimiter )
	{
		if ( typeof IncludeRoot == 'undefined' ) IncludeRoot = true;
		if ( typeof Delimiter == 'undefined' ) Delimiter = '/';

		let items = [];
		this.VisitNodes(
			TREE_TYPES.VisitationTypes.ParentNodes,
			Item => { items.push( Item ); return; },
			true
		);
		var last_index = items.length - 1;
		if ( !IncludeRoot )
		{
			last_index--;
		}
		var text_path = '';
		for ( var index = 0; index <= last_index; index++ )
		{
			let item = items[ index ];
			text_path = Delimiter + item[ TextProperty ] + text_path;
		}
		return text_path;
	};


//==========================================
/**
 * @function	FindPath
 * @memberof	Node
 * @summary
 * Locates a node given a text path string.
 * 
 * @param		{string} TextPath - The path of the node to return.
 * @param		{string} TextProperty - The name of the property containing the path elements.
 * @param		{boolean=} [IncludeThis = false] - The path includes the `ThisNode`.
 * @param		{string=} [Delimiter = '/'] - The character(s) used to delimit the path elements.
 * 
 * @returns		{?Object} The located node, or null if not found.
 * 
 * @description
 * Given a text path to a node (e.g. `/A1/B1/C2`), this function will return that node.
 * 
 * The `TextPath` parameter is a string and is similar to strings returned by the `TextPath` function.
 * 
 * The `Delimiter` parameter separates the elements of the path within `TextPath`.
 * If `Delimiter` is empty, `ThisNode` will be returned.
 */
exports.FindPath =
	function FindPath( TextPath, TextProperty, IncludeThis, Delimiter )
	{
		if ( typeof IncludeThis == 'undefined' ) IncludeThis = false;
		if ( typeof Delimiter == 'undefined' ) Delimiter = '/';

		let text_path = TextPath;
		let node = this;
		while ( node && ( text_path.length > 0 ) )
		{
			// Remove leading delimiters
			while ( text_path.indexOf( Delimiter ) == 0 )
			{
				text_path = text_path.substr( Delimiter.length );
			}
			if ( text_path.length > 0 )
			{
				let ich = text_path.indexOf( Delimiter );
				if ( ich < 0 )
				{
					ich = text_path.length;
				}
				let text_value = text_path.substr( 0, ich );
				text_path = text_path.substr( ich );

				let next_child_item = node.VisitNodes(
					TREE_TYPES.VisitationTypes.ChildNodes,
					Item => { if ( Item[ TextProperty ] === text_value ) { return Item; } },
					true
				);
				if ( !next_child_item ) { return null; }
				node = next_child_item.Node;
			}
		}
		if ( node ) { return node.Owner; }
		else { return null; }
	};

