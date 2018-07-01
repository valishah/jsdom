"use strict";

const { produceXMLSerialization } = require("w3c-xmlserializer");
const parse5 = require("parse5");

const treeAdapter = require("./parse5-adapter-serialization");
const NODE_TYPE = require("../node-type");

function htmlSerialization(node) {
  if (
    node.nodeType === NODE_TYPE.ELEMENT_NODE &&
    node.namespaceURI === "http://www.w3.org/1999/xhtml" &&
    node.tagName === "TEMPLATE"
  ) {
    node = node.content;
  }

  return parse5.serialize(node, { treeAdapter });
}

module.exports.fragmentSerialization = (node, requireWellFormed) => {
  const contextDocument =
    node.nodeType === NODE_TYPE.DOCUMENT_NODE ? node : node._ownerDocument;
  if (contextDocument._parsingMode === "html") {
    return htmlSerialization(node);
  }
  return produceXMLSerialization(node, requireWellFormed);
};