

import { mapNodes, mapRelationships, getGraphStats } from './mapper'

export class GraphEventHandler {
  constructor(
    graph,
    graphView,
    getNodeNeighbours,
    onItemSelected,
    onGraphModelChange
  ) {
    this.graph = graph
    this.graphView = graphView
    this.getNodeNeighbours = getNodeNeighbours
    this.selectedItem = null
    this.onItemSelected = onItemSelected
    this.onGraphModelChange = onGraphModelChange
  }

  graphModelChanged() {
    this.onGraphModelChange(getGraphStats(this.graph))
  }

  selectItem(item) {
    if (this.selectedItem) {
      this.selectedItem.selected = false
    }
    this.selectedItem = item
    item.selected = true
    this.graphView.update()
  }

  deselectItem() {
    if (this.selectedItem) {
      this.selectedItem.selected = false
      this.selectedItem = null
    }
    this.onItemSelected({
      type: 'canvas',
      item: {
        nodeCount: this.graph.nodes().length,
        relationshipCount: this.graph.relationships().length
      }
    })
    this.graphView.update()
  }

  nodeClose(d) {
    this.graph.removeConnectedRelationships(d)
    this.graph.removeNode(d)
    this.deselectItem()
    this.graphView.update()
    this.graphModelChanged()
  }

  nodeClicked(d) {
    if (!d) {
      return
    }
    d.fixed = true
    if (!d.selected) {
      this.selectItem(d)
      this.onItemSelected({
        type: 'node',
        item: { id: d.id, labels: d.labels, properties: d.propertyList }
      })
    } else {
      this.deselectItem()
    }
  }

  nodeUnlock(d) {
    if (!d) {
      return
    }
    d.fixed = false
    this.deselectItem()
  }

  nodeDblClicked(d) {
    if (d.expanded) {
      this.nodeCollapse(d)
      return
    }
    d.expanded = true
    const graph = this.graph
    const graphView = this.graphView
    const graphModelChanged = this.graphModelChanged.bind(this)
    this.getNodeNeighbours(d, this.graph.findNodeNeighbourIds(d.id), function(
      err,
      { nodes, relationships }
    ) {
      if (err) return
      graph.addExpandedNodes(d, mapNodes(nodes))
      graph.addRelationships(mapRelationships(relationships, graph))
      graphView.update()
      graphModelChanged()
    })
  }

  nodeCollapse(d) {
    d.expanded = false
    this.graph.collapseNode(d)
    this.graphView.update()
    this.graphModelChanged()
  }

  onRelationshipClicked(relationship) {
    if (!relationship.selected) {
      this.selectItem(relationship)
      this.onItemSelected({
        type: 'relationship',
        item: {
          id: relationship.id,
          type: relationship.type,
          properties: relationship.propertyList
        }
      })
    } else {
      this.deselectItem()
    }
  }

  onCanvasClicked() {
    this.deselectItem()
  }

  bindEventHandlers() {
    this.graphView
      .on('relationshipClicked', this.onRelationshipClicked.bind(this))
      .on('canvasClicked', this.onCanvasClicked.bind(this))
      .on('nodeClose', this.nodeClose.bind(this))
      .on('nodeClicked', this.nodeClicked.bind(this))
      .on('nodeDblClicked', this.nodeDblClicked.bind(this))
      .on('nodeUnlock', this.nodeUnlock.bind(this))
  }
}
